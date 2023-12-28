"use client";
import React, { useState } from "react";
import { itemColor } from "../../layout";
import { env } from "../../../env"
import { useCreate, session } from "../../../components/session.component"

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassoword] = useState("");
  const [loginError, setLoginError] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();
    let url = `${env.API_URL}/auth`

    const user = {
      "email": email,
      "password": password
    }
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await response.json();
    if (data.code === 401) {
      console.log("Unauthorized");
    } else {
      console.log("authorized")
      useCreate.auth(data.token);
      window.location.href = "/";
    }
  }

  return (
    <div className="flex h-full w-full justify-center items-center">
      <div className={`w-1/5 md:2/5 sm:3/5 p-8 rounded-3xl shadow-custom`}>
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
              className={`w-full bg-transparent shadow-custom rounded-md p-2 focus:outline-none ${loginError ? "border-red-500" : ""}`}
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
              className={`w-full bg-transparent shadow-custom rounded-md p-2 mb-12 focus:outline-none ${loginError ? "border-red-500" : ""}`}
              type="password"
              name="password"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassoword(e.target.value)}
            />
          </div>
          <button
            className="w-full bg-blue-500 hover:bg-[#034d61] text-white p-3 rounded-md"
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
