import type { Metadata } from "next";
import { Alumni_Sans } from "next/font/google";
import "./globals.css";

const alumniSans = Alumni_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-alumni",
  display: "swap",
});

export const metadata: Metadata = {
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
        {children}
      </body>
    </html>
  );
}
