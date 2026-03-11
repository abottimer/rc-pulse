import { NextResponse, NextRequest } from "next/server";
import { getChart, ChartType } from "@/lib/revenuecat";

const VALID_TYPES: ChartType[] = [
  "revenue",
  "mrr",
  "mrr_movement",
  "churn",
  "actives",
  "trials",
  "trial_conversion_rate",
  "customers_new",
  "refund_rate",
  "ltv_per_customer",
];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get("type") as ChartType;
  const startDate = searchParams.get("start_date");
  const endDate = searchParams.get("end_date");
  const resolution = searchParams.get("resolution") || "month";

  if (!type || !VALID_TYPES.includes(type)) {
    return NextResponse.json(
      { error: `Invalid chart type. Valid types: ${VALID_TYPES.join(", ")}` },
      { status: 400 }
    );
  }

  if (!startDate || !endDate) {
    return NextResponse.json(
      { error: "start_date and end_date are required (YYYY-MM-DD)" },
      { status: 400 }
    );
  }

  try {
    const data = await getChart(type, startDate, endDate, resolution);
    return NextResponse.json(data);
  } catch (error) {
    console.error(`Chart API error (${type}):`, error);
    return NextResponse.json(
      { error: `Failed to fetch ${type} chart data` },
      { status: 500 }
    );
  }
}
