import React, { useMemo, useState } from "react";

export const MetaGeneratorValue = {
  slug: "meta-generator",
  title: "Meta Tag Generator",
  description: "Generate common SEO meta tags for a page.",
  category: "SEO Tools",
  icon: "🏷️",
};

function buildMeta({ title, desc, url, image }) {
  const arr = [];
  if (title) {
    arr.push(`<title>${title}</title>`);
    arr.push(`<meta name="title" content="${title}">`);
    arr.push(`<meta property="og:title" content="${title}">`);
    arr.push(`<meta name="twitter:title" content="${title}">`);
  }
  if (desc) {
    arr.push(`<meta name="description" content="${desc}">`);
    arr.push(`<meta property="og:description" content="${desc}">`);
    arr.push(`<meta name="twitter:description" content="${desc}">`);
  }
  if (url) {
    arr.push(`<link rel="canonical" href="${url}">`);
    arr.push(`<meta property="og:url" content="${url}">`);
  }
  if (image) {
    arr.push(`<meta property="og:image" content="${image}">`);
    arr.push(`<meta name="twitter:image" content="${image}">`);
    arr.push(`<meta name="twitter:card" content="summary_large_image">`);
  }
  arr.push(`<meta property="og:type" content="website">`);
  return arr.join("\n");
}

export default function MetaGenerator() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [url, setUrl] = useState("");
  const [image, setImage] = useState("");
  const output = useMemo(()=>buildMeta({title,desc,url,image}),[title,desc,url,image]);

  function copy() {
    if (output) navigator.clipboard.writeText(output);
  }

  return (
    <div className="card max-w-3xl mx-auto p-4 sm:p-6 rounded border bg-white dark:bg-gray-900">
      <h2 className="text-xl font-semibold mb-1">{MetaGeneratorValue.title}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{MetaGeneratorValue.description}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        <input value={title} onChange={(e)=>setTitle(e.target.value)} className="h-10 px-3 rounded border" placeholder="Title" />
        <input value={url} onChange={(e)=>setUrl(e.target.value)} className="h-10 px-3 rounded border" placeholder="Canonical URL" />
        <input value={image} onChange={(e)=>setImage(e.target.value)} className="h-10 px-3 rounded border sm:col-span-2" placeholder="OG/Twitter image URL" />
        <textarea rows={3} value={desc} onChange={(e)=>setDesc(e.target.value)} className="w-full rounded border p-2 sm:col-span-2" placeholder="Description" />
      </div>

      <div className="mb-2">
        <button onClick={copy} className="h-9 px-3 rounded bg-black text-white" disabled={!output}>Copy</button>
      </div>
      <textarea readOnly rows={10} value={output} className="w-full rounded border p-2 font-mono text-sm bg-gray-50 dark:bg-gray-800" />
    </div>
  );
}
