import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Civisource",
  description: "Opportunity and procurement intelligence platform"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main className="shell">
          <nav className="nav">
            <div className="brand">SAGA DOG <span>// CIVISOURCE</span></div>
            <div>
              <Link href="/">Home</Link>
              <Link href="/civisource">Landing</Link>
              <Link href="/demo">Demo</Link>
              <Link href="/sectors">Sectors</Link>
              <Link href="/sources">Sources</Link>
              <Link href="/leads">Leads</Link>
            </div>
          </nav>
          {children}
        </main>
      </body>
    </html>
  );
}
