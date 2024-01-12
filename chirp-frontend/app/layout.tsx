"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import React, { useEffect, useState } from "react";
import {textColor, bgColor} from "@/components/components.layout"

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
