import React, { useMemo, useState } from "react";

export const UtmBuilderValue = {
  slug: "utm-builder",
  title: "UTM Builder",
  description: "Append UTM parameters to a URL and copy the result.",
  category: "URL Tools",
  icon: "🏷️",
};

function buildURL(base, params) {
  try {
    const u = new URL(base);
    Object.entries(params).forEach(([k,v]) => {
      if (v) u.searchParams.set(k, v);
      else u.searchParams.delete(k);
    });
    return u.toString();
  } catch {
    return "";
  }
}

export default function UtmBuilder() {
  const [base, setBase] = useState("");
  const [source, setSource] = useState("");
  const [medium, setMedium] = useState("");
  const [campaign, setCampaign] = useState("");
  const [term, setTerm] = useState("");
  const [content, setContent] = useState("");

  const out = useMemo(()=>buildURL(base, {
    utm_source: source,
    utm_medium: medium,
    utm_campaign: campaign,
    utm_term: term,
    utm_content: content,
  }),[base, source, medium, campaign, term, content]);

  function copy() {
    if (out) navigator.clipboard.writeText(out);
  }

  return (
    <div className="card max-w-3xl mx-auto p-4 sm:p-6 rounded border bg-white dark:bg-gray-900">
      <h2 className="text-xl font-semibold mb-1">{UtmBuilderValue.title}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{UtmBuilderValue.description}</p>

      <input value={base} onChange={(e)=>setBase(e.target.value)} className="h-10 px-3 rounded border w-full mb-3" placeholder="https://example.com/page" />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
        <input value={source} onChange={(e)=>setSource(e.target.value)} className="h-10 px-3 rounded border" placeholder="utm_source" />
        <input value={medium} onChange={(e)=>setMedium(e.target.value)} className="h-10 px-3 rounded border" placeholder="utm_medium" />
        <input value={campaign} onChange={(e)=>setCampaign(e.target.value)} className="h-10 px-3 rounded border" placeholder="utm_campaign" />
        <input value={term} onChange={(e)=>setTerm(e.target.value)} className="h-10 px-3 rounded border" placeholder="utm_term" />
        <input value={content} onChange={(e)=>setContent(e.target.value)} className="h-10 px-3 rounded border" placeholder="utm_content" />
      </div>

      <button onClick={copy} className="h-9 px-3 rounded bg-black text-white mb-2" disabled={!out}>Copy URL</button>
      <textarea readOnly rows={3} value={out} className="w-full rounded border p-2 font-mono text-sm bg-gray-50 dark:bg-gray-800" />
    </div>
  );
}
