import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

const darkMode = true
export const textColor = darkMode ? "text-black" : "text-[#00cba2]"
export const bgColor = darkMode ? "bg-[#034d61]" : "bg-[#d9d9d9]"
export const itemColor = darkMode ? "bg-[#d9d9d9]" : "bg-[#034d61]"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {



  return (
    <html lang="en">
      <body className={inter.className}>
        <div className={`flex flex-col h-screen w-screen ${textColor} ${bgColor}`}>{children}</div>
      </body>
    </html>
  );
}