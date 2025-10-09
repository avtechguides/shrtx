import React, { useState } from "react";

export const UsernameGeneratorValue = {
  slug: "username-generator",
  title: "Username Generator",
  description: "Create random usernames with options.",
  category: "Fun Tools",
  icon: "👤",
};

const ADJ = ["cool","swift","brave","silent","hyper","lucky","smart","cosmic"];
const NOUN = ["tiger","eagle","ninja","coder","wizard","galaxy","pixel","phoenix"];

function rand(arr){ return arr[Math.floor(Math.random()*arr.length)]; }

export default function UsernameGenerator() {
  const [useNumber, setUseNumber] = useState(true);
  const [useDash, setUseDash] = useState(false);
  const [out, setOut] = useState("");

  function gen() {
    const name = `${rand(ADJ)}${useDash ? "-" : ""}${rand(NOUN)}${useNumber ? Math.floor(Math.random()*1000) : ""}`;
    setOut(name);
  }

  return (
    <div className="card max-w-md mx-auto p-4 sm:p-6 rounded border bg-white dark:bg-gray-900">
      <h2 className="text-xl font-semibold mb-1">{UsernameGeneratorValue.title}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{UsernameGeneratorValue.description}</p>
      <label className="flex items-center gap-2 mb-2">
        <input type="checkbox" checked={useNumber} onChange={(e)=>setUseNumber(e.target.checked)} />
        <span>Append number</span>
      </label>
      <label className="flex items-center gap-2 mb-3">
        <input type="checkbox" checked={useDash} onChange={(e)=>setUseDash(e.target.checked)} />
        <span>Use dash</span>
      </label>
      <button onClick={gen} className="h-9 px-3 rounded bg-black text-white">Generate</button>
      <div className="mt-3 p-2 rounded border bg-gray-50 dark:bg-gray-800" aria-live="polite">{out || "—"}</div>
    </div>
  );
}
