"use client";
import React, { useState } from "react";
import { getTheme } from "../layout";
import { session } from "@/components/auth.component"
import { LoadingScreen } from "@/components/loading.component";

const { bgColor, itemColor, textColor, textaccent } = getTheme();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchInput, setSearchInput] = useState<string>();

  function meetandgreet() {
    window.location.href = "/meet&greet";
  }
  function chats() {
    window.location.href = "/"
  }

  //if (loading) {
  //  return (
  //    <div>
  //      <LoadingScreen />
  //    </div>
  //  )
  //}

  if (!session.auth.isAuthenticated(session.user, session.config)) {
    window.location.href = "/login"
  } else {
    return (
      <div className={`flex flex-col h-screen w-screen ${bgColor} ${textColor}`}>
        <div id="header" className="flex flex-row w-full">
          <div className="w-24 h-24 shadow-custom">
            <img src="assets/chirp_logo.png" className="cursor-pointer" onClick={() => chats()} />
          </div>
          <div className="flex justify-center items-center w-1/6 h-24 ">
            <input
              type="text"
              name="search"
              className="w-5/6 h-1/2 bg-transparent shadow-md text-center rounded-md focus:outline-none"
              placeholder="Search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
          <div className="flex justify-end flex-grow pr-2 h-24 gap-4 shadow-custom">
            <div id="modules" className="flex gap-4 pt-4">
              <img
                src="assets/chat_bubble.png"
                className="w-10 h-10 cursor-pointer"
                onClick={() => chats()}
              />
              <img
                src="assets/meet&greet.png"
                className="w-10 h-10 cursor-pointer"
                onClick={() => meetandgreet()}
              />
            </div>
            <div
              id="session_user"
              className="flex flex-row items-center gap-2 text-xl font-bold"
            >
              <img src={session.user.data?.avatar} className="w-16 cursor-pointer" onClick={() => window.location.href = "/settings"} />
              <div className="flex flex-col"><p className="cursor-pointer" onClick={() => window.location.href = "/settings"}>{session.user.data?.username}</p>
                <p className={`text-xs ${textaccent}`}>{session.user.data?.id}</p></div>
            </div>
          </div>
        </div>
        {children}
      </div>
    );
  }

}
