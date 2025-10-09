import React, { useState } from "react";

export const Base64ImageValue = {
  slug: "base64-image",
  title: "Base64 Image",
  description: "Encode images to Base64 (Data URL) and preview.",
  category: "Image Tools",
  icon: "🖼️",
};

export default function Base64Image() {
  const [dataUrl, setDataUrl] = useState("");

  function onFile(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => setDataUrl(reader.result?.toString() || "");
    reader.readAsDataURL(f);
  }

  function copy() {
    if (dataUrl) navigator.clipboard.writeText(dataUrl);
  }

  return (
    <div className="card max-w-3xl mx-auto p-4 sm:p-6 rounded border bg-white dark:bg-gray-900">
      <h2 className="text-xl font-semibold mb-1">{Base64ImageValue.title}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{Base64ImageValue.description}</p>

      <input type="file" accept="image/*" onChange={onFile} className="mb-3" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="border rounded p-2">
          {dataUrl ? <img src={dataUrl} alt="Preview" className="max-w-full" /> : <div className="text-sm text-gray-500">No image</div>}
        </div>
        <div className="flex flex-col">
          <textarea readOnly value={dataUrl} rows={10} className="w-full rounded border p-2 text-xs break-all" />
          <button onClick={copy} className="mt-2 h-9 px-3 rounded bg-black text-white" disabled={!dataUrl}>Copy</button>
        </div>
      </div>
    </div>
  );
}
