import sectors from "@/data/sectors.json";
import { Sector } from "./types";

export function getSectors(): Sector[] {
  return sectors as Sector[];
}

export function getSector(slug: string): Sector | undefined {
  return getSectors().find((s) => s.slug === slug);
}

export function allOpportunities() {
  return getSectors().flatMap((s) =>
    s.opportunities.map((o) => ({ ...o, sector: s.name, sectorSlug: s.slug }))
  );
}
