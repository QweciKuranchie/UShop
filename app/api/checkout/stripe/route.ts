import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  return NextResponse.json(
    { error: "Stripe integration is disabled. Paystack integration is coming soon." },
    { status: 501 }
  );
};
