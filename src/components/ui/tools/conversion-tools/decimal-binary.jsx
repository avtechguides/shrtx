import React, { useMemo, useState } from "react";

export const DecimalBinaryValue = {
  slug: "decimal-binary",
  title: "Decimal ⇄ Binary",
  description: "Convert decimal numbers to binary and back.",
  category: "Conversion Tools",
  icon: "🔁",
};

function toBinary(n) {
  if (!Number.isFinite(n)) return "";
  return Math.trunc(n).toString(2);
}

function toDecimal(b) {
  if (!/^[01]+$/.test(b)) return NaN;
  return parseInt(b, 2);
}

export default function DecimalBinary() {
  const [mode, setMode] = useState("dec2bin");
  const [input, setInput] = useState("");
  const output = useMemo(() => {
    if (input === "") return "";
    if (mode === "dec2bin") {
      const n = Number(input);
      if (!Number.isFinite(n)) return "";
      return toBinary(n);
    } else {
      if (!/^[01]+$/.test(input)) return "";
      return String(toDecimal(input));
    }
  }, [input, mode]);

  return (
    <div className="card max-w-xl mx-auto p-4 sm:p-6 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <h2 className="text-xl font-semibold mb-1">{DecimalBinaryValue.title}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{DecimalBinaryValue.description}</p>

      <div className="flex gap-2 mb-3">
        <label className="flex items-center gap-2">
          <input type="radio" name="mode" value="dec2bin" checked={mode === "dec2bin"} onChange={() => setMode("dec2bin")} />
          <span>Decimal → Binary</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="radio" name="mode" value="bin2dec" checked={mode === "bin2dec"} onChange={() => setMode("bin2dec")} />
          <span>Binary → Decimal</span>
        </label>
      </div>

      <label className="flex flex-col">
        <span className="text-xs text-gray-500 mb-1">Input</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value.trim())}
          placeholder={mode === "dec2bin" ? "e.g., 42" : "e.g., 101010"}
          className="h-10 px-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
        />
      </label>

      <div className="mt-4">
        <span className="text-xs text-gray-500 mb-1 block">Output</span>
        <div className="min-h-10 p-2 rounded border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800" aria-live="polite">
          {output || "—"}
        </div>
      </div>
    </div>
  );
}
