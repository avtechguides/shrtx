import React, { useMemo, useState } from "react";

export const UnitConverterValue = {
  slug: "unit-converter",
  title: "Unit Converter",
  description: "Convert units across length, weight, and temperature.",
  category: "Conversion Tools",
  icon: "📏",
};

const CATEGORIES = {
  length: { base: "m", units: { m: 1, km: 1000, cm: 0.01, mm: 0.001, mi: 1609.344, ft: 0.3048, in: 0.0254 } },
  weight: { base: "kg", units: { kg: 1, g: 0.001, lb: 0.45359237, oz: 0.028349523125 } },
};

function convertLinear(value, from, to, map) {
  const v = Number(value);
  if (!Number.isFinite(v)) return "";
  const a = map[from];
  const b = map[to];
  if (!a || !b) return "";
  return (v * a / b);
}

function convertTemp(value, from, to) {
  const v = Number(value);
  if (!Number.isFinite(v)) return "";
  // via Celsius
  let c;
  if (from === "C") c = v;
  else if (from === "F") c = (v - 32) * 5/9;
  else if (from === "K") c = v - 273.15;
  else return "";
  if (to === "C") return c;
  if (to === "F") return c * 9/5 + 32;
  if (to === "K") return c + 273.15;
  return "";
}

export default function UnitConverter() {
  const [category, setCategory] = useState("length");
  const [from, setFrom] = useState("m");
  const [to, setTo] = useState("km");
  const [value, setValue] = useState("1");
  const units = useMemo(() => {
    if (category === "temperature") return ["C","F","K"];
    return Object.keys(CATEGORIES[category]?.units || {});
  }, [category]);

  const output = useMemo(() => {
    if (value === "") return "";
    if (category === "temperature") return String(convertTemp(value, from, to));
    const map = CATEGORIES[category]?.units || {};
    const res = convertLinear(value, from, to, map);
    return Number.isFinite(res) ? res.toLocaleString(undefined, { maximumFractionDigits: 8 }) : "";
  }, [value, from, to, category]);

  return (
    <div className="card max-w-xl mx-auto p-4 sm:p-6 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <h2 className="text-xl font-semibold mb-1">{UnitConverterValue.title}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{UnitConverterValue.description}</p>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <label className="flex flex-col">
          <span className="text-xs text-gray-500 mb-1">Category</span>
          <select
            value={category}
            onChange={(e) => {
              const c = e.target.value;
              setCategory(c);
              if (c === "length") { setFrom("m"); setTo("km"); }
              else if (c === "weight") { setFrom("kg"); setTo("lb"); }
              else { setFrom("C"); setTo("F"); }
            }}
            className="h-10 px-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
          >
            <option value="length">Length</option>
            <option value="weight">Weight</option>
            <option value="temperature">Temperature</option>
          </select>
        </label>

        <label className="flex flex-col">
          <span className="text-xs text-gray-500 mb-1">From</span>
          <select value={from} onChange={(e) => setFrom(e.target.value)} className="h-10 px-3 rounded border">
            {units.map(u => <option key={u} value={u}>{u}</option>)}
          </select>
        </label>

        <label className="flex flex-col">
          <span className="text-xs text-gray-500 mb-1">To</span>
          <select value={to} onChange={(e) => setTo(e.target.value)} className="h-10 px-3 rounded border">
            {units.map(u => <option key={u} value={u}>{u}</option>)}
          </select>
        </label>

        <label className="flex flex-col">
          <span className="text-xs text-gray-500 mb-1">Value</span>
          <input
            type="text"
            inputMode="decimal"
            value={value}
            onChange={(e) => {
              const v = e.target.value;
              if (v === "" || /^[0-9]*[.]?[0-9]*$/.test(v)) setValue(v);
            }}
            className="h-10 px-3 rounded border"
          />
        </label>
      </div>

      <div className="mt-4">
        <span className="text-xs text-gray-500 mb-1 block">Result</span>
        <div className="min-h-10 p-2 rounded border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800" aria-live="polite">
          {output || "—"}
        </div>
      </div>
    </div>
  );
}
