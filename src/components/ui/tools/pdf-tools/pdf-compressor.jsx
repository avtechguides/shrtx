import React, { useState } from "react";

export const PdfCompressorValue = {
  slug: "pdf-compressor",
  title: "PDF Compressor",
  description: "Compress PDFs in-browser (basic) by re-encoding embedded images.",
  category: "PDF Tools",
  icon: "🗜️",
};

// Note: True PDF compression requires manipulating PDF objects.
// A practical browser approach is using a WASM library (e.g., pdf-lib + re-encode images or dedicated WASM).
// The component below demonstrates a placeholder workflow and guidance.

export default function PdfCompressor() {
  const [fileName, setFileName] = useState("");
  const [status, setStatus] = useState("");
  const [outUrl, setOutUrl] = useState("");

  async function onFile(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    setFileName(f.name);
    setStatus("Analyzing PDF...");
    // Placeholder: to truly compress, integrate a client-side PDF lib + WASM
    // and downscale or recompress embedded images, then rebuild the PDF.
    // Keeping a stub to avoid shipping heavy deps by default.
    setTimeout(() => {
      setStatus("Client-side PDF compression requires a WASM-backed library. Consider integrating pdf-lib or a dedicated WASM tool.");
      setOutUrl("");
    }, 600);
  }

  return (
    <div className="card max-w-xl mx-auto p-4 sm:p-6 rounded border bg-white dark:bg-gray-900">
      <h2 className="text-xl font-semibold mb-1">{PdfCompressorValue.title}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{PdfCompressorValue.description}</p>

      <input type="file" accept="application/pdf" onChange={onFile} className="mb-3" />
      {fileName && <div className="text-sm mb-2">Selected: {fileName}</div>}
      <div className="p-3 rounded border bg-gray-50 dark:bg-gray-800 min-h-14" aria-live="polite">
        {status || "Upload a PDF to begin."}
      </div>
      {outUrl && (
        <a href={outUrl} download={`compressed-${fileName || "document"}`} className="mt-3 inline-block h-9 px-3 rounded bg-black text-white">
          Download
        </a>
      )}
      <p className="text-xs text-gray-500 mt-2">Recommendation: integrate a PDF library for real compression and manipulation.</p>
    </div>
  );
}
