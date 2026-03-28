export const siteConfig = {
  name: "Chris van Riemsdijk",
  role: "Making AI clear, useful, and human ",
  tagline:
    "I help individuals and organizations turn AI into practical progress.",
  email: "chris@datanorth.ai",
  social: {
    github: "https://github.com/chrisvanriemsdijk",
    linkedin: "https://linkedin.com/in/chrisvanriemsdijk",
  },
};

export const aboutText = [
  "I'm an AI Consultant at DataNorth AI, where I help organizations turn AI from a buzzword into real impact. Whether that's shaping strategy, guiding investment decisions, or building hands-on solutions with Computer Vision, NLP, and LLMs.",
  "Before consulting, I worked as an AI Engineer at Klippa on identity verification and fraud detection, and studied Data Science & Systems Complexity at the University of Groningen, where my research applied Graph Neural Networks to infrastructure problems.",
  "My personal mission is to educate more people on AI. I've given 100+ workshops across the Netherlands, Europe, and the US, from boardrooms to student classrooms, because I believe AI literacy shouldn't be reserved for engineers. The more people understand AI, the better we can shape its future together.",
];

const monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function parseDate(dateStr: string): Date {
  const [mon, year] = dateStr.split(" ");
  return new Date(parseInt(year), monthNames.indexOf(mon));
}

export function calcDuration(startDate: string, endDate: string | null): string {
  const start = parseDate(startDate);
  const end = endDate ? parseDate(endDate) : new Date();
  let months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  if (months < 0) months = 0;
  const yr = Math.floor(months / 12);
  const mo = months % 12;
  const parts: string[] = [];
  if (yr > 0) parts.push(`${yr} yr${yr > 1 ? "s" : ""}`);
  if (mo > 0) parts.push(`${mo} mo`);
  return parts.join(" ") || "< 1 mo";
}

export interface Experience {
  company: string;
  logo: string;
  url: string;
  role: string;
  startDate: string;
  endDate: string | null;
  description: string;
  bullets: string[];
  skills: string[];
}

export const experience: Experience[] = [
  {
    company: "DataNorth AI",
    logo: "/logos/datanorth.png",
    url: "https://datanorth.ai",
    role: "AI Consultant",
    startDate: "Aug 2023",
    endDate: null,

    description:
      "Supporting corporates and SMEs with their AI challenges: from shaping strategies and guiding investment decisions to creating value through practical implementations.",
    bullets: [
      "Helping companies unlock efficiency with AI, cutting dozens of FTEs through smart automation",
      "Applying Computer Vision, NLP, and LLMs to solve real business problems",
      "Partnering with organizations worldwide to design and execute AI strategies",
      "Sharing knowledge through 100+ workshops, from beginner to advanced",
    ],
    skills: ["Python", "Deep Learning", "Machine Learning", "NLP"],
  },
  {
    company: "Klippa",
    logo: "/logos/klippa.ico",
    url: "https://klippa.com",
    role: "AI Engineer",
    startDate: "Jul 2022",
    endDate: "Sep 2023",

    description:
      "Building and improving AI models for identity verification and document processing at scale.",
    bullets: [
      "Improved KYC models for automated identity document verification and fraud detection",
      "Owned the liveness detection model for the Identity Verification product",
      "Developed and optimized fraud detection models to flag forged and tampered documents",
      "Worked across Computer Vision and deep learning pipelines in a production environment",
    ],
    skills: ["Python", "Deep Learning", "Computer Vision", "OCR"],
  },
];
