import React, { useRef, useState } from "react";

export const ImageCompressorValue = {
  slug: "image-compressor",
  title: "Image Compressor",
  description: "Compress images in-browser using canvas.",
  category: "Image Tools",
  icon: "🗜️",
};

export default function ImageCompressor() {
  const [src, setSrc] = useState("");
  const [quality, setQuality] = useState(0.8);
  const [output, setOutput] = useState("");
  const imgRef = useRef(new Image());

  function onFile(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => setSrc(reader.result?.toString() || "");
    reader.readAsDataURL(f);
  }

  function compress() {
    if (!src) return;
    const img = imgRef.current;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const data = canvas.toDataURL("image/jpeg", Math.min(Math.max(quality, 0.05), 1));
      setOutput(data);
    };
    img.src = src;
  }

  function download() {
    if (!output) return;
    const a = document.createElement("a");
    a.download = "compressed.jpg";
    a.href = output;
    a.click();
  }

  return (
    <div className="card max-w-3xl mx-auto p-4 sm:p-6 rounded border bg-white dark:bg-gray-900">
      <h2 className="text-xl font-semibold mb-1">{ImageCompressorValue.title}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{ImageCompressorValue.description}</p>

      <input type="file" accept="image/*" onChange={onFile} className="mb-3" />
      <div className="flex items-center gap-3 mb-3">
        <label className="flex items-center gap-2">
          <span className="text-sm">Quality</span>
          <input type="range" min="0.05" max="1" step="0.05" value={quality} onChange={(e)=>setQuality(Number(e.target.value))} />
          <span className="text-xs text-gray-500">{quality}</span>
        </label>
        <button onClick={compress} className="h-9 px-3 rounded bg-black text-white" disabled={!src}>Compress</button>
        <button onClick={download} className="h-9 px-3 rounded bg-gray-100 border" disabled={!output}>Download</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="border rounded p-2">
          {src ? <img src={src} alt="Original" className="max-w-full" /> : <div className="text-sm text-gray-500">Original preview</div>}
        </div>
        <div className="border rounded p-2">
          {output ? <img src={output} alt="Compressed" className="max-w-full" /> : <div className="text-sm text-gray-500">Compressed preview</div>}
        </div>
      </div>
    </div>
  );
}
