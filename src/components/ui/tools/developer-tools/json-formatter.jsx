import React, { useMemo, useState } from "react";

export const JsonFormatterValue = {
  slug: "json-formatter",
  title: "JSON Formatter/Minifier",
  description: "Pretty-print or minify JSON.",
  category: "Developer Tools",
  icon: "📦",
};

export default function JsonFormatter() {
  const [mode, setMode] = useState("pretty");
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const output = useMemo(() => {
    setError("");
    if (!input.trim()) return "";
    try {
      const obj = JSON.parse(input);
      return mode === "pretty" ? JSON.stringify(obj, null, 2) : JSON.stringify(obj);
    } catch (e) {
      setError("Invalid JSON");
      return "";
    }
  }, [input, mode]);

  return (
    <div className="card max-w-3xl mx-auto p-4 sm:p-6 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <h2 className="text-xl font-semibold mb-1">{JsonFormatterValue.title}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{JsonFormatterValue.description}</p>

      <div className="flex gap-3 mb-3">
        <label className="flex items-center gap-2">
          <input type="radio" name="mode" value="pretty" checked={mode==="pretty"} onChange={()=>setMode("pretty")} />
          <span>Pretty</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="radio" name="mode" value="minify" checked={mode==="minify"} onChange={()=>setMode("minify")} />
          <span>Minify</span>
        </label>
      </div>

      <textarea rows={10} value={input} onChange={(e)=>setInput(e.target.value)} className="w-full rounded border p-2 font-mono text-sm" placeholder='Paste JSON e.g., {"a":1}' />

      <div className="mt-3" aria-live="polite">
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <span className="text-xs text-gray-500 mb-1 block">Output</span>
        <textarea readOnly rows={10} value={output} className="w-full rounded border p-2 font-mono text-sm bg-gray-50 dark:bg-gray-800" />
      </div>
    </div>
  );
}
