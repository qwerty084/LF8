"use client";
import React, { useState } from "react";
import { itemColor } from "../../layout";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassoword] = useState("");
  const [loginError, setLoginError] = useState("");

  function handleSubmit() {}

  return (
    <div className="flex h-full w-full justify-center items-center">
      <div className={`w-1/5 md:2/5 sm:3/5 p-8 rounded-3xl ${itemColor}`}>
        <h1 className="flex text-2xl justify-center font-bold">
          Chirp Messenger
        </h1>
        <h1 className="flex text-2xl justify-center font-bold mb-4">Login</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1" htmlFor="email">
              Email
            </label>
            <input
              className={`w-full border shadow-sm rounded-md p-2 focus:outline-none ${loginError ? "border-red-500" : ""}`}
              type="email"
              name="email"
              id="email"
              placeholder="Enter Email Adress"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1" htmlFor="password">
              Password
            </label>
            <input
              className={`w-full border shadow-sm rounded-md p-2 mb-12 focus:outline-none ${loginError ? "border-red-500" : ""}`}
              type="password"
              name="password"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassoword(e.target.value)}
            />
          </div>
          <button
            className="w-full bg-blue-500 hover:bg-[#034d61] text-white p-3 rouded-md"
            type="submit"
          >
            Sign In
          </button>
          <div className="text-center">
            <a className="text-blue-500" href="/reset-password">
              Forgot your Password?
            </a>
            <p>
              <span>Don't have an Account? </span>
              <a className="text-blue-500" href="/register">
                Sign Up here.
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
