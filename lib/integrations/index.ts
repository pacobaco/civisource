import { searchEuFundingTenders } from "./euFunding";
import { searchGrantsGov } from "./grants";
import { searchSam } from "./sam";
import { searchTed } from "./ted";
import { SearchInput, SourceId, SourceSearchResult } from "./types";
import { searchUkContracts } from "./uk";
import { searchUsaSpending } from "./usaspending";
import { searchWorldBank } from "./worldbank";

export const ALL_SOURCES: SourceId[] = ["sam-gov", "grants-gov", "usaspending", "ted-eu", "uk-contracts-finder", "world-bank", "eu-funding-tenders"];

const runners: Record<SourceId, (input: SearchInput) => Promise<SourceSearchResult>> = {
  "sam-gov": searchSam,
  "grants-gov": searchGrantsGov,
  usaspending: searchUsaSpending,
  "ted-eu": searchTed,
  "uk-contracts-finder": searchUkContracts,
  "world-bank": searchWorldBank,
  "eu-funding-tenders": searchEuFundingTenders
};

export async function searchAllSources(input: SearchInput): Promise<SourceSearchResult[]> {
  const selected = input.sources?.length ? input.sources : ALL_SOURCES;
  const settled = await Promise.allSettled(selected.map((source) => runners[source](input)));
  return settled.map((result, index) => {
    if (result.status === "fulfilled") return result.value;
    const source = selected[index];
    return { source, sourceLabel: source, status: "error", message: result.reason?.message || "Unknown integration error", opportunities: [] };
  });
}

export * from "./types";
