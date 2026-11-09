import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { Motion } from "@/components/motion/Motion";
import { siteConfig, aboutText } from "@/lib/constants";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const title = `${siteConfig.name} - AI Expert & Speaker`;
const description = `${siteConfig.name} is an AI Consultant at DataNorth AI based in ${siteConfig.location}. Strategy, workshops, and hands-on solutions in Computer Vision, NLP, and LLMs.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  title: {
    default: title,
    template: `%s - ${siteConfig.name}`,
  },
  description,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "profile",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title,
    description,
    locale: "en_US",
    images: [
      {
        url: "/photos/headshot.jpeg",
        width: 1200,
        height: 1200,
        alt: siteConfig.name,
      },
    ],
  },
};

// No maximum-scale: pinch-zoom stays on.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#05110f",
};

// Marks that JS runs, so the hero headline can wait for its entrance.
const jsScript = `document.documentElement.classList.add('js')`;

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  url: siteConfig.url,
  image: `${siteConfig.url}/photos/headshot.jpeg`,
  jobTitle: siteConfig.jobTitle,
  description: aboutText[0],
  worksFor: {
    "@type": "Organization",
    name: "DataNorth AI",
    url: "https://datanorth.ai",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "University of Groningen",
    url: "https://www.rug.nl",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Groningen",
    addressCountry: "NL",
  },
  // No `email` property here on purpose. Structured data is machine-readable
  // by definition, which makes it the single easiest place for a harvester to
  // lift an address from. Contact runs through the page's own UI instead.
  sameAs: [siteConfig.social.linkedin, siteConfig.social.github],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  url: siteConfig.url,
  name: siteConfig.name,
  description,
  author: { "@type": "Person", name: siteConfig.name, url: siteConfig.url },
  inLanguage: "en",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning: the inline script adds `js` before React
    // hydrates, so the hero can wait for its entrance.
    <html lang="en" className={geist.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: jsScript }} />
      </head>
      <body>
        <Motion />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
