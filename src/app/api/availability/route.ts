import { NextResponse } from "next/server";
import {
  getAvailabilityMeta,
  getFreeSlotsForDate,
} from "@/lib/availability-server";

export const dynamic = "force-dynamic";

/**
 * GET /api/availability?meta=1        -> { activeWeekdays, blockedDates }
 * GET /api/availability?date=YYYY-MM-DD -> { slots: string[] }
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  if (searchParams.get("meta")) {
    const meta = await getAvailabilityMeta();
    return NextResponse.json(meta);
  }

  const date = searchParams.get("date");
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json(
      { error: "Parámetro 'date' inválido (formato YYYY-MM-DD)." },
      { status: 400 },
    );
  }

  const slots = await getFreeSlotsForDate(date);
  return NextResponse.json({ slots });
}
