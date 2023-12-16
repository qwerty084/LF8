"use client"
import React from "react";
import { bgColor, itemColor, textColor } from "../layout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  function meetandgreet() {
    window.alert("currently out of function")
  }

  return (
    <div className={`flex flex-col h-screen ${bgColor} ${textColor}`}>
      <div id="header" className="flex flex-row w-full">
        <div className="w-24 h-24 border-b-2 border-r-2 border-gray-500">
          <img src="assets/chirp_logo.png" />
        </div>
        <div className="flex justify-center items-center w-1/4 h-24 border-b-2 border-r-2 border-gray-500">
          <input
            type="text"
            name="search"
            className="w-2/4 h-1/2 bg-transparent border-2 border-gray-500 text-center rounded-md focus:outline-none"
            placeholder="Search Contacts"
          />
        </div>
        <div className="flex justify-end items-center pr-2 w-3/4 h-24 gap-4 border-b-2 border-gray-500">
          <div id="modules" className="flex items-center">
            <img src="assets/meet&greet.png" className="w-10 h-10" onClick={()=> meetandgreet()}/>
          </div>
          <div id="session_user" className="flex flex-row">
            <img src="assets/my.png" className="w-20" />
          </div>
          <div className="text-xl">Luca Naujoks</div>
        </div>
      </div>
      {children}
    </div>
  );
}
