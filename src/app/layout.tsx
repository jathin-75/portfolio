import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"]
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "500", "600", "700"]
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kurapati.dev"),
  title: "Kurapati Venkata Sai Jathin — Software Engineer",
  description:
    "Portfolio of Kurapati Venkata Sai Jathin, Software Engineering Intern @ Klinn AI. Building high-throughput backend architecture, resilient web platforms, and intelligent systems.",
  keywords: [
    "Kurapati Venkata Sai Jathin",
    "Jathin Kurapati",
    "Software Engineer",
    "Backend Engineer",
    "FastAPI",
    "Next.js",
    "TypeScript",
    "Klinn AI",
    "Hyderabad Software Engineer",
    "Systems Builder",
    "AI ML Engineer"
  ],
  authors: [{ name: "Kurapati Venkata Sai Jathin" }],
  creator: "Kurapati Venkata Sai Jathin",
  openGraph: {
    title: "Kurapati Venkata Sai Jathin — Software Engineer",
    description:
      "Building high-throughput backend architecture, resilient web platforms, and intelligent systems.",
    url: "https://kurapati.dev",
    siteName: "Kurapati.dev Portfolio",
    type: "website",
    locale: "en_US"
  },
  twitter: {
    card: "summary_large_image",
    title: "Kurapati Venkata Sai Jathin — Software Engineer",
    description:
      "Building high-throughput backend architecture, resilient web platforms, and intelligent systems."
  },
  robots: {
    index: true,
    follow: true
  }
};

export const viewport: Viewport = {
  themeColor: "#080808",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jakartaSans.variable} ${jetbrainsMono.variable} dark`}
    >
      <body className="min-h-screen bg-[#080808] text-[#F5F5F5] antialiased selection:bg-[#7A1F2B]/60 selection:text-white">
        {children}
      </body>
    </html>
  );
}
