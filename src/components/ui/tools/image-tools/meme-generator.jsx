import React, { useRef, useState } from "react";

export const MemeGeneratorValue = {
  slug: "meme-generator",
  title: "Meme Generator",
  description: "Add captions to an image and export.",
  category: "Image Tools",
  icon: "🎭",
};

export default function MemeGenerator() {
  const [src, setSrc] = useState("");
  const [top, setTop] = useState("TOP TEXT");
  const [bottom, setBottom] = useState("BOTTOM TEXT");
  const [size, setSize] = useState(48);
  const canvasRef = useRef(null);

  function onFile(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => setSrc(reader.result?.toString() || "");
    reader.readAsDataURL(f);
  }

  function render() {
    const canvas = canvasRef.current;
    if (!canvas || !src) return;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img,0,0);
      ctx.fillStyle = "white";
      ctx.strokeStyle = "black";
      ctx.lineWidth = Math.max(2, Math.floor(canvas.width / 250));
      ctx.font = `bold ${Math.max(12, size)}px Impact, Arial, sans-serif`;
      ctx.textAlign = "center";

      ctx.textBaseline = "top";
      ctx.fillText(top, canvas.width/2, 10);
      ctx.strokeText(top, canvas.width/2, 10);

      ctx.textBaseline = "bottom";
      ctx.fillText(bottom, canvas.width/2, canvas.height - 10);
      ctx.strokeText(bottom, canvas.width/2, canvas.height - 10);
    };
    img.src = src;
  }

  function download() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const a = document.createElement("a");
    a.download = "meme.png";
    a.href = canvas.toDataURL("image/png");
    a.click();
  }

  return (
    <div className="card max-w-2xl mx-auto p-4 sm:p-6 rounded border bg-white dark:bg-gray-900">
      <h2 className="text-xl font-semibold mb-1">{MemeGeneratorValue.title}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{MemeGeneratorValue.description}</p>

      <input type="file" accept="image/*" onChange={onFile} className="mb-3" />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
        <input value={top} onChange={(e)=>setTop(e.target.value)} className="h-10 px-3 rounded border" placeholder="Top text" />
        <input value={bottom} onChange={(e)=>setBottom(e.target.value)} className="h-10 px-3 rounded border" placeholder="Bottom text" />
        <label className="flex items-center gap-2">
          <span className="text-sm">Font size</span>
          <input type="number" min="12" max="200" value={size} onChange={(e)=>setSize(Number(e.target.value)||48)} className="h-10 w-20 px-2 rounded border" />
        </label>
      </div>
      <div className="flex gap-2 mb-3">
        <button onClick={render} className="h-9 px-3 rounded bg-black text-white" disabled={!src}>Render</button>
        <button onClick={download} className="h-9 px-3 rounded bg-gray-100 border" disabled={!src}>Download</button>
      </div>
      <canvas ref={canvasRef} className="max-w-full border rounded" />
    </div>
  );
}
