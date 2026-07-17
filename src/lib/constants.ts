export const siteConfig = {
  name: "Chris van Riemsdijk",
  firstName: "Chris",
  url: "https://chrisvanriemsdijk.com",
  jobTitle: "AI Consultant & Speaker",
  location: "Groningen, Netherlands",
  role: "Making AI clear, useful, and human",
  tagline:
    "I help individuals and organizations turn AI into practical progress.",
  email: "chris@datanorth.ai",
  creatingSince: "2022",
  social: {
    github: "https://github.com/chrisvanriemsdijk",
    linkedin: "https://linkedin.com/in/chrisvanriemsdijk",
  },
};

export const introText = [
  "I'm Chris, an AI Consultant at DataNorth AI based in Groningen. I help organizations turn AI from a buzzword into working systems — shaping strategy and building hands-on solutions with LLMs, Computer Vision, and NLP.",
  "Before consulting, I was an AI Engineer at Klippa working on identity verification and fraud detection, and I studied Data Science & Systems Complexity at the University of Groningen, where my research applied Graph Neural Networks to real-world infrastructure problems.",
];

// Scroll-fill statement — one sentence, revealed word by word.
export const statement =
  "From boardrooms to classrooms, I believe AI literacy shouldn't be reserved for engineers — the more people understand AI, the better we shape its future together.";

export interface Stat {
  value: string;
  label: string;
}

export const stats: Stat[] = [
  { value: "200+", label: "Workshops given across NL, Europe & the US" },
  { value: "83%", label: "Of workshop participants saved 11–50% of their time" },
  { value: "100%", label: "Saw immediate quality improvement in their work" },
  { value: "4.2/5", label: "Applicability score from workshop participants" },
];

export interface Service {
  title: string;
  tags: string[];
}

export const services: Service[] = [
  {
    title: "AI Strategy & Advisory",
    tags: ["Assessments", "Roadmaps"],
  },
  {
    title: "Workshops & Training",
    tags: ["ChatGPT", "AI agents", "Beginner to advanced"],
  },
  {
    title: "Custom AI Solutions",
    tags: ["LLMs", "Computer Vision", "NLP"],
  },
  {
    title: "Keynotes & Speaking",
    tags: ["Conferences", "Webinars", "In-company sessions"],
  },
];

export interface Principle {
  title: string;
  body: string;
}

export const principles: Principle[] = [
  {
    title: "AI literacy is for everyone",
    body: "Understanding AI shouldn't require an engineering degree. I explain models the way I'd want them explained to me: plainly, honestly, and without the mystique.",
  },
  {
    title: "Humans first, models second",
    body: "The best AI systems amplify people instead of replacing judgment. I start from how people actually work, then find where AI genuinely helps.",
  },
  {
    title: "Pragmatism over hype",
    body: "Not every problem needs an LLM. I'd rather ship a simple system that works than an impressive demo that doesn't survive contact with reality.",
  },
];

export interface Experience {
  company: string;
  logo: string;
  url: string;
  role: string;
  period: string;
  description: string;
  bullets: string[];
}

export const experience: Experience[] = [
  {
    company: "DataNorth AI",
    logo: "/logos/datanorth.png",
    url: "https://datanorth.ai",
    role: "AI Consultant",
    period: "2023 — Present",
    description:
      "Supporting corporates and SMEs with their AI challenges: from shaping strategy to creating value through practical implementations.",
    bullets: [
      "Leading iterative AI training programs for corporate teams, from first demo to daily use",
      "Applying Computer Vision, NLP, and LLMs to solve real business problems",
      "Partnering with organizations worldwide on AI strategy and execution",
    ],
  },
  {
    company: "Klippa",
    logo: "/logos/klippa.png",
    url: "https://klippa.com",
    role: "AI Engineer",
    period: "2022 — 2023",
    description:
      "Built and improved AI models for identity verification and document processing at scale.",
    bullets: [
      "Owned the liveness detection model for the Identity Verification product",
      "Improved KYC models for automated document verification and fraud detection",
      "Shipped Computer Vision and deep learning pipelines in production",
    ],
  },
  {
    company: "University of Groningen",
    logo: "",
    url: "https://www.rug.nl",
    role: "MSc Data Science & Systems Complexity",
    period: "Graduated 2025",
    description:
      "Research on Graph Neural Networks for critical infrastructure: leak detection in water networks through GNN-based pressure estimation.",
    bullets: [],
  },
];

export interface Talk {
  title: string;
  venue: string;
  kind: string;
  url?: string;
}

export const talks: Talk[] = [
  {
    title: "Going beyond tabular data with graphs",
    venue: "aiGrunn",
    kind: "Conference talk",
    url: "https://www.youtube.com/watch?v=NY7Xe8PFpL4",
  },
  {
    title: "AI in Finance and Control",
    venue: "Grip Connect · REEF",
    kind: "Speaker",
    url: "https://www.reef.nl/events/grip-connect-ai-in-finance-and-control/",
  },
  {
    title: "Generatieve AI in de praktijk",
    venue: "Iuris Legal Congress",
    kind: "Workshop",
    url: "https://www.iurislegal.nl/docenten/chris-van-riemsdijk/",
  },
  {
    title: "Building AI agents",
    venue: "SmartR Summercourse",
    kind: "Workshop",
    url: "https://smartr.nl/nieuws/onze-jaarlijkse-summercourse/",
  },
  {
    title: "Aan de slag met AI",
    venue: "Ruby, Winschoten",
    kind: "Workshop",
    url: "https://rubycampus.nl/nieuws/workshop-aan-de-slag-met-ai",
  },
];

// Kept for structured data in layout.tsx
export const aboutText = introText;
