"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import React, { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

/**
 * Root layout component.
 * Renders the overall page layout with theming.
 * Sets theme in localStorage on change.
 * Renders children within the layout.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState("dark");

  const textColor = theme === "dark" ? "text-[#00cba2]" : "text-black";
  const textaccent = theme === "dark" ? "text-[#8d8d8d]" : "#00cba2";
  const bgColor = theme === "dark" ? "bg-[#01242d]" : "bg-[#d9d9d9]";
  const itemColor = theme === "dark" ? "bg-[#636363]" : "bg-[#034d61]";

  useEffect(() => {
    localStorage.setItem("config.chat.theme", theme);
  }, [theme]);

  return (
    <html lang="en">
      <link rel="icon" href="/assets/chirp_logo.png" />
      <body className={inter.className}>
        <div
          className={`fixed flex flex-col h-screen w-screen ${textColor} ${bgColor}`}
        >
          {children}
        </div>
      </body>
    </html>
  );
}

export function getTheme() {
  const theme = "dark";
  const isDarkMode = theme === "dark";
  return {
    textColor: isDarkMode ? "text-[#00cba2]" : "text-black",
    textaccent: isDarkMode ? "text-[#8d8d8d]" : "#00cba2",
    bgColor: isDarkMode ? "bg-[#01242d]" : "bg-[#d9d9d9]",
    itemColor: isDarkMode ? "bg-[#636363]" : "bg-[#034d61]",
  };
}
