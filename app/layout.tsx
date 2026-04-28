import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Civisource",
  description: "SAM.gov opportunity discovery, proposal previews, and lead capture.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav className="nav">
          <Link className="brand" href="/">CIVISOURCE</Link>
          <div className="navlinks">
            <Link href="/showcase">Free Showcase</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/leads">Leads</Link>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
