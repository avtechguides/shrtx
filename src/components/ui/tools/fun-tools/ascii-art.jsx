import React, { useMemo, useState } from "react";

export const AsciiArtValue = {
  slug: "ascii-art",
  title: "ASCII Art",
  description: "Render text as simple block ASCII art.",
  category: "Fun Tools",
  icon: "🧱",
};

// Very basic mono “font” using # blocks and spaces for a few characters
const FONT = {
  A: [" ## ","#  #","####","#  #","#  #"],
  B: ["### ","#  #","### ","#  #","### "],
  C: [" ## ","#  #","#   ","#  #"," ## "],
  " ": ["    ","    ","    ","    ","    "],
};

function renderASCII(text) {
  const rows = ["","","","",""];
  const chars = text.toUpperCase().split("");
  chars.forEach((ch, idx) => {
    const glyph = FONT[ch] || FONT[" "];
    for (let r=0; r<5; r++) {
      rows[r] += glyph[r] + " ";
    }
  });
  return rows.join("\n");
}

export default function AsciiArt() {
  const [text, setText] = useState("ABC");
  const art = useMemo(()=>renderASCII(text),[text]);

  return (
    <div className="card max-w-2xl mx-auto p-4 sm:p-6 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <h2 className="text-xl font-semibold mb-1">{AsciiArtValue.title}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{AsciiArtValue.description}</p>

      <input className="h-10 px-3 rounded border w-full" value={text} onChange={(e)=>setText(e.target.value)} />
      <pre className="mt-4 p-3 rounded border bg-gray-50 dark:bg-gray-800 overflow-auto">{art}</pre>
    </div>
  );
}
