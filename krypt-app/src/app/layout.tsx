import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "@/styles/globals.css";
import "@/styles/editor.css";

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
        <Toaster
          position="bottom-center"
          reverseOrder={false}
          toastOptions={{
            // Define default options
            className: "",
            duration: 5000,
            removeDelay: 1000,
            style: {
              background: "#363636",
              color: "#fff",
            },

            // Default options for specific types
            // success: {
            //   duration: 3000,
            //   iconTheme: {
            //     primary: "green",
            //     secondary: "black",
            //   },
            // },
          }}
        />
      </body>
    </html>
  );
}
