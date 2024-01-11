import React, { useState, useEffect } from "react";

export function emptyChat() {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <img src="/assets/chirp_logo.png" alt="chirp Logo" />
    </div>
  );
}

export function LoadingScreen() {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <span className="text-3xl mt-12">Chirp Loading ...</span>
    </div>
  );
}
