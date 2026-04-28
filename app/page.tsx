import Link from "next/link";

export default function HomePage() {
  return (
    <main className="wrap">
      <section className="hero">
        <div>
          <span className="badge">SAM.gov demo showcase</span>
          <h1>Opportunity intelligence for procurement pipelines.</h1>
          <p>Civisource converts a business email, organization name, and keywords into live SAM.gov opportunity matches, proposal preview text, and a subscription conversion path.</p>
          <p><Link className="btn" href="/showcase">Run Free Showcase</Link> <Link className="btn secondary" href="/pricing">View Pricing</Link></p>
        </div>
        <div className="card">
          <h2>Demo Flow</h2>
          <p>Email + company + keywords → SAM.gov search → normalized opportunities → proposal preview → upgrade CTA.</p>
          <p>Missing API key? The app returns mock results so the convention demo still works.</p>
        </div>
      </section>
    </main>
  );
}
