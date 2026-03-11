import { getOverview, getChart } from "@/lib/revenuecat";
import { calculateHealthScore } from "@/lib/health-score";
import { generateInsights } from "@/lib/insights";
import { Dashboard } from "@/components/Dashboard";

export const dynamic = "force-dynamic";

function getDateRange(monthsBack: number) {
  const end = new Date();
  const start = new Date();
  start.setMonth(start.getMonth() - monthsBack);
  return {
    start: start.toISOString().split("T")[0],
    end: end.toISOString().split("T")[0],
  };
}

function parseChartValues(
  values: Array<{ cohort: number; measure: number; value: number }>,
  measureIndex: number = 0
): { dates: string[]; values: number[] } {
  const filtered = values.filter((v) => v.measure === measureIndex);
  return {
    dates: filtered.map((v) => {
      const d = new Date(v.cohort * 1000);
      return d.toLocaleDateString("en-US", { month: "short", year: "2-digit" });
    }),
    values: filtered.map((v) => v.value),
  };
}

// Find the percentage measure index for charts that have multiple measures
function findPercentMeasureIndex(
  measures: Array<{ unit: string }>
): number {
  const idx = measures.findIndex((m) => m.unit === "%");
  return idx >= 0 ? idx : 0;
}

export default async function Home() {
  const range12 = getDateRange(12);
  const range6 = getDateRange(6);

  try {
    const [overview, revenueChart, mrrChart, churnChart, trialConvChart, refundChart, activesChart, newCustomersChart] =
      await Promise.all([
        getOverview(),
        getChart("revenue", range12.start, range12.end, "month"),
        getChart("mrr", range12.start, range12.end, "month"),
        getChart("churn", range6.start, range6.end, "month"),
        getChart("trial_conversion_rate", range6.start, range6.end, "month"),
        getChart("refund_rate", range6.start, range6.end, "month"),
        getChart("actives", range12.start, range12.end, "month"),
        getChart("customers_new", range6.start, range6.end, "month"),
      ]);

    // Parse chart data - use percentage measure for rate charts
    const revenue = parseChartValues(revenueChart.values);
    const mrr = parseChartValues(mrrChart.values);
    const churnPctIdx = findPercentMeasureIndex(churnChart.measures);
    const churn = parseChartValues(churnChart.values, churnPctIdx);
    const trialConvPctIdx = findPercentMeasureIndex(trialConvChart.measures);
    const trialConv = parseChartValues(trialConvChart.values, trialConvPctIdx);
    const refundPctIdx = findPercentMeasureIndex(refundChart.measures);
    const refund = parseChartValues(refundChart.values, refundPctIdx);
    const actives = parseChartValues(activesChart.values);
    const newCust = parseChartValues(newCustomersChart.values);

    // Get overview metrics
    const getMetric = (id: string) =>
      overview.metrics.find((m: { id: string }) => m.id === id);
    const mrrMetric = getMetric("mrr");
    const activeSubsMetric = getMetric("active_subscriptions");
    const activeTrialsMetric = getMetric("active_trials");
    const revenueMetric = getMetric("revenue");
    const newCustomersMetric = getMetric("new_customers");
    const activeUsersMetric = getMetric("active_users");

    // Calculate health score
    const healthScore = calculateHealthScore({
      mrrValues: mrr.values,
      churnValues: churn.values,
      trialConversionValues: trialConv.values,
      refundValues: refund.values,
      revenueValues: revenue.values,
    });

    // Generate insights
    const insights = generateInsights({
      mrr: mrrMetric?.value || 0,
      mrrValues: mrr.values,
      activeSubscriptions: activeSubsMetric?.value || 0,
      churnValues: churn.values,
      trialConversionValues: trialConv.values,
      revenueValues: revenue.values,
      newCustomers: newCustomersMetric?.value || 0,
      activeUsers: activeUsersMetric?.value || 0,
    });

    // Build chart data for components
    const chartData = {
      revenue: revenue.dates.map((date, i) => ({
        date,
        value: Math.round(revenue.values[i]),
      })),
      mrr: mrr.dates.map((date, i) => ({
        date,
        value: Math.round(mrr.values[i]),
      })),
      churn: churn.dates.map((date, i) => ({
        date,
        value: Math.round(churn.values[i] * 100) / 100,
      })),
      trialConversion: trialConv.dates.map((date, i) => ({
        date,
        value: Math.round(trialConv.values[i] * 100) / 100,
      })),
      actives: actives.dates.map((date, i) => ({
        date,
        value: Math.round(actives.values[i]),
      })),
      newCustomers: newCust.dates.map((date, i) => ({
        date,
        value: Math.round(newCust.values[i]),
      })),
    };

    const metrics = {
      mrr: mrrMetric?.value || 0,
      activeSubscriptions: activeSubsMetric?.value || 0,
      activeTrials: activeTrialsMetric?.value || 0,
      revenue28d: revenueMetric?.value || 0,
      newCustomers: newCustomersMetric?.value || 0,
      activeUsers: activeUsersMetric?.value || 0,
    };

    // Determine trends from chart data
    const mrrTrend =
      mrr.values.length >= 2
        ? mrr.values[mrr.values.length - 1] > mrr.values[mrr.values.length - 2]
          ? "up"
          : mrr.values[mrr.values.length - 1] < mrr.values[mrr.values.length - 2]
            ? "down"
            : "flat"
        : undefined;

    return (
      <Dashboard
        healthScore={healthScore}
        metrics={metrics}
        chartData={chartData}
        insights={insights}
        mrrTrend={mrrTrend as "up" | "down" | "flat" | undefined}
        appName="Dark Noise"
      />
    );
  } catch (error) {
    console.error("Dashboard error:", error);
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-2">
            Unable to load dashboard
          </h1>
          <p className="text-gray-400">
            Could not connect to RevenueCat API. Please check your configuration.
          </p>
        </div>
      </div>
    );
  }
}
