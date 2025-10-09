import React, { useEffect, useMemo, useRef, useState } from "react";

export const CurrencyConverterValue = {
  slug: "currency-converter",
  title: "Currency Converter",
  description: "Convert currencies easily with live exchange rates.",
  category: "Conversion Tools",
  icon: "💱",
};

const DAILY_RATES_URL = (base) =>
  `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${base.toLowerCase()}.json`;

const COMMON = ["USD","EUR","INR","GBP","JPY","AUD","CAD","CHF","CNY","HKD","NZD","SGD","SEK","NOK","DKK","ZAR","BRL","MXN","AED","SAR"];

function useDebounced(value, delay = 250) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return v;
}

export default function CurrencyConverter() {
  const [amount, setAmount] = useState("1");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [error, setError] = useState("");
  const cache = useRef(new Map());
  const debouncedAmount = useDebounced(amount);

  const numericAmount = useMemo(() => {
    const n = Number(debouncedAmount);
    return Number.isFinite(n) ? n : 0;
  }, [debouncedAmount]);

  async function fetchRates(base) {
    if (cache.current.has(base)) return cache.current.get(base);
    setLoading(true);
    setError("");
    try {
      const res = await fetch(DAILY_RATES_URL(base));
      if (!res.ok) throw new Error("Rate fetch failed");
      const data = await res.json();
      const key = Object.keys(data)[0];
      const rates = data[key] || {};
      const payload = { base, rates, date: data.date || null };
      cache.current.set(base, payload);
      setLastUpdated(payload.date);
      return payload;
    } catch {
      setError("Could not load exchange rates.");
      return { base, rates: {}, date: null };
    } finally {
      setLoading(false);
    }
  }

  async function convert() {
    if (!numericAmount || numericAmount < 0) {
      setResult("");
      return;
    }
    const { rates } = await fetchRates(from);
    const rate = rates?.[to.toLowerCase()];
    if (!rate) {
      setError(`No rate for ${from} → ${to}.`);
      setResult("");
      return;
    }
    const out = numericAmount * rate;
    setResult(out.toLocaleString(undefined, { maximumFractionDigits: 6 }));
  }

  useEffect(() => {
    convert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedAmount, from, to]);

  function swap() {
    setFrom(to);
    setTo(from);
  }

  function onAmount(e) {
    const v = e.target.value;
    if (v === "" || /^[0-9]*[.]?[0-9]*$/.test(v)) setAmount(v);
  }

  return (
    <div className="card max-w-xl mx-auto p-4 sm:p-6 rounded-lg border border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-800">
      <h2 className="text-xl font-semibold mb-1">{CurrencyConverterValue.title}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{CurrencyConverterValue.description}</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <label className="flex flex-col">
          <span className="text-xs text-gray-500 mb-1">Amount</span>
          <input
            type="text"
            inputMode="decimal"
            value={amount}
            onChange={onAmount}
            className="h-10 px-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
            aria-label="Amount"
          />
        </label>

        <label className="flex flex-col">
          <span className="text-xs text-gray-500 mb-1">From</span>
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="h-10 px-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
            aria-label="From currency"
          >
            {COMMON.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </label>

        <label className="flex flex-col">
          <span className="text-xs text-gray-500 mb-1">To</span>
          <select
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="h-10 px-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
            aria-label="To currency"
          >
            {COMMON.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </label>
      </div>

      <div className="flex items-center gap-3 mt-3">
        <button onClick={swap} type="button" className="h-9 px-3 rounded bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
          ⇄ Swap
        </button>
        <button onClick={convert} type="button" disabled={loading} className="h-9 px-4 rounded bg-black text-white dark:bg-white dark:text-black disabled:opacity-60">
          {loading ? "Converting..." : "Convert"}
        </button>
        {lastUpdated && <span className="text-xs text-gray-500">Updated: {new Date(lastUpdated).toLocaleDateString()}</span>}
      </div>

      <div className="mt-4 min-h-6" aria-live="polite" role="status">
        {error ? <p className="text-sm text-red-600">{error}</p> : result ? <p className="text-base">{Number(numericAmount).toLocaleString()} {from} = {result} {to}</p> : null}
      </div>
    </div>
  );
}
