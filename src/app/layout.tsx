import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit, Space_Mono } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: "600",
  variable: "--font-display",
});

const body = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
});

const mono = Space_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-mono",
});

const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://unpkg.com",
  "style-src 'self' 'unsafe-inline' https://unpkg.com",
  "img-src 'self' data: blob: https://*.tile.openstreetmap.org",
  "connect-src 'self' https://api.airtable.com https://*.tile.openstreetmap.org ws://localhost:* ws://127.0.0.1:*",
  "font-src 'self'",
  "media-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

export const metadata: Metadata = {
  metadataBase: new URL("https://plotcare.in"),
  title: {
    default: "PlotCare - Turn idle land into managed income",
    template: "%s | PlotCare",
  },
  description:
    "PlotCare helps absentee and urban landowners understand, activate, and track idle land through land intelligence, verified farmer matching, and managed revenue workflows.",
  openGraph: {
    title: "PlotCare - Your land, finally working for you",
    description:
      "A land intelligence and activation platform starting in Andhra Pradesh.",
    siteName: "PlotCare",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <head>
        <meta httpEquiv="Content-Security-Policy" content={contentSecurityPolicy} />
      </head>
      <body>{children}</body>
    </html>
  );
}
