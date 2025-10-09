import React, { useState } from "react";

export const PdfToTextValue = {
  slug: "pdf-to-text",
  title: "PDF to Text",
  description: "Extract text from PDFs in-browser with a PDF parser.",
  category: "PDF Tools",
  icon: "📄",
};

// To truly extract text, wire in a client-side PDF parser (e.g., PDF.js).
// Stub UI to keep footprint low.

export default function PdfToText() {
  const [fileName, setFileName] = useState("");
  const [text, setText] = useState("");
  const [status, setStatus] = useState("");

  function onFile(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    setFileName(f.name);
    setStatus("Parsing PDF with a PDF parser is required for text extraction.");
    setText("");
  }

  return (
    <div className="card max-w-3xl mx-auto p-4 sm:p-6 rounded border bg-white dark:bg-gray-900">
      <h2 className="text-xl font-semibold mb-1">{PdfToTextValue.title}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{PdfToTextValue.description}</p>

      <input type="file" accept="application/pdf" onChange={onFile} className="mb-3" />
      {fileName && <div className="text-sm mb-2">Selected: {fileName}</div>}
      <div className="p-3 rounded border bg-gray-50 dark:bg-gray-800 mb-3" aria-live="polite">
        {status || "Upload a PDF to extract text."}
      </div>
      <textarea readOnly rows={10} value={text} className="w-full rounded border p-2 font-mono text-sm" placeholder="Text output appears here..." />
      <p className="text-xs text-gray-500 mt-2">Integrate a PDF parser to produce selectable text.</p>
    </div>
  );
}
