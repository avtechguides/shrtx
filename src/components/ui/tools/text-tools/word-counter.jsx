import React, { useMemo, useState } from "react";

export const WordCounterValue = {
  slug: "word-counter",
  title: "Word Counter",
  description: "Count words and sentences with Unicode support.",
  category: "Text Tools",
  icon: "🧮",
};

export default function WordCounter() {
  const [text, setText] = useState("");
  const stats = useMemo(() => {
    const words = (text.match(/\b[\p{L}\p{N}']+\b/gu) || []).length;
    const sentences = (text.match(/[.!?]+(\s|$)/g) || []).length;
    const paragraphs = text.trim() ? text.trim().split(/\n{2,}/).length : 0;
    return { words, sentences, paragraphs };
  }, [text]);

  return (
    <div className="card max-w-2xl mx-auto p-4 sm:p-6 rounded border bg-white dark:bg-gray-900">
      <h2 className="text-xl font-semibold mb-1">{WordCounterValue.title}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{WordCounterValue.description}</p>

      <textarea rows={8} value={text} onChange={(e)=>setText(e.target.value)} className="w-full rounded border p-2" placeholder="Type or paste..." />
      <div className="grid grid-cols-3 gap-3 text-sm mt-3">
        <div className="p-2 rounded border bg-gray-50 dark:bg-gray-800"><div className="text-gray-600">Words</div><div className="font-mono">{stats.words}</div></div>
        <div className="p-2 rounded border bg-gray-50 dark:bg-gray-800"><div className="text-gray-600">Sentences</div><div className="font-mono">{stats.sentences}</div></div>
        <div className="p-2 rounded border bg-gray-50 dark:bg-gray-800"><div className="text-gray-600">Paragraphs</div><div className="font-mono">{stats.paragraphs}</div></div>
      </div>
    </div>
  );
}
