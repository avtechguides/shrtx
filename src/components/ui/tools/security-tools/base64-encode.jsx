import React, { useMemo, useState } from "react";

export const Base64EncodeValue = {
  slug: "base64-encode",
  title: "Base64 Encode/Decode",
  description: "Encode and decode Base64 strings.",
  category: "Security Tools",
  icon: "🔐",
};

function b64encode(s) {
  try {
    return btoa(unescape(encodeURIComponent(s)));
  } catch {
    return "";
  }
}
function b64decode(s) {
  try {
    return decodeURIComponent(escape(atob(s)));
  } catch {
    return "";
  }
}

export default function Base64Encode() {
  const [mode, setMode] = useState("encode");
  const [input, setInput] = useState("");
  const output = useMemo(() => {
    if (!input) return "";
    return mode === "encode" ? b64encode(input) : b64decode(input);
  }, [input, mode]);

  return (
    <div className="card max-w-3xl mx-auto p-4 sm:p-6 rounded border bg-white dark:bg-gray-900">
      <h2 className="text-xl font-semibold mb-1">{Base64EncodeValue.title}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{Base64EncodeValue.description}</p>

      <div className="flex gap-3 mb-3">
        <label className="flex items-center gap-2">
          <input type="radio" checked={mode==="encode"} onChange={()=>setMode("encode")} />
          <span>Encode</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="radio" checked={mode==="decode"} onChange={()=>setMode("decode")} />
          <span>Decode</span>
        </label>
      </div>

      <textarea rows={8} value={input} onChange={(e)=>setInput(e.target.value)} className="w-full rounded border p-2 font-mono text-sm" placeholder="Enter text or Base64..." />
      <div className="mt-3">
        <span className="text-xs text-gray-500 mb-1 block">Output</span>
        <textarea readOnly rows={8} value={output} className="w-full rounded border p-2 font-mono text-sm bg-gray-50 dark:bg-gray-800" />
      </div>
    </div>
  );
}
