import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import "./globals.css";

const defaultFont = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const displayFont = Inter_Tight({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RAG Component",
  description: "Streaming Chat Component with Persistent History",
  icons: {
    icon: [{ url: "upstash.png" }],
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
      className={`antialiased ${defaultFont.variable} ${displayFont.variable}`}
    >
      <body className="bg-gradient-to-br from-emerald-50 pb-32 font-sans text-emerald-900">
        {children}
      </body>
    </html>
  );
}
