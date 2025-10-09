import React, { useMemo, useState } from "react";

export const NumberToWordsValue = {
  slug: "number-to-words",
  title: "Number to Words",
  description: "Convert numbers into English words.",
  category: "Conversion Tools",
  icon: "🔢",
};

// Simple English converter for integers up to billions
const BELOW_20 = ["zero","one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen"];
const TENS = ["","","twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety"];

function chunk(n) {
  const s = String(n);
  const arr = [];
  for (let i = s.length; i > 0; i -= 3) {
    const start = Math.max(0, i - 3);
    arr.unshift(Number(s.slice(start, i)));
  }
  return arr;
}

function hundredToWords(n) {
  let out = [];
  const h = Math.floor(n / 100);
  const r = n % 100;
  if (h) out.push(BELOW_20[h], "hundred");
  if (r) {
    if (r < 20) out.push(BELOW_20[r]);
    else {
      const t = Math.floor(r / 10);
      const o = r % 10;
      out.push(TENS[t]);
      if (o) out.push(BELOW_20[o]);
    }
  }
  return out.join(" ");
}

function numberToWords(n) {
  if (n === 0) return "zero";
  if (!Number.isFinite(n)) return "";
  const neg = n < 0;
  n = Math.abs(Math.trunc(n));
  const groups = ["", "thousand", "million", "billion", "trillion"];
  const parts = chunk(n);
  let out = [];
  const len = parts.length;
  for (let i = 0; i < len; i++) {
    const val = parts[i];
    if (!val) continue;
    const words = hundredToWords(val);
    const scale = groups[len - i - 1];
    out.push(words + (scale ? " " + scale : ""));
  }
  const phrase = out.join(" ").replace(/\s+/g, " ").trim();
  return neg ? "minus " + phrase : phrase;
}

export default function NumberToWords() {
  const [input, setInput] = useState("");
  const words = useMemo(() => {
    if (input === "") return "";
    const n = Number(input);
    if (!Number.isFinite(n)) return "";
    return numberToWords(n);
  }, [input]);

  return (
    <div className="card max-w-xl mx-auto p-4 sm:p-6 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <h2 className="text-xl font-semibold mb-1">{NumberToWordsValue.title}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{NumberToWordsValue.description}</p>

      <label className="flex flex-col">
        <span className="text-xs text-gray-500 mb-1">Number</span>
        <input
          type="text"
          inputMode="numeric"
          value={input}
          onChange={(e) => setInput(e.target.value.trim())}
          placeholder="e.g., 123456"
          className="h-10 px-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
        />
      </label>

      <div className="mt-4">
        <span className="text-xs text-gray-500 mb-1 block">Words</span>
        <div className="min-h-12 p-2 rounded border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800" aria-live="polite">
          {words || "—"}
        </div>
      </div>
    </div>
  );
}
