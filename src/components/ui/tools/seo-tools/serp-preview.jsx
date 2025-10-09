import React, { useMemo, useState } from "react";

export const SerpPreviewValue = {
  slug: "serp-preview",
  title: "SERP Preview",
  description: "Preview how a page might appear in search results.",
  category: "SEO Tools",
  icon: "🔎",
};

function clamp(str, max) {
  if (!str) return "";
  return str.length <= max ? str : str.slice(0, max - 1) + "…";
}

export default function SerpPreview() {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [desc, setDesc] = useState("");
  const t = useMemo(()=>clamp(title, 60), [title]);
  const d = useMemo(()=>clamp(desc, 160), [desc]);

  return (
    <div className="card max-w-3xl mx-auto p-4 sm:p-6 rounded border bg-white dark:bg-gray-900">
      <h2 className="text-xl font-semibold mb-1">{SerpPreviewValue.title}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{SerpPreviewValue.description}</p>

      <div className="grid grid-cols-1 gap-3 mb-3">
        <input value={title} onChange={(e)=>setTitle(e.target.value)} className="h-10 px-3 rounded border" placeholder="Title" />
        <input value={url} onChange={(e)=>setUrl(e.target.value)} className="h-10 px-3 rounded border" placeholder="URL" />
        <textarea rows={3} value={desc} onChange={(e)=>setDesc(e.target.value)} className="w-full rounded border p-2" placeholder="Meta description" />
      </div>

      <div className="rounded border p-3 bg-white dark:bg-gray-800">
        <div className="text-[#1a0dab] text-xl leading-tight">{t || "Example Title"}</div>
        <div className="text-[#006621] text-sm">{url || "https://example.com/path"}</div>
        <div className="text-[#545454] text-sm mt-1">{d || "This is a sample description showing how it might look."}</div>
      </div>
    </div>
  );
}
