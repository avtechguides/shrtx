import React, { useState } from "react";

export const IpLookupValue = {
  slug: "ip-lookup",
  title: "IP Lookup",
  description: "Find approximate geolocation from an IP using a public API.",
  category: "Security Tools",
  icon: "📍",
};

// Uses ip-api.com's JSON endpoint as an example; swap providers as needed.
const LOOKUP = (ip) => `https://ip-api.com/json/${encodeURIComponent(ip || "")}`;

export default function IpLookup() {
  const [ip, setIp] = useState("");
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function search() {
    setLoading(true);
    setErr("");
    setData(null);
    try {
      const res = await fetch(LOOKUP(ip.trim()));
      if (!res.ok) throw new Error("Lookup failed");
      const json = await res.json();
      if (json.status !== "success") throw new Error(json.message || "Lookup error");
      setData(json);
    } catch (e) {
      setErr("Could not fetch IP details.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card max-w-xl mx-auto p-4 sm:p-6 rounded border bg-white dark:bg-gray-900">
      <h2 className="text-xl font-semibold mb-1">{IpLookupValue.title}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{IpLookupValue.description}</p>

      <div className="flex gap-2 mb-3">
        <input value={ip} onChange={(e)=>setIp(e.target.value)} className="h-10 px-3 rounded border flex-1" placeholder="Enter IP (leave blank for own)" />
        <button onClick={search} className="h-10 px-3 rounded bg-black text-white" disabled={loading}>{loading ? "Loading..." : "Lookup"}</button>
      </div>

      <div className="p-3 rounded border bg-gray-50 dark:bg-gray-800 min-h-14" aria-live="polite">
        {err ? <div className="text-red-600">{err}</div> : data ? (
          <ul className="text-sm space-y-1">
            <li><strong>IP:</strong> {data.query}</li>
            <li><strong>Country:</strong> {data.country} ({data.countryCode})</li>
            <li><strong>Region:</strong> {data.regionName}</li>
            <li><strong>City:</strong> {data.city}</li>
            <li><strong>ISP:</strong> {data.isp}</li>
            <li><strong>Lat,Lon:</strong> {data.lat}, {data.lon}</li>
          </ul>
        ) : "No data yet."}
      </div>
    </div>
  );
}
