export type CivisourceTier = "starter" | "professional" | "enterprise";

export type PricingTier = {
  id: CivisourceTier;
  name: string;
  price: string;
  interval: string;
  priceEnvKey: string;
  description: string;
  features: string[];
  limits: {
    reportsPerMonth: number | "custom";
    proposalDraftsPerMonth: number | "custom";
    sectors: string;
    leadDashboard: boolean;
    apiRegistry: boolean;
    support: string;
  };
};

export const pricingTiers: PricingTier[] = [
  {
    id: "starter",
    name: "Starter",
    price: "$299",
    interval: "month",
    priceEnvKey: "STRIPE_PRICE_STARTER",
    description: "For small businesses testing opportunity intelligence.",
    features: [
      "3 opportunity reports per month",
      "3 proposal previews per month",
      "Mock sector matching demo",
      "Lead capture dashboard",
      "CSV export",
      "Email-ready report text"
    ],
    limits: {
      reportsPerMonth: 3,
      proposalDraftsPerMonth: 3,
      sectors: "Core sectors",
      leadDashboard: true,
      apiRegistry: false,
      support: "Email"
    }
  },
  {
    id: "professional",
    name: "Professional",
    price: "$1,500",
    interval: "month",
    priceEnvKey: "STRIPE_PRICE_PROFESSIONAL",
    description: "For consultants and firms actively pursuing contracts and grants.",
    features: [
      "25 opportunity reports per month",
      "25 proposal drafts per month",
      "Expanded sector matching",
      "Granting body API registry",
      "Lead dashboard + CSV export",
      "Priority scoring",
      "Monthly pipeline review"
    ],
    limits: {
      reportsPerMonth: 25,
      proposalDraftsPerMonth: 25,
      sectors: "Expanded",
      leadDashboard: true,
      apiRegistry: true,
      support: "Priority email"
    }
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "$7,500",
    interval: "month",
    priceEnvKey: "STRIPE_PRICE_ENTERPRISE",
    description: "For high-volume pipeline creation, business development, and client delivery.",
    features: [
      "Custom report volume",
      "Custom proposal generation volume",
      "Multi-client opportunity workflows",
      "API source registry",
      "Lead dashboard",
      "CSV export",
      "Custom onboarding",
      "Strategic pipeline support"
    ],
    limits: {
      reportsPerMonth: "custom",
      proposalDraftsPerMonth: "custom",
      sectors: "Custom",
      leadDashboard: true,
      apiRegistry: true,
      support: "Strategic support"
    }
  }
];

export function getTier(id: string) {
  return pricingTiers.find((tier) => tier.id === id);
}

export function getStripePriceId(tierId: string): string | undefined {
  const tier = getTier(tierId);
  if (!tier) return undefined;
  return process.env[tier.priceEnvKey];
}
