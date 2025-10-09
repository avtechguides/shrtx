import React, { useMemo, useState } from "react";

export const CharCounterValue = {
  slug: "char-counter",
  title: "Character Counter",
  description: "Count characters, words, lines, and byte length.",
  category: "Text Tools",
  icon: "🔢",
};

export default function CharCounter() {
  const [text, setText] = useState("");
  const stats = useMemo(() => {
    const chars = [...text].length;
    const words = (text.match(/\b[\p{L}\p{N}']+\b/gu) || []).length;
    const lines = text.split(/\r?\n/).length;
    const bytes = new TextEncoder().encode(text).length;
    return { chars, words, lines, bytes };
  }, [text]);

  return (
    <div className="card max-w-2xl mx-auto p-4 sm:p-6 rounded border bg-white dark:bg-gray-900">
      <h2 className="text-xl font-semibold mb-1">{CharCounterValue.title}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{CharCounterValue.description}</p>

      <textarea rows={8} value={text} onChange={(e)=>setText(e.target.value)} className="w-full rounded border p-2" placeholder="Type or paste..." />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm mt-3">
        <div className="p-2 rounded border bg-gray-50 dark:bg-gray-800"><div className="text-gray-600">Characters</div><div className="font-mono">{stats.chars}</div></div>
        <div className="p-2 rounded border bg-gray-50 dark:bg-gray-800"><div className="text-gray-600">Words</div><div className="font-mono">{stats.words}</div></div>
        <div className="p-2 rounded border bg-gray-50 dark:bg-gray-800"><div className="text-gray-600">Lines</div><div className="font-mono">{stats.lines}</div></div>
        <div className="p-2 rounded border bg-gray-50 dark:bg-gray-800"><div className="text-gray-600">Bytes</div><div className="font-mono">{stats.bytes}</div></div>
      </div>
    </div>
  );
}
