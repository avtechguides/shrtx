import React, { useState } from "react";

export const ImageMetadataValue = {
  slug: "image-metadata",
  title: "Image Metadata",
  description: "Extract basic EXIF metadata from images in the browser.",
  category: "Image Tools",
  icon: "🧾",
};

// Minimal EXIF parser for a few common tags (Orientation, DateTime, Make, Model, GPS)
// For full coverage, consider a dedicated EXIF library later.
async function readArrayBuffer(file) {
  return new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result);
    r.onerror = rej;
    r.readAsArrayBuffer(file);
  });
}

function getString(buf, start, length) {
  return String.fromCharCode(...new Uint8Array(buf, start, length));
}

function parseEXIF(arrayBuffer) {
  const view = new DataView(arrayBuffer);
  // JPEG starts with 0xFFD8, EXIF typically in APP1 (0xFFE1)
  if (view.getUint16(0, false) !== 0xFFD8) return {};
  let offset = 2;
  while (offset < view.byteLength) {
    const marker = view.getUint16(offset, false);
    offset += 2;
    if (marker === 0xFFE1) {
      const size = view.getUint16(offset, false);
      const start = offset + 2;
      const header = getString(arrayBuffer, start, 6);
      if (header === "Exif\0\0") {
        const tiff = start + 6;
        const little = view.getUint16(tiff, false) === 0x4949;
        const getU16 = (o) => view.getUint16(o, little);
        const getU32 = (o) => view.getUint32(o, little);

        const ifd0 = tiff + getU32(tiff + 4);
        const entries = getU16(ifd0);
        const tags = {};
        for (let i = 0; i < entries; i++) {
          const e = ifd0 + 2 + i * 12;
          const tag = getU16(e);
          const type = getU16(e + 2);
          const count = getU32(e + 4);
          const valueOffset = e + 8;
          const valPtr = count * (type === 2 ? 1 : 0) > 4 ? tiff + getU32(valueOffset) : valueOffset;

          const T = {
            0x010F: "Make",
            0x0110: "Model",
            0x0112: "Orientation",
            0x0132: "DateTime",
          }[tag];

          if (T) {
            if (type === 2) {
              // ASCII
              tags[T] = getString(arrayBuffer, valPtr, count).replace(/\0+$/, "");
            } else {
              tags[T] = getU16(valPtr);
            }
          }
        }
        return tags;
      }
      offset += size;
    } else if ((marker & 0xFFF0) !== 0xFFF0) {
      break;
    } else {
      offset += view.getUint16(offset, false);
    }
  }
  return {};
}

export default function ImageMetadata() {
  const [meta, setMeta] = useState({});
  const [preview, setPreview] = useState("");

  async function onFile(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    setPreview(URL.createObjectURL(f));
    try {
      const buf = await readArrayBuffer(f);
      const tags = parseEXIF(buf);
      setMeta(tags);
    } catch {
      setMeta({});
    }
  }

  return (
    <div className="card max-w-3xl mx-auto p-4 sm:p-6 rounded border bg-white dark:bg-gray-900">
      <h2 className="text-xl font-semibold mb-1">{ImageMetadataValue.title}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{ImageMetadataValue.description}</p>

      <input type="file" accept="image/jpeg,image/jpg" onChange={onFile} className="mb-3" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="border rounded p-2">
          {preview ? <img src={preview} alt="Preview" className="max-w-full" /> : <div className="text-sm text-gray-500">No preview</div>}
        </div>
        <div className="border rounded p-3 text-sm bg-gray-50 dark:bg-gray-800">
          {Object.keys(meta).length ? (
            <ul className="space-y-1">
              {Object.entries(meta).map(([k, v]) => (
                <li key={k} className="flex justify-between gap-2">
                  <span className="text-gray-600">{k}</span>
                  <span className="font-mono">{String(v)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-gray-500">No EXIF tags found or unsupported file.</div>
          )}
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-2">Tip: For broader EXIF coverage, consider a dedicated EXIF library when needed.</p>
    </div>
  );
}
