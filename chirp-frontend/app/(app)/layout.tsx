"use client";
import React from "react";
import { bgColor, itemColor, textColor } from "../layout";
import { useCreate, session } from "../../components/session"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  function meetandgreet() {
    window.location.href = "/meet&greet";   
  }
  function chats() {
    window.location.href = "/"
  }

  const {isAuthenticated, user } = session()

  if(!isAuthenticated) {
    console.log(user)
    return(<div>Unauthorized</div>)
    //window.location.href = "/login"
  } else {

    return (
      <div className={`flex flex-col h-screen w-screen ${bgColor} ${textColor}`}>
        <div id="header" className="flex flex-row w-full">
          <div className="w-24 h-24 shadow-custom">
            <img src="assets/chirp_logo.png" className="cursor-pointer" onClick={() => chats()}/>
          </div>
          <div className="flex justify-center items-center w-1/6 h-24 ">
            <input
              type="text"
              name="search"
              className="w-5/6 h-1/2 bg-transparent shadow-md text-center rounded-md focus:outline-none"
              placeholder="Search"
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
              <img src="assets/my.png" className="w-16" />
              {user?.username}
            </div>
          </div>
        </div>
        {children}
      </div>
    );
  }

}
