import React, { useState } from "react";

export const PdfToWordValue = {
  slug: "pdf-to-word",
  title: "PDF to Word",
  description: "Convert PDFs to DOCX via client integration or server API.",
  category: "PDF Tools",
  icon: "📝",
};

// True PDF→DOCX conversion typically needs a specialized library or API.
// This component provides the UX scaffold.

export default function PdfToWord() {
  const [fileName, setFileName] = useState("");
  const [status, setStatus] = useState("");

  function onFile(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    setFileName(f.name);
    setStatus("Conversion requires a DOCX generator and PDF parsing.");
  }

  return (
    <div className="card max-w-xl mx-auto p-4 sm:p-6 rounded border bg-white dark:bg-gray-900">
      <h2 className="text-xl font-semibold mb-1">{PdfToWordValue.title}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{PdfToWordValue.description}</p>

      <input type="file" accept="application/pdf" onChange={onFile} className="mb-3" />
      {fileName && <div className="text-sm mb-2">Selected: {fileName}</div>}
      <div className="p-3 rounded border bg-gray-50 dark:bg-gray-800" aria-live="polite">
        {status || "Upload a PDF to begin conversion."}
      </div>
      <p className="text-xs text-gray-500 mt-2">Consider an API or client-side pipeline for DOCX generation.</p>
    </div>
  );
}
