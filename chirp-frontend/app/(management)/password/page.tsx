"use client";
import React, { useState } from "react";
import { itemColor } from "../../layout";

export default function Password() {
  const [password, setPassoword] = useState("");
  const [verifyPassword, setVerifyPassoword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  function handleSubmit(e: any) {
    e.preventDefault();
    if (password !== verifyPassword) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
      // Continue with form submission
    }
  }

  return (
    <div className="flex h-full w-full justify-center items-center">
      <div className={`w-1/5 md:2/5 sm:3/5 p-8 rounded-3xl shadow-custom`}>
        <h1 className="flex text-2xl justify-center font-bold">
          Chirp Messenger
        </h1>
        <h1 className="flex text-2xl justify-center font-bold mb-4">
          Password Reset
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1" htmlFor="password">
              Password
            </label>
            <input
              className={`w-full bg-transparent shadow-custom rounded-md p-2 mb-2 focus:outline-none ${
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
              className={`w-full bg-transparent shadow-custom rounded-md p-2 mb-12 focus:outline-none ${
                passwordError ? "border-red-500" : ""
              }`}
              type="password"
              name="verify_password"
              id="verify_password"
              placeholder="Verify Password"
              value={verifyPassword}
              onChange={(e) => setVerifyPassoword(e.target.value)}
            />
          </div>
          <button
            className="w-full bg-transparent shadow-custom hover:shadow-none hover:bg-[#034d61] text-white p-3 rounded-md"
            type="submit"
          >
            Reset Password
          </button>
          <div className="text-center">
            <div className="text-center mt-5">
              <p>Remember your password? </p>
              <a className="text-blue-500" href="/login">
                Login here.
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
