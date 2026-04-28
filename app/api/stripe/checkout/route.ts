import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
const priceMap: Record<string,string|undefined> = { starter: process.env.STRIPE_PRICE_STARTER, professional: process.env.STRIPE_PRICE_PROFESSIONAL, enterprise: process.env.STRIPE_PRICE_ENTERPRISE };
export async function POST(req: NextRequest){
  try{
    const form = await req.formData().catch(()=>null);
    const tier = String(form?.get("tier") || "starter").toLowerCase();
    const secret = process.env.STRIPE_SECRET_KEY;
    const price = priceMap[tier];
    if(!secret || !price) return NextResponse.json({error:"Stripe is not configured. Add STRIPE_SECRET_KEY and tier price IDs."},{status:400});
    const stripe = new Stripe(secret);
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const session = await stripe.checkout.sessions.create({mode:"subscription",line_items:[{price,quantity:1}],success_url:`${appUrl}/pricing?success=1`,cancel_url:`${appUrl}/pricing?canceled=1`});
    return NextResponse.redirect(session.url || `${appUrl}/pricing`);
  }catch(e:any){return NextResponse.json({error:e.message || "Stripe checkout failed"},{status:500})}
}
