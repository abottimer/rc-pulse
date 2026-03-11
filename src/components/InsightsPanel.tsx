"use client";

import type { Insight } from "@/lib/insights";

interface InsightsPanelProps {
  insights: Insight[];
}

export function InsightsPanel({ insights }: InsightsPanelProps) {
  const borderColor = {
    positive: "border-green-500/30",
    neutral: "border-yellow-500/30",
    warning: "border-red-500/30",
  };

  return (
    <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6">
      <h3 className="text-sm font-medium text-gray-400 mb-4">
        💡 Auto-Generated Insights
      </h3>
      <div className="space-y-3">
        {insights.map((insight, i) => (
          <div
            key={i}
            className={`border-l-2 ${borderColor[insight.type]} pl-4 py-1`}
          >
            <p className="text-sm text-gray-300">
              <span className="mr-2">{insight.emoji}</span>
              {insight.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
