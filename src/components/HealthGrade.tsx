"use client";

import type { HealthScore } from "@/lib/health-score";

interface HealthGradeProps {
  health: HealthScore;
}

export function HealthGrade({ health }: HealthGradeProps) {
  return (
    <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-8">
      <div className="flex items-start gap-8">
        {/* Grade Circle */}
        <div className="flex-shrink-0">
          <div
            className="w-28 h-28 rounded-full flex items-center justify-center border-4"
            style={{ borderColor: health.color }}
          >
            <div className="text-center">
              <span
                className="text-5xl font-black"
                style={{ color: health.color }}
              >
                {health.grade}
              </span>
              <p className="text-xs text-gray-400 mt-0.5">{health.score}/100</p>
            </div>
          </div>
        </div>

        {/* Assessment + Factors */}
        <div className="flex-1">
          <h2 className="text-xl font-bold text-white mb-1">
            Subscription Health Score
          </h2>
          <p className="text-gray-400 mb-4">{health.assessment}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {health.factors.map((factor) => (
              <div
                key={factor.name}
                className="bg-gray-900/50 rounded-lg p-3 border border-gray-700/30"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-300">
                    {factor.name}
                  </span>
                  <span
                    className="text-sm font-bold"
                    style={{
                      color:
                        factor.score >= 80
                          ? "#22c55e"
                          : factor.score >= 60
                            ? "#eab308"
                            : "#ef4444",
                    }}
                  >
                    {factor.score}
                  </span>
                </div>
                <p className="text-xs text-gray-500">{factor.detail}</p>
                <p className="text-xs text-gray-600 mt-0.5">{factor.benchmark}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
