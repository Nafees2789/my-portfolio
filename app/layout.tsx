import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { SmoothScroll } from "@/components/smooth-scroll";
import { profile } from "@/lib/data";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const title = `${profile.name} — ${profile.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: { default: title, template: `%s — ${profile.name}` },
  description: profile.summary,
  authors: [{ name: profile.name }],
  keywords: [
    "React Developer",
    "Next.js Developer",
    "Full-Stack Developer",
    "React",
    "Next.js",
    "Node.js",
    "Express",
    "TypeScript",
    "MongoDB",
    profile.name,
  ],
  openGraph: {
    type: "website",
    title,
    description: profile.summary,
    siteName: profile.name,
  },
  twitter: { card: "summary_large_image", title, description: profile.summary },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f3ec" },
    { media: "(prefers-color-scheme: dark)", color: "#08110e" },
  ],
};

// Runs before first paint so the stored or system theme never flashes.
const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme="light"}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="grain min-h-full">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
