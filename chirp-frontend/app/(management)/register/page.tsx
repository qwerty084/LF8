"use client";
import React, { useState } from "react";
import { itemColor } from "../../layout";
import { env } from "../../../env";

export default function Registration() {
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassoword] = useState("");
  const [verifyPassword, setVerifyPassoword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  async function handleSubmit(e: any) {
    e.preventDefault();
    let url = `${env.API_URL}/api/users`;

    const user = {
      email: email,
      username: displayName,
      password: password,
    };
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await response.json();
    if (response.status === 201) {
      console.log("authorized");
      window.location.href = "/login";
    } else {
      console.log("Unauthorized");
    }
  }

  return (
    <div className="flex h-full w-full justify-center items-center">
      <div className={`w-2/5 md:2/5 sm:3/5 p-8 rounded-3xl ${itemColor}`}>
        <h1 className="flex text-2xl justify-center font-bold">
          Chirp Messenger
        </h1>
        <h1 className="flex text-2xl justify-center font-bold mb-4">
          Registrations
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-row justify-between">
            <div className="w-2/5">
              <label className="block mb-1" htmlFor="email">
                Email
              </label>
              <input
                className="w-full border shadow-sm rounded-md p-2 focus:outline-none"
                type="email"
                name="email"
                id="email"
                placeholder="Enter Email Adress"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="w-2/5">
              <label className="block mb-1" htmlFor="email">
                Display Name
              </label>
              <input
                className="w-full border shadow-sm rounded-md p-2 mb-12 focus:outline-none"
                type="text"
                name="display_name"
                id="display_name"
                placeholder="Enter your Display Name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="block mb-1" htmlFor="password">
              Password
            </label>
            <input
              className={`w-2/5 border shadow-sm rounded-md p-2 mb-4 focus:outline-none ${
                passwordError ? "border-red-500" : ""
              }`}
              type="password"
              name="password"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassoword(e.target.value)}
            />
            <label className="block mb-1" htmlFor="email">
              Verify Password
            </label>
            <input
              className={`w-2/5 border shadow-sm rounded-md p-2 mb-12 focus:outline-none ${
                passwordError ? "border-red-500" : ""
              }`}
              type="password"
              name="verify_password"
              id="verify_password"
              placeholder="Enter Email Adress"
              value={verifyPassword}
              onChange={(e) => setVerifyPassoword(e.target.value)}
            />
          </div>
          <button
            className="w-full bg-blue-500 hover:bg-[#034d61] text-white p-3 rounded-md"
            type="submit"
          >
            Sign Up
          </button>
          <p className="text-center mt-5">
            <span>Already have an Account? </span>
            <a className="text-blue-500" href="/login">
              Login here.
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
