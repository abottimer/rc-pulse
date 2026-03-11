"use client";

import type { HealthScore } from "@/lib/health-score";
import type { Insight } from "@/lib/insights";
import { HealthGrade } from "./HealthGrade";
import { MetricCard } from "./MetricCard";
import { PulseChart } from "./PulseChart";
import { InsightsPanel } from "./InsightsPanel";

interface DashboardProps {
  healthScore: HealthScore;
  metrics: {
    mrr: number;
    activeSubscriptions: number;
    activeTrials: number;
    revenue28d: number;
    newCustomers: number;
    activeUsers: number;
  };
  chartData: {
    revenue: Array<{ date: string; value: number }>;
    mrr: Array<{ date: string; value: number }>;
    churn: Array<{ date: string; value: number }>;
    trialConversion: Array<{ date: string; value: number }>;
    actives: Array<{ date: string; value: number }>;
    newCustomers: Array<{ date: string; value: number }>;
  };
  insights: Insight[];
  mrrTrend?: "up" | "down" | "flat";
  appName: string;
}

export function Dashboard({
  healthScore,
  metrics,
  chartData,
  insights,
  mrrTrend,
  appName,
}: DashboardProps) {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#F25A5A] to-[#D93D3D] flex items-center justify-center">
              <span className="text-white text-sm font-bold">⚡</span>
            </div>
            <div>
              <h1 className="text-lg font-bold">RC Pulse</h1>
              <p className="text-xs text-gray-500">Subscription Health Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">
              📱 {appName}
            </span>
            <a
              href="https://www.revenuecat.com/docs/api-v2"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-500 hover:text-[#F25A5A] transition-colors border border-gray-700 rounded-full px-3 py-1"
            >
              Powered by RevenueCat Charts API
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        {/* Health Score */}
        <HealthGrade health={healthScore} />

        {/* Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Monthly Recurring Revenue"
            value={`$${metrics.mrr.toLocaleString()}`}
            subtitle="Normalized to 28-day period"
            icon="💰"
            trend={mrrTrend}
          />
          <MetricCard
            title="Active Subscriptions"
            value={metrics.activeSubscriptions.toLocaleString()}
            subtitle="Currently active"
            icon="📊"
          />
          <MetricCard
            title="Active Trials"
            value={metrics.activeTrials.toLocaleString()}
            subtitle="In trial period"
            icon="🧪"
          />
          <MetricCard
            title="Revenue (28d)"
            value={`$${metrics.revenue28d.toLocaleString()}`}
            subtitle="Last 28 days"
            icon="💵"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <PulseChart
            title="Revenue Over Time"
            data={chartData.revenue}
            type="area"
            color="#F25A5A"
            unit="$"
          />
          <PulseChart
            title="MRR Trend"
            data={chartData.mrr}
            type="line"
            color="#8B5CF6"
            unit="$"
          />
          <PulseChart
            title="Churn Rate"
            data={chartData.churn}
            type="line"
            color="#EF4444"
            unit="%"
          />
          <PulseChart
            title="Trial Conversion Rate"
            data={chartData.trialConversion}
            type="bar"
            color="#22C55E"
            unit="%"
          />
        </div>

        {/* Secondary Charts + Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <PulseChart
            title="Active Subscriptions"
            data={chartData.actives}
            type="area"
            color="#3B82F6"
          />
          <PulseChart
            title="New Customers"
            data={chartData.newCustomers}
            type="bar"
            color="#F59E0B"
          />
          <InsightsPanel insights={insights} />
        </div>

        {/* Footer */}
        <footer className="border-t border-gray-800 pt-6 pb-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/abottimer/rc-pulse"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                GitHub
              </a>
              <span>·</span>
              <a
                href="https://www.revenuecat.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                RevenueCat
              </a>
            </div>
            <p className="text-center">
              Built by{" "}
              <a
                href="https://twitter.com/AshBottimer"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F25A5A] hover:underline"
              >
                Ashley Bottimer
              </a>{" "}
              (AI Agent) · Disclosure: This tool was created autonomously by an AI
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
