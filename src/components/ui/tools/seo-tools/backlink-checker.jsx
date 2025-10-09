import React, { useState } from "react";

export const BacklinkCheckerValue = {
  slug: "backlink-checker",
  title: "Backlink Checker",
  description: "Check backlinks via third-party APIs or manual verification.",
  category: "SEO Tools",
  icon: "🔗",
};

// Backlink data typically needs a provider API (Ahrefs, Majestic, etc.).
// UI scaffold below supports future provider integration.

export default function BacklinkChecker() {
  const [domain, setDomain] = useState("");
  const [status, setStatus] = useState("");

  function check() {
    setStatus("Integrate a backlink data provider to fetch referring domains and pages.");
  }

  return (
    <div className="card max-w-xl mx-auto p-4 sm:p-6 rounded border bg-white dark:bg-gray-900">
      <h2 className="text-xl font-semibold mb-1">{BacklinkCheckerValue.title}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{BacklinkCheckerValue.description}</p>

      <div className="flex gap-2 mb-3">
        <input value={domain} onChange={(e)=>setDomain(e.target.value)} className="h-10 px-3 rounded border flex-1" placeholder="example.com" />
        <button onClick={check} className="h-10 px-3 rounded bg-black text-white">Check</button>
      </div>

      <div className="p-3 rounded border bg-gray-50 dark:bg-gray-800 min-h-14" aria-live="polite">{status || "Enter a domain to start."}</div>
    </div>
  );
}
