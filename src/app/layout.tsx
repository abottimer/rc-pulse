import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RC Pulse — Subscription Health Dashboard",
  description:
    "Get a health score for your subscription business. Built on RevenueCat's Charts API. See MRR trends, churn rates, trial conversion, and actionable insights at a glance.",
  openGraph: {
    title: "RC Pulse — Subscription Health Dashboard",
    description:
      "Your subscription business health score, powered by RevenueCat Charts API.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RC Pulse — Subscription Health Dashboard",
    description:
      "Your subscription business health score, powered by RevenueCat Charts API.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-gray-950 antialiased`}>
        {children}
      </body>
    </html>
  );
}
