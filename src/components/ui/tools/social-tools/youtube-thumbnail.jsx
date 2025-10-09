import React, { useMemo, useState } from "react";

export const YoutubeThumbnailValue = {
  slug: "youtube-thumbnail",
  title: "YouTube Thumbnail",
  description: "Preview YouTube video thumbnails from video ID or URL.",
  category: "Social Tools",
  icon: "▶️",
};

function extractId(input) {
  try {
    // Supports youtu.be/<id>, youtube.com/watch?v=<id>, and short forms
    const u = new URL(input, "https://youtube.com");
    const host = u.hostname.replace(/^www\./,"");
    if (host === "youtu.be") return u.pathname.slice(1);
    if (host.includes("youtube.com")) {
      if (u.pathname === "/watch") return u.searchParams.get("v") || "";
      if (u.pathname.startsWith("/shorts/")) return u.pathname.split("/")[2] || "";
      if (u.pathname.startsWith("/embed/")) return u.pathname.split("/")[2] || "";
    }
    return input; // assume it's a raw ID
  } catch {
    return input;
  }
}

export default function YoutubeThumbnail() {
  const [input, setInput] = useState("");
  const id = useMemo(()=>extractId(input).trim(), [input]);
  const thumbs = useMemo(() => {
    if (!id) return [];
    return [
      { label: "Default (120x90)", url: `https://i.ytimg.com/vi/${id}/default.jpg` },
      { label: "HQ (480x360)", url: `https://i.ytimg.com/vi/${id}/hqdefault.jpg` },
      { label: "MQ (320x180)", url: `https://i.ytimg.com/vi/${id}/mqdefault.jpg` },
      { label: "SD (640x480)", url: `https://i.ytimg.com/vi/${id}/sddefault.jpg` },
      { label: "MaxRes (1280x720)", url: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg` },
    ];
  }, [id]);

  return (
    <div className="card max-w-3xl mx-auto p-4 sm:p-6 rounded border bg-white dark:bg-gray-900">
      <h2 className="text-xl font-semibold mb-1">{YoutubeThumbnailValue.title}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{YoutubeThumbnailValue.description}</p>

      <input value={input} onChange={(e)=>setInput(e.target.value)} className="h-10 px-3 rounded border w-full mb-3" placeholder="YouTube URL or ID" />
      {id ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {thumbs.map((t)=>(
            <div key={t.label} className="border rounded p-2">
              <div className="text-sm mb-1">{t.label}</div>
              <img src={t.url} alt={t.label} className="w-full h-auto" />
              <a className="inline-block mt-2 h-8 px-3 rounded bg-black text-white" href={t.url} download>
                Download
              </a>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-sm text-gray-500">Enter a valid YouTube URL or ID.</div>
      )}
    </div>
  );
}
