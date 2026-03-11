import { NextResponse } from "next/server";
import { getOverview } from "@/lib/revenuecat";

export async function GET() {
  try {
    const data = await getOverview();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Overview API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch overview metrics" },
      { status: 500 }
    );
  }
}
