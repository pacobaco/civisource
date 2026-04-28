import Link from "next/link";
import { Workflow } from "@/components/Workflow";
import { getSectors } from "@/lib/data";

export default function HomePage() {
  const sectors = getSectors();
  return (
    <div>
      <section className="hero">
        <p className="gold"><b>Opportunity & Procurement Intelligence Platform</b></p>
        <h1>Civisource turns business capabilities into opportunity pipelines.</h1>
        <p className="muted">
          Demonstrate how a service description becomes matched opportunities,
          proposal previews, requirements checklists, and lead-tracked follow-up.
        </p>
        <Workflow />
        <div style={{ marginTop: 22 }}>
          <Link className="btn" href="/demo">Try the Demo</Link>{" "}
          <Link className="btn secondary" href="/civisource">View Landing Page</Link>
        </div>
      </section>

      <section className="grid section">
        <div className="card"><h2>Detect</h2><p>Convert opportunity sources into structured business signals.</p></div>
        <div className="card"><h2>Match</h2><p>Map services, sectors, and buyer language to funding and contracts.</p></div>
        <div className="card"><h2>Draft</h2><p>Generate proposal previews, requirements, and submission steps.</p></div>
      </section>

      <section className="section">
        <h2>Sector coverage</h2>
        <div className="grid">
          {sectors.map(s => (
            <Link key={s.slug} href={`/sectors/${s.slug}`} className="card" style={{ textDecoration: "none", color: "inherit" }}>
              <h3>{s.name}</h3>
              <p className="muted">{s.summary}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
