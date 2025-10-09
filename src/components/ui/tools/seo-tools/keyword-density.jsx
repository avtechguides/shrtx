import React, { useMemo, useState } from "react";

export const KeywordDensityValue = {
  slug: "keyword-density",
  title: "Keyword Density",
  description: "Analyze keyword frequency in text.",
  category: "SEO Tools",
  icon: "📊",
};

function analyze(text) {
  const words = text.toLowerCase().match(/\b[\p{L}\p{N}']+\b/gu) || [];
  const total = words.length;
  const freq = new Map();
  for (const w of words) freq.set(w, (freq.get(w) || 0) + 1);
  const rows = [...freq.entries()].sort((a,b)=>b[1]-a[1]).slice(0, 100);
  return { total, rows };
}

export default function KeywordDensity() {
  const [input, setInput] = useState("");
  const { total, rows } = useMemo(()=>analyze(input), [input]);

  return (
    <div className="card max-w-3xl mx-auto p-4 sm:p-6 rounded border bg-white dark:bg-gray-900">
      <h2 className="text-xl font-semibold mb-1">{KeywordDensityValue.title}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{KeywordDensityValue.description}</p>

      <textarea rows={8} value={input} onChange={(e)=>setInput(e.target.value)} className="w-full rounded border p-2 text-sm" placeholder="Paste content..." />
      <div className="mt-3 text-sm">Total words: {total}</div>
      <div className="mt-2 border rounded">
        <div className="grid grid-cols-3 p-2 text-sm font-medium border-b">
          <div>Keyword</div><div>Count</div><div>Density %</div>
        </div>
        {rows.map(([w,c])=>(
          <div key={w} className="grid grid-cols-3 p-2 text-sm border-t">
            <div>{w}</div><div>{c}</div><div>{total ? ((c/total)*100).toFixed(2) : "0.00"}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
