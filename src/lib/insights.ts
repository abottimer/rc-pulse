export interface Insight {
  emoji: string;
  text: string;
  type: "positive" | "neutral" | "warning";
}

export function generateInsights(data: {
  mrr: number;
  mrrValues: number[];
  activeSubscriptions: number;
  churnValues: number[];
  trialConversionValues: number[];
  revenueValues: number[];
  newCustomers: number;
  activeUsers: number;
}): Insight[] {
  const insights: Insight[] = [];

  // MRR trend
  if (data.mrrValues.length >= 3) {
    const recent = data.mrrValues.slice(-3);
    const growth = ((recent[recent.length - 1] - recent[0]) / recent[0]) * 100;
    if (growth > 5) {
      insights.push({
        emoji: "📈",
        text: `MRR grew ${growth.toFixed(1)}% over the last 3 months, showing healthy momentum.`,
        type: "positive",
      });
    } else if (growth > 0) {
      insights.push({
        emoji: "📊",
        text: `MRR grew ${growth.toFixed(1)}% over the last 3 months. Steady, but room to accelerate.`,
        type: "neutral",
      });
    } else {
      insights.push({
        emoji: "⚠️",
        text: `MRR declined ${Math.abs(growth).toFixed(1)}% over the last 3 months. Worth investigating.`,
        type: "warning",
      });
    }
  }

  // Churn analysis (values are already percentages from API)
  if (data.churnValues.length > 0) {
    const avgChurn =
      data.churnValues.reduce((a, b) => a + b, 0) / data.churnValues.length;
    if (avgChurn < 5) {
      insights.push({
        emoji: "🛡️",
        text: `Average churn of ${avgChurn.toFixed(1)}% is below the industry average of 5-7%. Users are sticking around.`,
        type: "positive",
      });
    } else if (avgChurn < 7) {
      insights.push({
        emoji: "📋",
        text: `Churn rate of ${avgChurn.toFixed(1)}% is within the industry average (5-7%). Consider retention experiments.`,
        type: "neutral",
      });
    } else {
      insights.push({
        emoji: "🚨",
        text: `Churn rate of ${avgChurn.toFixed(1)}% is above industry average. Retention should be a top priority.`,
        type: "warning",
      });
    }
  }

  // Trial conversion (values are already percentages from API)
  if (data.trialConversionValues.length > 0) {
    const avgConversion =
      data.trialConversionValues.reduce((a, b) => a + b, 0) /
        data.trialConversionValues.length;
    if (avgConversion > 50) {
      insights.push({
        emoji: "🎯",
        text: `Trial conversion at ${avgConversion.toFixed(0)}% is excellent. Your onboarding and value prop are landing.`,
        type: "positive",
      });
    } else if (avgConversion > 30) {
      insights.push({
        emoji: "🔄",
        text: `Trial conversion at ${avgConversion.toFixed(0)}%. Solid, but paywall experiments could push this higher.`,
        type: "neutral",
      });
    } else {
      insights.push({
        emoji: "💡",
        text: `Trial conversion at ${avgConversion.toFixed(0)}% is below average. Consider adjusting trial length or onboarding flow.`,
        type: "warning",
      });
    }
  }

  // Revenue consistency
  if (data.revenueValues.length >= 6) {
    const recent = data.revenueValues.slice(-6);
    let growingMonths = 0;
    for (let i = 1; i < recent.length; i++) {
      if (recent[i] >= recent[i - 1]) growingMonths++;
    }
    if (growingMonths >= 4) {
      insights.push({
        emoji: "💰",
        text: `Revenue grew in ${growingMonths} of the last ${recent.length - 1} months. Consistent upward trajectory.`,
        type: "positive",
      });
    }
  }

  // Active user ratio
  if (data.activeUsers > 0 && data.activeSubscriptions > 0) {
    const ratio = (data.activeSubscriptions / data.activeUsers) * 100;
    insights.push({
      emoji: "👥",
      text: `${ratio.toFixed(1)}% of active users are paying subscribers (${data.activeSubscriptions.toLocaleString()} of ${data.activeUsers.toLocaleString()}).`,
      type: ratio > 15 ? "positive" : "neutral",
    });
  }

  return insights.slice(0, 5);
}
