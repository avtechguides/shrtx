import React, { useState } from "react";

export const LoremIpsumValue = {
  slug: "lorem-ipsum",
  title: "Lorem Ipsum",
  description: "Generate placeholder text by paragraphs.",
  category: "Text Tools",
  icon: "📝",
};

const LIPSUM = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae mi in arcu sagittis tincidunt. Donec feugiat, nisl eget dictum accumsan, odio nunc hendrerit erat, non eleifend sem lectus id leo.";

export default function LoremIpsum() {
  const [count, setCount] = useState(3);
  const [out, setOut] = useState("");

  function generate() {
    const n = Math.max(1, Math.min(50, Number(count) || 3));
    setOut(Array.from({length:n},()=>LIPSUM).join("\n\n"));
  }

  function copy() {
    if (out) navigator.clipboard.writeText(out);
  }

  return (
    <div className="card max-w-xl mx-auto p-4 sm:p-6 rounded border bg-white dark:bg-gray-900">
      <h2 className="text-xl font-semibold mb-1">{LoremIpsumValue.title}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{LoremIpsumValue.description}</p>

      <div className="flex items-center gap-3 mb-3">
        <label className="flex items-center gap-2">
          <span>Paragraphs</span>
          <input type="number" min="1" max="50" value={count} onChange={(e)=>setCount(e.target.value)} className="h-10 w-20 px-2 rounded border" />
        </label>
        <button onClick={generate} className="h-9 px-3 rounded bg-black text-white">Generate</button>
        <button onClick={copy} className="h-9 px-3 rounded bg-gray-100 border" disabled={!out}>Copy</button>
      </div>

      <textarea readOnly rows={10} value={out} className="w-full rounded border p-2" />
    </div>
  );
}
