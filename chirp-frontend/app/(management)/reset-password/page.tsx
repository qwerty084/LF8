"use client";
import React, { useState } from "react";
import { itemColor } from "../../layout";

export default function Reset() {
  const [email, setEmail] = useState("");

  function handleSubmit() {}

  return (
    <div className="flex h-full w-full justify-center items-center">
      <div className={`w-1/5 md:2/5 sm:3/5 p-8 rounded-3xl ${itemColor}`}>
        <h1 className="flex text-2xl justify-center font-bold">
          Chirp Messenger
        </h1>
        <h1 className="flex text-2xl justify-center font-bold mb-4">
          Password Reset
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
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
          <button
            className="w-full bg-blue-500 hover:bg-[#034d61] text-white p-3 rouded-md"
            type="submit"
          >
            Send Email
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
