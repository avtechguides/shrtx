import React, { useMemo, useState } from "react";

export const HtmlEncoderValue = {
  slug: "html-encoder",
  title: "HTML Encoder/Decoder",
  description: "Encode and decode HTML entities.",
  category: "Developer Tools",
  icon: "🔐",
};

function encodeHTML(str) {
  return str.replace(/[&<>"']/g, (c) => (
    c === "&" ? "&amp;" : c === "<" ? "&lt;" : c === ">" ? "&gt;" : c === '"' ? "&quot;" : "&#39;"
  ));
}
function decodeHTML(str) {
  const el = document.createElement("textarea");
  el.innerHTML = str;
  return el.value;
}

export default function HtmlEncoder() {
  const [mode, setMode] = useState("encode");
  const [input, setInput] = useState("");
  const output = useMemo(() => {
    if (!input) return "";
    return mode === "encode" ? encodeHTML(input) : decodeHTML(input);
  }, [input, mode]);

  return (
    <div className="card max-w-3xl mx-auto p-4 sm:p-6 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <h2 className="text-xl font-semibold mb-1">{HtmlEncoderValue.title}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{HtmlEncoderValue.description}</p>

      <div className="flex gap-3 mb-3">
        <label className="flex items-center gap-2">
          <input type="radio" name="mode" value="encode" checked={mode==="encode"} onChange={() => setMode("encode")} />
          <span>Encode</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="radio" name="mode" value="decode" checked={mode==="decode"} onChange={() => setMode("decode")} />
          <span>Decode</span>
        </label>
      </div>

      <textarea rows={6} value={input} onChange={(e)=>setInput(e.target.value)} className="w-full rounded border p-2 font-mono text-sm" placeholder="Enter text..." />
      <div className="mt-3">
        <span className="text-xs text-gray-500 mb-1 block">Output</span>
        <textarea readOnly rows={6} value={output} className="w-full rounded border p-2 font-mono text-sm bg-gray-50 dark:bg-gray-800" />
      </div>
    </div>
  );
}
