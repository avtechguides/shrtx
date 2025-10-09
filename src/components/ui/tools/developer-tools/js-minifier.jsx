import React, { useMemo, useState } from "react";

export const JsMinifierValue = {
  slug: "js-minifier",
  title: "JS Minifier",
  description: "Minify JavaScript in the browser (simple).",
  category: "Developer Tools",
  icon: "⚡",
};

// Very naive minifier: removes comments and whitespace; not production-grade like Terser.
function minifyJS(code) {
  if (!code) return "";
  let s = code;
  s = s.replace(/\/\*[\s\S]*?\*\//g, ""); // block comments
  s = s.replace(/(^|[^:])\/\/.*$/gm, "$1"); // line comments not after :
  s = s.replace(/\s+/g, " ");
  s = s.replace(/\s*([{}():;,=+\-*/<>?|&!~[\]])\s*/g, "$1");
  return s.trim();
}

export default function JsMinifier() {
  const [input, setInput] = useState("");
  const output = useMemo(()=>minifyJS(input),[input]);

  return (
    <div className="card max-w-3xl mx-auto p-4 sm:p-6 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <h2 className="text-xl font-semibold mb-1">{JsMinifierValue.title}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{JsMinifierValue.description}</p>

      <textarea rows={10} value={input} onChange={(e)=>setInput(e.target.value)} className="w-full rounded border p-2 font-mono text-sm" placeholder="Paste JS..." />
      <div className="mt-3">
        <span className="text-xs text-gray-500 mb-1 block">Minified</span>
        <textarea readOnly rows={8} value={output} className="w-full rounded border p-2 font-mono text-sm bg-gray-50 dark:bg-gray-800" />
      </div>
    </div>
  );
}
