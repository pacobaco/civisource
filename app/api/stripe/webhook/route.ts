import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest){
  const body = await req.text();
  return NextResponse.json({received:true, note:"Wire Stripe signature verification before production.", bytes: body.length});
}
