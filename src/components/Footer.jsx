import React from "react";
import { CONFIG } from "../config.js";

function Footer() {
  const today = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <footer className="bg-transparent px-4 py-8 text-center text-sm text-gray-700">
      <p>Made with ❤️ for {CONFIG.herName}</p>
      <p>Every second with you is my favourite</p>
      <p className="mt-2 text-xs text-gray-500">{today}</p>
    </footer>
  );
}

export default React.memo(Footer);
