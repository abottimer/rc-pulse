export interface HealthFactor {
  name: string;
  score: number; // 0-100
  weight: number;
  detail: string;
  benchmark: string;
}

export interface HealthScore {
  grade: string;
  score: number;
  color: string;
  assessment: string;
  factors: HealthFactor[];
}

function scoreMrrGrowth(values: number[]): { score: number; detail: string } {
  if (values.length < 2) return { score: 50, detail: "Insufficient data" };
  const recent = values.slice(-3);
  const first = recent[0];
  const last = recent[recent.length - 1];
  if (first === 0) return { score: 50, detail: "No baseline MRR" };
  const growth = ((last - first) / first) * 100;
  let score: number;
  if (growth > 10) score = 100;
  else if (growth > 5) score = 80;
  else if (growth > 0) score = 60;
  else if (growth > -5) score = 40;
  else score = 20;
  return { score, detail: `${growth > 0 ? "+" : ""}${growth.toFixed(1)}% over 3 months` };
}

function scoreChurn(values: number[]): { score: number; detail: string } {
  if (values.length === 0) return { score: 50, detail: "No churn data" };
  const avg = values.reduce((a, b) => a + b, 0) / values.length;
  // Values are already percentages from the API
  const pct = avg;
  let score: number;
  if (pct < 3) score = 100;
  else if (pct < 5) score = 80;
  else if (pct < 7) score = 60;
  else if (pct < 10) score = 40;
  else score = 20;
  return { score, detail: `${pct.toFixed(1)}% average monthly churn` };
}

function scoreTrialConversion(values: number[]): { score: number; detail: string } {
  if (values.length === 0) return { score: 50, detail: "No trial data" };
  const avg = values.reduce((a, b) => a + b, 0) / values.length;
  // Values are already percentages from the API
  const pct = avg;
  let score: number;
  if (pct > 60) score = 100;
  else if (pct > 40) score = 80;
  else if (pct > 25) score = 60;
  else if (pct > 10) score = 40;
  else score = 20;
  return { score, detail: `${pct.toFixed(1)}% average conversion rate` };
}

function scoreRefundRate(values: number[]): { score: number; detail: string } {
  if (values.length === 0) return { score: 80, detail: "No refund data" };
  const avg = values.reduce((a, b) => a + b, 0) / values.length;
  // Values are already percentages from the API
  const pct = avg;
  let score: number;
  if (pct < 2) score = 100;
  else if (pct < 5) score = 80;
  else if (pct < 8) score = 60;
  else if (pct < 12) score = 40;
  else score = 20;
  return { score, detail: `${pct.toFixed(1)}% average refund rate` };
}

function scoreRevenueTrend(values: number[]): { score: number; detail: string } {
  if (values.length < 3) return { score: 50, detail: "Insufficient data" };
  const recent = values.slice(-6);
  let growingMonths = 0;
  for (let i = 1; i < recent.length; i++) {
    if (recent[i] > recent[i - 1]) growingMonths++;
  }
  const growthRatio = growingMonths / (recent.length - 1);
  let score: number;
  if (growthRatio > 0.8) score = 100;
  else if (growthRatio > 0.6) score = 80;
  else if (growthRatio > 0.4) score = 60;
  else if (growthRatio > 0.2) score = 40;
  else score = 20;
  return {
    score,
    detail: `${growingMonths}/${recent.length - 1} months showed growth`,
  };
}

function getGrade(score: number): { grade: string; color: string } {
  if (score >= 90) return { grade: "A", color: "#22c55e" };
  if (score >= 80) return { grade: "B", color: "#84cc16" };
  if (score >= 70) return { grade: "C", color: "#eab308" };
  if (score >= 60) return { grade: "D", color: "#f97316" };
  return { grade: "F", color: "#ef4444" };
}

function getAssessment(grade: string): string {
  switch (grade) {
    case "A":
      return "Your subscription business is thriving. Strong growth, low churn, and healthy conversions.";
    case "B":
      return "Solid performance across key metrics. A few areas could use optimization.";
    case "C":
      return "Mixed signals. Some metrics are healthy, but others need attention.";
    case "D":
      return "Several metrics are below benchmarks. Time to focus on retention and conversion.";
    case "F":
      return "Critical issues detected. Prioritize churn reduction and conversion optimization.";
    default:
      return "Calculating your subscription health...";
  }
}

export function calculateHealthScore(data: {
  mrrValues: number[];
  churnValues: number[];
  trialConversionValues: number[];
  refundValues: number[];
  revenueValues: number[];
}): HealthScore {
  const mrrGrowth = scoreMrrGrowth(data.mrrValues);
  const churn = scoreChurn(data.churnValues);
  const trialConversion = scoreTrialConversion(data.trialConversionValues);
  const refundRate = scoreRefundRate(data.refundValues);
  const revenueTrend = scoreRevenueTrend(data.revenueValues);

  const factors: HealthFactor[] = [
    {
      name: "MRR Growth",
      score: mrrGrowth.score,
      weight: 0.25,
      detail: mrrGrowth.detail,
      benchmark: "Industry target: >5% monthly growth",
    },
    {
      name: "Churn Rate",
      score: churn.score,
      weight: 0.25,
      detail: churn.detail,
      benchmark: "Industry average: 5-7% monthly",
    },
    {
      name: "Trial Conversion",
      score: trialConversion.score,
      weight: 0.2,
      detail: trialConversion.detail,
      benchmark: "Good: >40%, Great: >60%",
    },
    {
      name: "Refund Rate",
      score: refundRate.score,
      weight: 0.15,
      detail: refundRate.detail,
      benchmark: "Target: <5% of transactions",
    },
    {
      name: "Revenue Trend",
      score: revenueTrend.score,
      weight: 0.15,
      detail: revenueTrend.detail,
      benchmark: "Consistent month-over-month growth",
    },
  ];

  const compositeScore = Math.round(
    factors.reduce((sum, f) => sum + f.score * f.weight, 0)
  );

  const { grade, color } = getGrade(compositeScore);

  return {
    grade,
    score: compositeScore,
    color,
    assessment: getAssessment(grade),
    factors,
  };
}
