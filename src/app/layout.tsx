"use client";

import type { Metadata } from "next";
import { Alumni_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Provider from "@/Provider/Provider";

const alumniSans = Alumni_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-alumni",
  display: "swap",
});

const metadata: Metadata = {
  title: "Coditor",
  description: "AI Enabled Online Code Editor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${alumniSans.variable} antialiased font-sans`}>
        <Provider>{children}</Provider>
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
