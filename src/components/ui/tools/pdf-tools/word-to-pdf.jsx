import React, { useState } from "react";

export const WordToPdfValue = {
  slug: "word-to-pdf",
  title: "Word to PDF",
  description: "Convert DOCX to PDF via client integration or server API.",
  category: "PDF Tools",
  icon: "📘",
};

// Generating PDFs from DOCX in the browser generally requires a library or API.
// This is a UX scaffold to integrate later.

export default function WordToPdf() {
  const [fileName, setFileName] = useState("");
  const [status, setStatus] = useState("");

  function onFile(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    setFileName(f.name);
    setStatus("Client-side DOCX→PDF requires a rendering pipeline (WASM/API).");
  }

  return (
    <div className="card max-w-xl mx-auto p-4 sm:p-6 rounded border bg-white dark:bg-gray-900">
      <h2 className="text-xl font-semibold mb-1">{WordToPdfValue.title}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{WordToPdfValue.description}</p>

      <input type="file" accept=".doc,.docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={onFile} className="mb-3" />
      {fileName && <div className="text-sm mb-2">Selected: {fileName}</div>}
      <div className="p-3 rounded border bg-gray-50 dark:bg-gray-800" aria-live="polite">
        {status || "Upload a DOC/DOCX to begin conversion."}
      </div>
      <p className="text-xs text-gray-500 mt-2">Integrate a conversion library or API for production.</p>
    </div>
  );
}
