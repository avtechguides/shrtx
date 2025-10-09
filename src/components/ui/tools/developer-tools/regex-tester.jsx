import React, { useMemo, useState } from "react";

export const RegexTesterValue = {
  slug: "regex-tester",
  title: "Regex Tester",
  description: "Test JavaScript regular expressions.",
  category: "Developer Tools",
  icon: "🧪",
};

export default function RegexTester() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const matches = useMemo(() => {
    setError("");
    if (!pattern) return [];
    try {
      const re = new RegExp(pattern, flags);
      const found = [];
      let m;
      if (re.global || re.sticky) {
        while ((m = re.exec(text)) !== null) {
          found.push({ index: m.index, match: m[0] });
          if (m[0] === "") re.lastIndex++; // avoid infinite loop on empty matches
        }
      } else {
        m = re.exec(text);
        if (m) found.push({ index: m.index, match: m[0] });
      }
      return found;
    } catch (e) {
      setError(String(e.message || e));
      return [];
    }
  }, [pattern, flags, text]);

  return (
    <div className="card max-w-3xl mx-auto p-4 sm:p-6 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <h2 className="text-xl font-semibold mb-1">{RegexTesterValue.title}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{RegexTesterValue.description}</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <label className="flex flex-col">
          <span className="text-xs text-gray-500 mb-1">Pattern</span>
          <input value={pattern} onChange={(e)=>setPattern(e.target.value)} className="h-10 px-3 rounded border" placeholder="e.g., \\w+" />
        </label>
        <label className="flex flex-col">
          <span className="text-xs text-gray-500 mb-1">Flags</span>
          <input value={flags} onChange={(e)=>setFlags(e.target.value)} className="h-10 px-3 rounded border" placeholder="e.g., gmi" />
        </label>
        <div className="flex items-end">
          <span className="text-xs text-gray-500">Use test(), exec(), and global flag to iterate matches.</span>
        </div>
      </div>

      <div className="mt-3">
        <span className="text-xs text-gray-500 mb-1 block">Test text</span>
        <textarea rows={6} value={text} onChange={(e)=>setText(e.target.value)} className="w-full rounded border p-2 font-mono text-sm" />
      </div>

      <div className="mt-3" aria-live="polite">
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <span className="text-xs text-gray-500 mb-1 block">Matches</span>
        <div className="rounded border p-2 min-h-10 text-sm bg-gray-50 dark:bg-gray-800">
          {matches.length ? matches.map((m,i)=>(<div key={i}>{m.index}: “{m.match}”</div>)) : "No matches"}
        </div>
      </div>
    </div>
  );
}
