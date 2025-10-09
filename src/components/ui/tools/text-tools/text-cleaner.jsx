import React, { useMemo, useState } from "react";

export const TextCleanerValue = {
  slug: "text-cleaner",
  title: "Text Cleaner",
  description: "Trim whitespace, remove extra spaces, and strip HTML.",
  category: "Text Tools",
  icon: "🧹",
};

function clean(text, opts) {
  let s = text;
  if (opts.trim) s = s.trim();
  if (opts.multispaces) s = s.replace(/\s+/g, " ");
  if (opts.html) s = s.replace(/<[^>]+>/g, "");
  if (opts.nonAscii) s = s.replace(/[^\x00-\x7F]+/g, "");
  return s;
}

export default function TextCleaner() {
  const [input, setInput] = useState("");
  const [trim, setTrim] = useState(true);
  const [multispaces, setMultispaces] = useState(true);
  const [html, setHtml] = useState(false);
  const [nonAscii, setNonAscii] = useState(false);
  const output = useMemo(()=>clean(input, {trim, multispaces, html, nonAscii}), [input, trim, multispaces, html, nonAscii]);

  return (
    <div className="card max-w-3xl mx-auto p-4 sm:p-6 rounded border bg-white dark:bg-gray-900">
      <h2 className="text-xl font-semibold mb-1">{TextCleanerValue.title}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{TextCleanerValue.description}</p>

      <textarea rows={8} value={input} onChange={(e)=>setInput(e.target.value)} className="w-full rounded border p-2" placeholder="Paste text..." />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-3">
        <label className="flex items-center gap-2"><input type="checkbox" checked={trim} onChange={(e)=>setTrim(e.target.checked)} /><span>Trim</span></label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={multispaces} onChange={(e)=>setMultispaces(e.target.checked)} /><span>Collapse spaces</span></label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={html} onChange={(e)=>setHtml(e.target.checked)} /><span>Strip HTML</span></label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={nonAscii} onChange={(e)=>setNonAscii(e.target.checked)} /><span>Remove non-ASCII</span></label>
      </div>

      <div>
        <span className="text-xs text-gray-500 mb-1 block">Output</span>
        <textarea readOnly rows={8} value={output} className="w-full rounded border p-2 bg-gray-50 dark:bg-gray-800" />
      </div>
    </div>
  );
}
