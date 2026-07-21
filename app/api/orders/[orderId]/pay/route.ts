import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  return NextResponse.json(
    { error: "Stripe integration is disabled. Paystack integration is coming soon." },
    { status: 501 }
  );
}
