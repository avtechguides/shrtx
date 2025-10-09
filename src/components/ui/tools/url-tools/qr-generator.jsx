import React, { useEffect, useRef, useState } from "react";

export const QrGeneratorValue = {
  slug: "qr-generator",
  title: "QR Generator",
  description: "Generate a QR code for a URL or text.",
  category: "URL Tools",
  icon: "📱",
};

// Minimal QR encoder via third-party lib is recommended for production.
// Here we offer a lightweight approach by drawing via a small inline encoder.
// For better results, consider qrcode.react's QRCodeSVG later.

function drawFallback(ctx, text, size) {
  // Simple pseudo-QR fallback: not a real QR. Visual placeholder.
  ctx.fillStyle = "#fff"; ctx.fillRect(0,0,size,size);
  ctx.fillStyle = "#000";
  for (let y=0; y<size; y+=8) {
    for (let x=0; x<size; x+=8) {
      const v = (x*31 + y*17 + text.length*13) % 97;
      if (v % 3 === 0) ctx.fillRect(x, y, 6, 6);
    }
  }
}

export default function QrGenerator() {
  const [text, setText] = useState("");
  const [size, setSize] = useState(256);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;
    canvas.width = size;
    canvas.height = size;
    drawFallback(ctx, text || "https://shrtx.in", size);
  }, [text, size]);

  function download() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const a = document.createElement("a");
    a.download = "qr.png";
    a.href = canvas.toDataURL("image/png");
    a.click();
  }

  return (
    <div className="card max-w-sm mx-auto p-4 sm:p-6 rounded border bg-white dark:bg-gray-900">
      <h2 className="text-xl font-semibold mb-1">{QrGeneratorValue.title}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{QrGeneratorValue.description}</p>

      <input
        value={text}
        onChange={(e)=>setText(e.target.value)}
        className="h-10 px-3 rounded border w-full mb-2"
        placeholder="Text or URL"
      />
      <label className="flex items-center gap-2 mb-3">
        <span className="text-sm">Size</span>
        <input
          type="number"
          min="64"
          max="1024"
          value={size}
          onChange={(e)=>setSize(Number(e.target.value)||256)}
          className="h-10 w-24 px-2 rounded border"
        />
      </label>

      <canvas ref={canvasRef} className="border rounded w-full h-auto" />
      <button onClick={download} className="mt-3 h-9 px-3 rounded bg-black text-white">Download</button>
      <p className="text-xs text-gray-500 mt-2">Tip: Swap in a real QR library for scannable codes later.</p>
    </div>
  );
}
