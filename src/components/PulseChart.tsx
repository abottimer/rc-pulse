"use client";

import {
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface DataPoint {
  date: string;
  value: number;
}

interface PulseChartProps {
  title: string;
  data: DataPoint[];
  type?: "area" | "line" | "bar";
  color?: string;
  unit?: string;
  formatValue?: (v: number) => string;
}

const defaultFormat = (v: number) => v.toLocaleString();

export function PulseChart({
  title,
  data,
  type = "area",
  color = "#F25A5A",
  unit = "",
  formatValue = defaultFormat,
}: PulseChartProps) {
  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active?: boolean;
    payload?: Array<{ value: number }>;
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm">
          <p className="text-gray-400">{label}</p>
          <p className="text-white font-medium">
            {unit === "$" ? "$" : ""}
            {formatValue(payload[0].value)}
            {unit === "%" ? "%" : unit && unit !== "$" ? ` ${unit}` : ""}
          </p>
        </div>
      );
    }
    return null;
  };

  const formatYAxis = (v: number) => {
    if (unit === "$") {
      if (v >= 1000) return `$${(v / 1000).toFixed(1)}k`;
      return `$${v}`;
    }
    if (unit === "%") return `${v}%`;
    if (v >= 1000) return `${(v / 1000).toFixed(1)}k`;
    return v.toString();
  };

  return (
    <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6">
      <h3 className="text-sm font-medium text-gray-400 mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={220}>
        {type === "area" ? (
          <AreaChart data={data}>
            <defs>
              <linearGradient id={`gradient-${title}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: "#9CA3AF" }}
              axisLine={{ stroke: "#374151" }}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#9CA3AF" }}
              axisLine={{ stroke: "#374151" }}
              tickFormatter={formatYAxis}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              fill={`url(#gradient-${title})`}
            />
          </AreaChart>
        ) : type === "bar" ? (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: "#9CA3AF" }}
              axisLine={{ stroke: "#374151" }}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#9CA3AF" }}
              axisLine={{ stroke: "#374151" }}
              tickFormatter={formatYAxis}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="value" fill={color} radius={[4, 4, 0, 0]} />
          </BarChart>
        ) : (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: "#9CA3AF" }}
              axisLine={{ stroke: "#374151" }}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#9CA3AF" }}
              axisLine={{ stroke: "#374151" }}
              tickFormatter={formatYAxis}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              dot={{ fill: color, r: 3 }}
            />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
