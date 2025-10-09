import React, { useEffect, useState } from "react";

export const HashGeneratorValue = {
  slug: "hash-generator",
  title: "Hash Generator",
  description: "Hash strings or files with SHA-256 in-browser.",
  category: "Security Tools",
  icon: "🔏",
};

async function sha256FromString(text) {
  const data = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(digest)].map(b=>b.toString(16).padStart(2,"0")).join("");
}

async function sha256FromFile(file) {
  const buf = await file.arrayBuffer();
  const digest = await crypto.subtle.digest("SHA-256", buf);
  return [...new Uint8Array(digest)].map(b=>b.toString(16).padStart(2,"0")).join("");
}

export default function HashGenerator() {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [hash, setHash] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (file) {
        const h = await sha256FromFile(file);
        if (!cancelled) setHash(h);
      } else if (text) {
        const h = await sha256FromString(text);
        if (!cancelled) setHash(h);
      } else {
        setHash("");
      }
    })();
    return () => { cancelled = true; };
  }, [text, file]);

  return (
    <div className="card max-w-3xl mx-auto p-4 sm:p-6 rounded border bg-white dark:bg-gray-900">
      <h2 className="text-xl font-semibold mb-1">{HashGeneratorValue.title}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{HashGeneratorValue.description}</p>

      <textarea rows={5} value={text} onChange={(e)=>{setText(e.target.value); setFile(null);}} className="w-full rounded border p-2 font-mono text-sm mb-3" placeholder="Enter text..." />
      <div className="mb-3">
        <input type="file" onChange={(e)=>{setFile(e.target.files?.[0]||null); setText("");}} />
      </div>

      <div className="mt-2">
        <span className="text-xs text-gray-500 mb-1 block">SHA-256</span>
        <div className="p-2 rounded border bg-gray-50 dark:bg-gray-800 font-mono text-xs break-all" aria-live="polite">
          {hash || "—"}
        </div>
      </div>
    </div>
  );
}
