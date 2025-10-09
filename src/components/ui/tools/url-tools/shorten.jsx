import React, { useMemo, useState } from "react";

export const ShortenValue = {
  slug: "shorten",
  title: "URL Shortener (Client-Only Demo)",
  description: "Generate a fake short link locally. For real redirects, add a backend.",
  category: "URL Tools",
  icon: "🧩",
};

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
function base62(n) {
  if (n === 0) return "0";
  let s = "";
  while (n > 0) {
    s = CHARS[n % 62] + s;
    n = Math.floor(n / 62);
  }
  return s;
}

export default function Shorten() {
  const [url, setUrl] = useState("");
  const [alias, setAlias] = useState("");
  const [short, setShort] = useState("");

  const isValid = useMemo(() => {
    try { new URL(url); return true; } catch { return false; }
  }, [url]);

  function make() {
    if (!isValid) return;
    const id = alias || base62(Math.floor(Math.random() * 62 ** 7));
    const base = window.location.origin.replace(/\/+$/,"");
    setShort(`${base}/${id}`);
  }

  function copy() {
    if (short) navigator.clipboard.writeText(short);
  }

  return (
    <div className="card max-w-xl mx-auto p-4 sm:p-6 rounded border bg-white dark:bg-gray-900">
      <h2 className="text-xl font-semibold mb-1">{ShortenValue.title}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{ShortenValue.description}</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
        <input value={url} onChange={(e)=>setUrl(e.target.value)} className="h-10 px-3 rounded border sm:col-span-2" placeholder="https://example.com/..." />
        <input value={alias} onChange={(e)=>setAlias(e.target.value)} className="h-10 px-3 rounded border" placeholder="Custom alias (optional)" />
      </div>
      <button onClick={make} className="h-9 px-3 rounded bg-black text-white" disabled={!isValid}>Shorten</button>

      <div className="mt-3 p-2 rounded border bg-gray-50 dark:bg-gray-800 font-mono break-all" aria-live="polite">
        {short || "Short link will appear here."}
      </div>
      <button onClick={copy} className="mt-2 h-9 px-3 rounded bg-gray-100 border" disabled={!short}>Copy</button>
      <p className="text-xs text-gray-500 mt-2">Note: This demo doesn’t store mappings. Implement a backend to persist and resolve IDs.</p>
    </div>
  );
}
