"use client";
import React from "react";
import { bgColor, itemColor, textColor } from "../layout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  function meetandgreet() {
    window.alert("currently out of function");
  }

  return (
    <div className={`flex flex-col h-screen w-screen ${bgColor} ${textColor}`}>
      <div id="header" className="flex flex-row w-full">
        <div className="w-24 h-24 shadow-custom">
          <img src="assets/chirp_logo.png" />
        </div>
        <div className="flex justify-center items-center w-1/6 h-24 ">
          <input
            type="text"
            name="search"
            className="w-5/6 h-1/2 bg-transparent shadow-md text-center rounded-md focus:outline-none"
            placeholder="Search Contacts"
          />
        </div>
        <div className="flex justify-end flex-grow items-center pr-2 h-24 gap-4 shadow-custom">
          <div id="modules" className="flex items-center">
            <img
              src="assets/meet&greet.png"
              className="w-10 h-10"
              onClick={() => meetandgreet()}
            />
          </div>
          <div
            id="session_user"
            className="flex flex-row items-center gap-2 text-xl font-bold"
          >
            <img src="assets/my.png" className="w-16" />
            Luca Naujoks
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
