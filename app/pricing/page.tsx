const tiers = [
  ["Starter", "$299", "One team seat, limited bulk searches, proposal previews, email capture."],
  ["Professional", "$1,500", "Saved searches, exports, agency maps, richer proposal packages."],
  ["Enterprise", "$7,500", "Multi-org workflows, CRM handoff, custom sources, white-glove setup."]
];
export default function PricingPage(){return <main className="wrap"><h1>Pricing</h1><div className="grid">{tiers.map(([name,price,desc])=><section className="card" key={name}><h2>{name}</h2><div className="price">{price}<span style={{fontSize:16}}> /mo</span></div><p>{desc}</p><form action="/api/stripe/checkout" method="POST"><input type="hidden" name="tier" value={name.toLowerCase()} /><button className="btn">Start {name}</button></form></section>)}</div></main>}
