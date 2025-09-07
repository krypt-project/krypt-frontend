import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Krypt",
  icons: "/favicon-2.png",
  description: "Keep Recording Your Plans and Thoughts",
  authors: [
    {
      name: "Pierre",
      url: "https://github.com/Miche1-Pierre",
    },
  ],
  keywords: [
    "knowledge base",
    "AI",
    "intelligent",
    "krypt",
    "Keep Recording Your Plans and Thoughts",
    "personal knowledge management",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
