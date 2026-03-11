"use client";

interface MetricCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: string;
  trend?: "up" | "down" | "flat";
}

export function MetricCard({ title, value, subtitle, icon, trend }: MetricCardProps) {
  const trendColor =
    trend === "up"
      ? "text-green-400"
      : trend === "down"
        ? "text-red-400"
        : "text-gray-400";
  const trendIcon =
    trend === "up" ? "↑" : trend === "down" ? "↓" : "→";

  return (
    <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 hover:border-gray-600/50 transition-colors">
      <div className="flex items-center justify-between mb-2">
        <span className="text-2xl">{icon}</span>
        {trend && (
          <span className={`text-sm font-medium ${trendColor}`}>
            {trendIcon}
          </span>
        )}
      </div>
      <p className="text-sm text-gray-400 mb-1">{title}</p>
      <p className="text-3xl font-bold text-white">{value}</p>
      <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
    </div>
  );
}
