import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://chrisvanriemsdijk.com"),
  title: "Chris van Riemsdijk — AI Consultant",
  description:
    "Making AI clear, useful, and human. I help individuals and organizations turn AI into practical progress.",
  openGraph: {
    title: "Chris van Riemsdijk — AI Consultant",
    description:
      "Making AI clear, useful, and human. I help individuals and organizations turn AI into practical progress.",
    images: ["/photos/headshot.jpeg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="noise-overlay min-h-full bg-[var(--bg-primary)] text-[var(--text-primary)]">
        {children}
      </body>
    </html>
  );
}
