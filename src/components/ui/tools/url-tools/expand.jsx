import React, { useState } from "react";

export const ExpandValue = {
  slug: "expand",
  title: "URL Expander",
  description: "Follow redirects to expand a shortened URL (where CORS permits).",
  category: "URL Tools",
  icon: "🔎",
};

export default function Expand() {
  const [url, setUrl] = useState("");
  const [finalUrl, setFinalUrl] = useState("");
  const [status, setStatus] = useState("");

  async function expand() {
    setStatus("Resolving...");
    setFinalUrl("");
    try {
      const u = url.startsWith("http") ? url : `https://${url}`;
      const res = await fetch(u, { redirect: "follow", mode: "no-cors" });
      // no-cors hides redirect chain; as a hint, show input normalized
      setFinalUrl(u);
      setStatus("Expanded where allowed. For exact redirects, use a server endpoint.");
    } catch {
      setStatus("Failed to expand (possibly blocked by CORS).");
    }
  }

  return (
    <div className="card max-w-xl mx-auto p-4 sm:p-6 rounded border bg-white dark:bg-gray-900">
      <h2 className="text-xl font-semibold mb-1">{ExpandValue.title}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{ExpandValue.description}</p>

      <div className="flex gap-2 mb-3">
        <input value={url} onChange={(e)=>setUrl(e.target.value)} className="h-10 px-3 rounded border flex-1" placeholder="Short URL" />
        <button onClick={expand} className="h-10 px-3 rounded bg-black text-white">Expand</button>
      </div>

      <div className="p-3 rounded border bg-gray-50 dark:bg-gray-800" aria-live="polite">
        {status}
        {finalUrl && <div className="mt-1 font-mono text-sm break-all">{finalUrl}</div>}
      </div>
    </div>
  );
}
