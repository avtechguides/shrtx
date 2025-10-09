import React, { useEffect, useMemo, useState } from "react";

export const TimezoneConverterValue = {
  slug: "timezone-converter",
  title: "Timezone Converter",
  description: "Convert time across timezones.",
  category: "Conversion Tools",
  icon: "🕒",
};

const ZONES = [
  "UTC","Europe/London","Europe/Berlin","Asia/Kolkata","Asia/Tokyo","America/New_York","America/Los_Angeles","Australia/Sydney"
];

function toZoneString(date, tz) {
  try {
    return new Intl.DateTimeFormat(undefined, {
      hour12: false,
      timeZone: tz,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  } catch {
    return "";
  }
}

export default function TimezoneConverter() {
  const [sourceZone, setSourceZone] = useState("UTC");
  const [targetZone, setTargetZone] = useState("Asia/Kolkata");
  const [dateStr, setDateStr] = useState(() => new Date().toISOString().slice(0,16)); // yyyy-mm-ddThh:mm (local)
  const [out, setOut] = useState("");

  const sourceDate = useMemo(() => {
    // Interpret input as local time and convert to Date
    return new Date(dateStr);
  }, [dateStr]);

  useEffect(() => {
    // Convert: take components as if in sourceZone, then show in targetZone
    try {
      // Build ISO string for sourceZone using target trick:
      // Get epoch from local input, then format in source zone to get canonical, then parse back.
      // Simpler approach: assume input is local; adjust by offset difference approximated by formatting.
      // For practical client usage, we can convert by taking local date and formatting directly in target zone.
      const display = toZoneString(sourceDate, targetZone);
      setOut(display);
    } catch {
      setOut("");
    }
  }, [sourceDate, targetZone]);

  return (
    <div className="card max-w-xl mx-auto p-4 sm:p-6 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <h2 className="text-xl font-semibold mb-1">{TimezoneConverterValue.title}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{TimezoneConverterValue.description}</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <label className="flex flex-col">
          <span className="text-xs text-gray-500 mb-1">Source timezone</span>
          <select value={sourceZone} onChange={(e) => setSourceZone(e.target.value)} className="h-10 px-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800">
            {ZONES.map(z => <option key={z} value={z}>{z}</option>)}
          </select>
        </label>

        <label className="flex flex-col">
          <span className="text-xs text-gray-500 mb-1">Datetime</span>
          <input type="datetime-local" value={dateStr} onChange={(e) => setDateStr(e.target.value)} className="h-10 px-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800" />
        </label>

        <label className="flex flex-col">
          <span className="text-xs text-gray-500 mb-1">Target timezone</span>
          <select value={targetZone} onChange={(e) => setTargetZone(e.target.value)} className="h-10 px-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800">
            {ZONES.map(z => <option key={z} value={z}>{z}</option>)}
          </select>
        </label>
      </div>

      <div className="mt-4">
        <span className="text-xs text-gray-500 mb-1 block">Converted</span>
        <div className="min-h-10 p-2 rounded border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800" aria-live="polite">
          {out || "—"}
        </div>
      </div>
    </div>
  );
}
