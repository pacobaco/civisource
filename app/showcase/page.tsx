"use client";
import { useState } from "react";

const sources = [
  ["sam-gov", "SAM.gov"],
  ["grants-gov", "Grants.gov"],
  ["usaspending", "USAspending"],
  ["ted-eu", "TED EU"],
  ["uk-contracts-finder", "UK Contracts Finder"],
  ["world-bank", "World Bank"],
  ["eu-funding-tenders", "EU Funding & Tenders"]
];

export default function ShowcasePage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  async function submit(formData: FormData) {
    setLoading(true); setError(""); setResult(null);
    const payload: any = Object.fromEntries(formData.entries());
    payload.sources = formData.getAll("sources");
    try {
      const res = await fetch("/api/showcase", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Request failed");
      setResult(data);
    } catch (e: any) { setError(e.message || "Request failed"); }
    finally { setLoading(false); }
  }

  return <main className="wrap"><div className="grid"><section className="card"><span className="badge">Live multi-source demo</span><h1>Free Showcase</h1><p>Search procurement, grant, award, and multilateral sources from one convention-grade form. API keys stay server-side in <code>.env.local</code>.</p><form action={submit}><label>Email</label><input name="email" type="email" required placeholder="lead@example.com" /><label>Company</label><input name="company" placeholder="Saga Dog Corp" /><label>Keywords</label><input name="keywords" required placeholder="software cybersecurity training" /><label>State optional</label><input name="state" placeholder="FL" maxLength={2} /><label>Sources</label><div className="checks">{sources.map(([id,label]) => <label key={id}><input name="sources" type="checkbox" value={id} defaultChecked /> {label}</label>)}</div><button className="btn" disabled={loading}>{loading ? "Searching..." : "Generate Demo Report"}</button></form>{error && <p>{error}</p>}</section><section className="card"><h2>Result</h2>{!result && <p>Your opportunity report will appear here.</p>}{result && <div><p><strong>Source status:</strong> {result.source}</p><h3>Proposal Preview</h3><div className="result">{result.proposalPreview}</div><h3>Top Opportunities</h3><div className="grid">{result.opportunities?.map((o: any) => <article className="card" key={`${o.source}-${o.id}`}><span className="badge">{o.sourceLabel}</span><strong>{o.title}</strong><p>{o.agency || "Agency unavailable"}</p><p>Posted: {o.postedDate || "n/a"}<br/>Deadline: {o.closeDate || "n/a"}</p>{o.url && <a className="btn secondary" href={o.url} target="_blank">Open Notice</a>}</article>)}</div><h3>Integration Diagnostics</h3><div className="result">{JSON.stringify(result.results?.map((r:any)=>({source:r.source,status:r.status,message:r.message,count:r.opportunities?.length||0})), null, 2)}</div></div>}</section></div></main>;
}
