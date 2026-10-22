export type Service = {
  id: "websites" | "automation";
  name: string;
  headline: string;
  problem: string;
  build: string[];
  change: string;
  /** A real, checked result from a real client. Placeholder until supplied. */
  proof: string;
};

export const services: Service[] = [
  {
    id: "websites",
    name: "Websites",
    headline: "A page worth the horse.",
    problem:
      "Most horses are sold from scattered social posts and third-party adverts. Buyers have to piece the story together, and the best horses end up looking ordinary.",
    build: [
      "A bespoke website for your yard or sales business, designed around your horses",
      "A page for every horse: clear facts, an honest description, a photo gallery and video",
      "Fast on every phone, with an enquiry form on every page",
      "Simple controls, so you can add and update horses yourself",
    ],
    change:
      "Each horse gets one place where it is presented properly, and buyers arrive knowing the essentials before they get in touch.",
    proof: "[VERIFY: a real result from a real client, for example the share of enquiries that arrive with a viewing request]",
  },
  {
    id: "automation",
    name: "Automation",
    headline: "Every enquiry answered, in minutes.",
    problem:
      "Enquiries arrive at all hours, usually when you are riding, travelling or at a show. By the time you reply, the buyer has often moved on.",
    build: [
      "Instant, friendly replies that include the horse’s details and videos",
      "A few short qualifying questions: rider level, discipline, location and budget",
      "Viewing booking, with reminders for you and the buyer",
      "A plain enquiry log, so you can see who asked, what they wanted and what happened",
    ],
    change:
      "You wake up to qualified buyers with viewings booked, instead of a pile of unanswered messages.",
    proof: "[VERIFY: a real result from a real client, for example the change in average first-reply time]",
  },
];

export type Pkg = {
  id: string;
  name: string;
  line: string;
  from: string;
  timeline: string;
  includes: string[];
  cta: string;
};

export const packages: Pkg[] = [
  {
    id: "launch",
    name: "Launch",
    line: "The complete shop window, with enquiries handled from day one.",
    from: "[VERIFY: price]",
    timeline: "[VERIFY: timeline]",
    includes: [
      "Bespoke website for your yard or sales business",
      "A listing page for every horse, with gallery and video",
      "Instant enquiry replies and viewing booking",
      "Training and handover, so you stay in control",
    ],
    cta: "Discuss Launch",
  },
  {
    id: "automate",
    name: "Automate",
    line: "For yards that already have a website and want every enquiry answered.",
    from: "[VERIFY: price]",
    timeline: "[VERIFY: timeline]",
    includes: [
      "Instant replies with each horse’s details",
      "Qualifying questions and viewing booking",
      "A clear enquiry log",
      "Connected to the tools you already use, wherever possible",
    ],
    cta: "Discuss Automate",
  },
  {
    id: "custom",
    name: "Custom",
    line: "Several yards, a breeding programme, or something we have not listed.",
    from: "Quoted individually",
    timeline: "Agreed at the start",
    includes: [
      "Scope shaped around your business",
      "Multi-site or multi-brand setups",
      "Bespoke tools and integrations",
      "A named contact from the first call",
    ],
    cta: "Talk to us",
  },
];

export const assurance =
  "Scope and price are agreed in writing before we start. [VERIFY: pilot or guarantee terms you are willing to stand behind]";
