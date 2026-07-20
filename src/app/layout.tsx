import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import { siteConfig, aboutText } from "@/lib/constants";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  axes: ["wdth"],
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
});

const title = `${siteConfig.name} — AI Consultant & Speaker`;
const description = `${siteConfig.name} is an AI Consultant at DataNorth AI based in ${siteConfig.location}. Strategy, workshops, and hands-on solutions in Computer Vision, NLP, and LLMs.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  title: {
    default: title,
    template: `%s — ${siteConfig.name}`,
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

// viewport-fit=cover lets the dark footer and the fixed palette trigger run
// under the notch/home indicator; the safe-area insets in globals.css keep the
// content itself out from under them. No maximum-scale — pinch-zoom stays on.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f1efe9" },
    { media: "(prefers-color-scheme: dark)", color: "#17150f" },
  ],
};

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
    <html
      lang="en"
      className={`h-full antialiased ${archivo.variable} ${plexMono.variable}`}
    >
      <body className="noise-overlay min-h-full bg-[var(--paper)] text-[var(--ink)]">
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
