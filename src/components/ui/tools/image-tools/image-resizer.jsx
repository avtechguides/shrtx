import React, { useRef, useState } from "react";

export const ImageResizerValue = {
  slug: "image-resizer",
  title: "Image Resizer",
  description: "Resize images in-browser, preserving aspect ratio.",
  category: "Image Tools",
  icon: "📐",
};

export default function ImageResizer() {
  const [src, setSrc] = useState("");
  const [w, setW] = useState("");
  const [h, setH] = useState("");
  const [keepAspect, setKeepAspect] = useState(true);
  const [output, setOutput] = useState("");
  const imgRef = useRef(new Image());

  function onFile(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => setSrc(reader.result?.toString() || "");
    reader.readAsDataURL(f);
  }

  function resize() {
    if (!src) return;
    const img = imgRef.current;
    img.onload = () => {
      let targetW = Number(w);
      let targetH = Number(h);

      if (!targetW && !targetH) {
        targetW = img.width;
        targetH = img.height;
      } else if (keepAspect) {
        const ratio = img.width / img.height;
        if (targetW && !targetH) targetH = Math.round(targetW / ratio);
        if (targetH && !targetW) targetW = Math.round(targetH * ratio);
      }

      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, targetW || img.width);
      canvas.height = Math.max(1, targetH || img.height);
      const ctx = canvas.getContext("2d");
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      setOutput(canvas.toDataURL("image/png"));
    };
    img.src = src;
  }

  function download() {
    if (!output) return;
    const a = document.createElement("a");
    a.download = "resized.png";
    a.href = output;
    a.click();
  }

  return (
    <div className="card max-w-3xl mx-auto p-4 sm:p-6 rounded border bg-white dark:bg-gray-900">
      <h2 className="text-xl font-semibold mb-1">{ImageResizerValue.title}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{ImageResizerValue.description}</p>

      <input type="file" accept="image/*" onChange={onFile} className="mb-3" />
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-3">
        <label className="flex flex-col">
          <span className="text-xs text-gray-500 mb-1">Width (px)</span>
          <input value={w} onChange={(e)=>setW(e.target.value.replace(/\D/g,""))} className="h-10 px-3 rounded border" placeholder="e.g., 800" />
        </label>
        <label className="flex flex-col">
          <span className="text-xs text-gray-500 mb-1">Height (px)</span>
          <input value={h} onChange={(e)=>setH(e.target.value.replace(/\D/g,""))} className="h-10 px-3 rounded border" placeholder="e.g., 600" />
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={keepAspect} onChange={(e)=>setKeepAspect(e.target.checked)} />
          <span>Keep aspect</span>
        </label>
        <div className="flex items-center">
          <button onClick={resize} className="h-9 px-3 rounded bg-black text-white" disabled={!src}>Resize</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="border rounded p-2">{src ? <img src={src} alt="Original" className="max-w-full" /> : <div className="text-sm text-gray-500">Original</div>}</div>
        <div className="border rounded p-2">
          {output ? <img src={output} alt="Resized" className="max-w-full" /> : <div className="text-sm text-gray-500">Resized</div>}
        </div>
      </div>
      <button onClick={download} className="mt-3 h-9 px-3 rounded bg-gray-100 border" disabled={!output}>Download</button>
    </div>
  );
}
