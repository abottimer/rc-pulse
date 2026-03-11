const RC_API_KEY = process.env.RC_API_KEY!;
const RC_PROJECT_ID = process.env.RC_PROJECT_ID!;
const BASE_URL = "https://api.revenuecat.com/v2";

async function rcFetch(path: string, params?: Record<string, string>) {
  const url = new URL(`${BASE_URL}${path}`);
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  }
  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${RC_API_KEY}` },
    next: { revalidate: 300 }, // cache 5 min
  });
  if (!res.ok) {
    throw new Error(`RevenueCat API error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export interface OverviewMetric {
  id: string;
  name: string;
  description: string;
  value: number;
  unit: string;
  period: string;
}

export interface OverviewResponse {
  metrics: OverviewMetric[];
}

export async function getOverview(): Promise<OverviewResponse> {
  return rcFetch(`/projects/${RC_PROJECT_ID}/metrics/overview`);
}

export interface ChartValue {
  cohort: number;
  incomplete: boolean;
  measure: number;
  value: number;
}

export interface ChartMeasure {
  chartable: boolean;
  decimal_precision: number;
  description: string;
  display_name: string;
  tabulable: boolean;
  unit: string;
}

export interface ChartResponse {
  category: string;
  display_name: string;
  description: string;
  measures: ChartMeasure[];
  values: ChartValue[];
  summary: {
    average: Record<string, number>;
    total: Record<string, number>;
  };
  start_date: number;
  end_date: number;
  resolution: string;
}

export type ChartType =
  | "revenue"
  | "mrr"
  | "mrr_movement"
  | "churn"
  | "actives"
  | "trials"
  | "trial_conversion_rate"
  | "customers_new"
  | "refund_rate"
  | "ltv_per_customer";

export async function getChart(
  type: ChartType,
  startDate: string,
  endDate: string,
  resolution: string = "month"
): Promise<ChartResponse> {
  return rcFetch(`/projects/${RC_PROJECT_ID}/charts/${type}`, {
    start_date: startDate,
    end_date: endDate,
    resolution,
  });
}
