import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { AppGooeyToaster } from "@/shared/components/AppGooeyToaster";
import "./globals.css";
import "goey-toast/styles.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ammar",
  description: "Customer & Admin Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <>
          {children}
          <AppGooeyToaster />
        </>
      </body>
    </html>
  );
}
