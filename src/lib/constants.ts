export const siteConfig = {
  name: "Chris van Riemsdijk",
  firstName: "Chris",
  url: "https://chrisvanriemsdijk.com",
  jobTitle: "AI Consultant & Speaker",
  location: "Groningen, Netherlands",
  role: "Making AI clear, useful, and human",
  tagline:
    "I help individuals and organizations turn AI, from generative tools to agentic systems, into practical progress.",
  // The email address deliberately does not live here, see lib/email.ts.
  // Anything in this file can end up in the static HTML, the JSON-LD, or
  // llms.txt, which is where address harvesters look.
  creatingSince: "2022",
  workshopsGiven: "200+",
  social: {
    github: "https://github.com/chrisvanriemsdijk",
    linkedin: "https://linkedin.com/in/chrisvanriemsdijk",
  },
};

export const introText = [
  "I'm an AI consultant at DataNorth AI in Groningen. I help organizations move from AI experiments to working systems, from shaping the strategy to building AI agents, LLM applications, computer vision and NLP.",
  "Before consulting I was an AI engineer at Klippa, working on identity verification and fraud detection. I studied Data Science & Systems Complexity at the University of Groningen, where my research applied graph neural networks to real infrastructure problems.",
];

// One-sentence belief, shown as the pull quote above the principles.
export const statement =
  "The more people understand AI, the better we shape what it becomes.";

export interface Stat {
  value: string;
  label: string;
}

export const stats: Stat[] = [
  { value: "83%", label: "of participants saved 11 to 50% of their time" },
  { value: "100%", label: "saw an immediate improvement in the quality of their work" },
  { value: "4.2/5", label: "average score for how applicable the workshop was" },
];

export interface Service {
  // Where this sits on the route from a first talk to a system in production.
  stage: string;
  title: string;
  description: string;
  tags: string[];
}

export const services: Service[] = [
  {
    stage: "Inspire",
    title: "Keynotes & speaking",
    description:
      "Talks on where AI is heading, from generative AI to autonomous agents, and what it means for your work. Clear, energetic, without the hype.",
    tags: ["Conferences", "Webinars", "In-company sessions"],
  },
  {
    stage: "Learn",
    title: "Workshops & training",
    description:
      "Hands-on sessions built around your team's real work, from first prompts to designing and building your own AI agents.",
    tags: ["Prompting", "AI agents", "Beginner to advanced"],
  },
  {
    stage: "Plan",
    title: "AI strategy & advisory",
    description:
      "Assessments and roadmaps that show where AI and agentic workflows genuinely move the needle in your organization, and where they don't.",
    tags: ["Assessments", "Roadmaps", "Agentic workflows"],
  },
  {
    stage: "Build",
    title: "Custom AI solutions",
    description:
      "When a workshop isn't enough, I build it: AI agents, LLM applications, computer vision and NLP systems that hold up in production.",
    tags: ["AI agents", "LLMs", "Computer vision"],
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
    body: "The best AI systems, agents included, amplify people instead of replacing their judgment. I start from how people actually work, then find where AI genuinely helps.",
  },
  {
    title: "Pragmatism over hype",
    body: "Not every problem needs an agent. I'd rather ship a simple system that works than an impressive demo that doesn't survive contact with reality.",
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
    period: "2023 - now",
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
    period: "2022 - 2023",
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
    logo: "/logos/rug.png",
    url: "https://www.rug.nl",
    role: "MSc Data Science & Systems Complexity",
    period: "2025",
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
    venue: "Grip Connect, REEF",
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

export interface Faq {
  q: string;
  a: string;
}

// Answers stay within what the rest of this file already states.
export const faqs: Faq[] = [
  {
    q: "Who are your workshops for?",
    a: "Teams of any level, from people taking their first steps with ChatGPT to developers building their own AI agents. Every session is built around the work the group actually does.",
  },
  {
    q: "Do you speak in Dutch or English?",
    a: "Both. I give talks and workshops in Dutch and in English, at conferences, webinars and in-company sessions across the Netherlands, Europe and the US.",
  },
  {
    q: "Can you come to our office?",
    a: "Yes. Most workshops run in-company, from a short session to a full day. Webinars and online sessions work too.",
  },
  {
    q: "What happens after the workshop?",
    a: "That depends on where you want to go. Some teams continue with a training program, others with an assessment and roadmap, and some with AI agents or a custom solution built for production.",
  },
  {
    q: "How do I book a session?",
    a: "Send me an email about your team and what you want to get out of it, and we'll work out a format that fits.",
  },
];
