import React, { useMemo, useState } from "react";

export const PasswordGeneratorValue = {
  slug: "password-generator",
  title: "Password Generator",
  description: "Generate strong random passwords.",
  category: "Security Tools",
  icon: "🔑",
};

function genPassword(len, opts) {
  const U = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const L = "abcdefghijklmnopqrstuvwxyz";
  const D = "0123456789";
  const S = "!@#$%^&*()-_=+[]{};:,.<>?";
  let pool = "";
  if (opts.upper) pool += U;
  if (opts.lower) pool += L;
  if (opts.digit) pool += D;
  if (opts.symbol) pool += S;
  if (!pool) pool = L + D;

  const out = [];
  const total = pool.length;
  const cryptoOk = typeof crypto !== "undefined" && crypto.getRandomValues;
  for (let i=0;i<len;i++) {
    let idx;
    if (cryptoOk) {
      const arr = new Uint32Array(1);
      crypto.getRandomValues(arr);
      idx = arr[0] % total;
    } else {
      idx = Math.floor(Math.random()*total);
    }
    out.push(pool[idx]);
  }
  return out.join("");
}

export default function PasswordGenerator() {
  const [len, setLen] = useState(16);
  const [upper, setUpper] = useState(true);
  const [lower, setLower] = useState(true);
  const [digit, setDigit] = useState(true);
  const [symbol, setSymbol] = useState(true);
  const [pwd, setPwd] = useState("");

  const opts = useMemo(()=>({upper,lower,digit,symbol}),[upper,lower,digit,symbol]);

  function generate() {
    setPwd(genPassword(Math.max(4, Math.min(128, len)), opts));
  }

  return (
    <div className="card max-w-md mx-auto p-4 sm:p-6 rounded border bg-white dark:bg-gray-900">
      <h2 className="text-xl font-semibold mb-1">{PasswordGeneratorValue.title}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{PasswordGeneratorValue.description}</p>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <label className="flex items-center gap-2">
          <span className="text-sm">Length</span>
          <input type="number" min="4" max="128" value={len} onChange={(e)=>setLen(Number(e.target.value)||16)} className="h-10 w-20 px-2 rounded border" />
        </label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={upper} onChange={(e)=>setUpper(e.target.checked)} /><span>Uppercase</span></label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={lower} onChange={(e)=>setLower(e.target.checked)} /><span>Lowercase</span></label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={digit} onChange={(e)=>setDigit(e.target.checked)} /><span>Digits</span></label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={symbol} onChange={(e)=>setSymbol(e.target.checked)} /><span>Symbols</span></label>
      </div>

      <button onClick={generate} className="h-9 px-3 rounded bg-black text-white">Generate</button>
      <div className="mt-3 p-2 rounded border bg-gray-50 dark:bg-gray-800 font-mono break-all" aria-live="polite">{pwd || "—"}</div>
    </div>
  );
}
