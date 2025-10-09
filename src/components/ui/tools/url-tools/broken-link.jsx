import React, { useState } from "react";

export const BrokenLinkValue = {
  slug: "broken-link",
  title: "Broken Link Checker",
  description: "Test a list of URLs for reachability from the browser.",
  category: "URL Tools",
  icon: "🔗",
};

async function head(url) {
  try {
    const res = await fetch(url, { method: "HEAD", mode: "no-cors" });
    // no-cors hides details; success implies reachable origin
    return { url, ok: true };
  } catch {
    return { url, ok: false };
  }
}

export default function BrokenLink() {
  const [list, setList] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  async function checkAll() {
    setLoading(true);
    const urls = list.split(/\r?\n/).map(s=>s.trim()).filter(Boolean);
    const out = [];
    for (const u of urls) {
      const url = u.startsWith("http") ? u : `https://${u}`;
      // eslint-disable-next-line no-await-in-loop
      out.push(await head(url));
    }
    setResults(out);
    setLoading(false);
  }

  return (
    <div className="card max-w-3xl mx-auto p-4 sm:p-6 rounded border bg-white dark:bg-gray-900">
      <h2 className="text-xl font-semibold mb-1">{BrokenLinkValue.title}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{BrokenLinkValue.description}</p>

      <textarea rows={6} value={list} onChange={(e)=>setList(e.target.value)} className="w-full rounded border p-2" placeholder="Enter one URL per line..." />
      <button onClick={checkAll} className="mt-3 h-9 px-3 rounded bg-black text-white" disabled={loading || !list.trim()}>
        {loading ? "Checking..." : "Check"}
      </button>

      <div className="mt-3 border rounded">
        <div className="grid grid-cols-2 p-2 text-sm font-medium border-b"><div>URL</div><div>Status</div></div>
        {results.map((r,i)=>(
          <div key={i} className="grid grid-cols-2 p-2 text-sm border-t">
            <div className="truncate">{r.url}</div>
            <div className={r.ok ? "text-green-600" : "text-red-600"}>{r.ok ? "Reachable (limited by CORS)" : "Failed"}</div>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-2">Note: Browser CORS limits visibility of HTTP status. For precise results, use a server-side checker.</p>
    </div>
  );
}
