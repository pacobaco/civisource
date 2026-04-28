import sources from "@/data/granting-bodies.json";

export type GrantingBodySource = {
  slug: string;
  name: string;
  jurisdiction: string;
  bodyType: string;
  coverage: string;
  apiType: string;
  auth: string;
  baseUrl: string;
  docsUrl: string;
  status: "primary" | "secondary" | "watchlist";
  notes: string;
};

export function getGrantingBodySources(): GrantingBodySource[] {
  return sources as GrantingBodySource[];
}

export function getGrantingBodySource(slug: string): GrantingBodySource | undefined {
  return getGrantingBodySources().find((s) => s.slug === slug);
}

export function groupSourcesByJurisdiction() {
  return getGrantingBodySources().reduce<Record<string, GrantingBodySource[]>>((acc, source) => {
    acc[source.jurisdiction] ||= [];
    acc[source.jurisdiction].push(source);
    return acc;
  }, {});
}

export function searchSources(query: string): GrantingBodySource[] {
  const q = query.toLowerCase();
  return getGrantingBodySources().filter((s) =>
    [s.name, s.jurisdiction, s.bodyType, s.coverage, s.notes].join(" ").toLowerCase().includes(q)
  );
}
