import React, { useState } from "react";

export const PdfSplitMergeValue = {
  slug: "pdf-split-merge",
  title: "PDF Split & Merge",
  description: "Split or merge PDFs in-browser with a PDF library.",
  category: "PDF Tools",
  icon: "🧩",
};

// Guidance-only implementation to keep bundle light.
// Wire up pdf-lib or a WASM solution for full functionality.

export default function PdfSplitMerge() {
  const [files, setFiles] = useState([]);
  const [status, setStatus] = useState("");

  function onFiles(e) {
    const list = Array.from(e.target.files || []);
    setFiles(list);
  }

  async function merge() {
    setStatus("Merging requires a PDF library (e.g., pdf-lib). Integrate to proceed.");
  }

  async function split() {
    setStatus("Splitting requires a PDF library (e.g., pdf-lib). Integrate to proceed.");
  }

  return (
    <div className="card max-w-xl mx-auto p-4 sm:p-6 rounded border bg-white dark:bg-gray-900">
      <h2 className="text-xl font-semibold mb-1">{PdfSplitMergeValue.title}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{PdfSplitMergeValue.description}</p>

      <input type="file" accept="application/pdf" multiple onChange={onFiles} className="mb-3" />
      <div className="flex gap-2 mb-3">
        <button onClick={merge} className="h-9 px-3 rounded bg-black text-white" disabled={!files.length}>Merge PDFs</button>
        <button onClick={split} className="h-9 px-3 rounded bg-gray-100 border" disabled={!files.length}>Split PDF</button>
      </div>
      <div className="p-3 rounded border bg-gray-50 dark:bg-gray-800 min-h-14" aria-live="polite">
        {status || "Select PDFs and choose an action."}
      </div>
      <p className="text-xs text-gray-500 mt-2">Use a client-side PDF toolkit to implement merge/split fully.</p>
    </div>
  );
}
