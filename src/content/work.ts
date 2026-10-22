export type CaseStudy = {
  slug: string;
  /** True until real client details replace the placeholder text. */
  placeholder: boolean;
  client: string;
  sector: string;
  services: string[];
  year: string;
  summary: string;
  problem: string;
  approach: string;
  results: { value: string; label: string }[];
  quote: { text: string; name: string; role: string };
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "sales-yard",
    placeholder: true,
    client: "[VERIFY: client name]",
    sector: "Horse sales yard",
    services: ["Website", "Automation"],
    year: "[VERIFY: year]",
    summary: "[VERIFY: one sentence on what you did for this client and what changed]",
    problem:
      "[VERIFY: describe the real situation before the project: where enquiries were lost, how horses were presented, what it cost the client]",
    approach:
      "[VERIFY: describe what you built and how: the website, the enquiry flow, what was connected, what the client now controls]",
    results: [
      { value: "[VERIFY: metric]", label: "[VERIFY: what it measures]" },
      { value: "[VERIFY: metric]", label: "[VERIFY: what it measures]" },
      { value: "[VERIFY: metric]", label: "[VERIFY: what it measures]" },
    ],
    quote: { text: "[VERIFY: a real quote, with permission]", name: "[VERIFY: name]", role: "[VERIFY: role]" },
  },
  {
    slug: "breeder",
    placeholder: true,
    client: "[VERIFY: client name]",
    sector: "Breeder",
    services: ["Website"],
    year: "[VERIFY: year]",
    summary: "[VERIFY: one sentence on what you did for this client and what changed]",
    problem: "[VERIFY: describe the real situation before the project]",
    approach: "[VERIFY: describe what you built and how]",
    results: [
      { value: "[VERIFY: metric]", label: "[VERIFY: what it measures]" },
      { value: "[VERIFY: metric]", label: "[VERIFY: what it measures]" },
    ],
    quote: { text: "[VERIFY: a real quote, with permission]", name: "[VERIFY: name]", role: "[VERIFY: role]" },
  },
  {
    slug: "producer",
    placeholder: true,
    client: "[VERIFY: client name]",
    sector: "Dealer and producer",
    services: ["Automation"],
    year: "[VERIFY: year]",
    summary: "[VERIFY: one sentence on what you did for this client and what changed]",
    problem: "[VERIFY: describe the real situation before the project]",
    approach: "[VERIFY: describe what you built and how]",
    results: [
      { value: "[VERIFY: metric]", label: "[VERIFY: what it measures]" },
      { value: "[VERIFY: metric]", label: "[VERIFY: what it measures]" },
    ],
    quote: { text: "[VERIFY: a real quote, with permission]", name: "[VERIFY: name]", role: "[VERIFY: role]" },
  },
];
