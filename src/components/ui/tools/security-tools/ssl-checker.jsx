import React, { useState } from "react";

export const SslCheckerValue = {
  slug: "ssl-checker",
  title: "SSL Checker",
  description: "Check a domain’s SSL status via HTTPS request headers.",
  category: "Security Tools",
  icon: "🔒",
};

// In the browser, deep TLS details are not directly accessible.
// This component makes a HEAD request to indicate reachability and certificate presence indirectly.

export default function SslChecker() {
  const [domain, setDomain] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function check() {
    setLoading(true);
    setStatus("");
    try {
      const url = domain.startsWith("http") ? domain : `https://${domain}`;
      const res = await fetch(url, { method: "HEAD", mode: "no-cors" });
      // no-cors hides details, but success implies reachable HTTPS
      setStatus("Site is reachable over HTTPS. For detailed cert info, use a server-side check or CA API.");
    } catch {
      setStatus("Could not reach via HTTPS or blocked by CORS.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card max-w-xl mx-auto p-4 sm:p-6 rounded border bg-white dark:bg-gray-900">
      <h2 className="text-xl font-semibold mb-1">{SslCheckerValue.title}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{SslCheckerValue.description}</p>

      <div className="flex gap-2 mb-3">
        <input value={domain} onChange={(e)=>setDomain(e.target.value)} className="h-10 px-3 rounded border flex-1" placeholder="example.com or https://example.com" />
        <button onClick={check} className="h-10 px-3 rounded bg-black text-white" disabled={loading}>{loading ? "Checking..." : "Check"}</button>
      </div>

      <div className="p-3 rounded border bg-gray-50 dark:bg-gray-800 min-h-14" aria-live="polite">{status || "Enter a domain to check."}</div>
    </div>
  );
}
