import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  return NextResponse.json({ message: "Stripe webhook is disabled." }, { status: 200 });
}
