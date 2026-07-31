import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import Navbar from "@/components/navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const beingFont = localFont({
  src: "./fonts/Being-Regular.otf",
  variable: "--font-being",
  display: "swap",
});

const haasFont = localFont({
  src: [
    {
      path: "./fonts/Helvetica.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Helvetica-Bold.ttf",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-haas",
  display: "swap",
});

export const metadata: Metadata = {
  title: "RAEV - One Campaign, Hundreds of Possibilities",
  description: "RAEV homepage",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${beingFont.variable} ${haasFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F5F4F0] font-being">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
