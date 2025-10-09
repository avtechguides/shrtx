import React, { useMemo, useState } from "react";

export const CssMinifierValue = {
  slug: "css-minifier",
  title: "CSS Minifier",
  description: "Minify CSS safely in the browser.",
  category: "Developer Tools",
  icon: "🎯",
};

function minifyCSS(input) {
  if (!input) return "";
  let s = input;
  s = s.replace(/\/\*[\s\S]*?\*\//g, ""); // remove comments
  s = s.replace(/\s+/g, " "); // collapse whitespace
  s = s.replace(/\s*([{}:;,>~+])\s*/g, "$1"); // trim around punctuators
  s = s.replace(/;}/g, "}"); // drop last semicolon in blocks
  return s.trim();
}

export default function CssMinifier() {
  const [input, setInput] = useState("");
  const output = useMemo(() => minifyCSS(input), [input]);
  const saved = new Blob([output], { type: "text/css" });

  return (
    <div className="card max-w-3xl mx-auto p-4 sm:p-6 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <h2 className="text-xl font-semibold mb-1">{CssMinifierValue.title}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{CssMinifierValue.description}</p>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste CSS..."
        rows={10}
        className="w-full rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-2 font-mono text-sm"
      />

      <div className="mt-4">
        <span className="text-xs text-gray-500 mb-1 block">Minified</span>
        <textarea
          readOnly
          value={output}
          rows={8}
          className="w-full rounded border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 p-2 font-mono text-sm"
        />
      </div>

      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => navigator.clipboard.writeText(output)}
          className="h-9 px-3 rounded bg-black text-white dark:bg-white dark:text-black disabled:opacity-60"
          disabled={!output}
        >
          Copy
        </button>
        <a
          download="styles.min.css"
          href={URL.createObjectURL(saved)}
          className="h-9 px-3 rounded bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 inline-flex items-center"
        >
          Download
        </a>
      </div>
    </div>
  );
}
