import React, { useMemo, useState } from "react";

export const TweetHashtagValue = {
  slug: "tweet-hashtag",
  title: "Tweet Hashtag Helper",
  description: "Draft tweets and analyze hashtag usage and length.",
  category: "Social Tools",
  icon: "🐦",
};

const LIMIT = 280;

export default function TweetHashtag() {
  const [text, setText] = useState("");
  const hashtags = useMemo(() => {
    const res = text.match(/#[\p{L}\p{N}_]+/gu) || [];
    return Array.from(new Set(res));
  }, [text]);
  const len = useMemo(() => new TextEncoder().encode(text).length, [text]); // bytes approximation
  const remaining = LIMIT - len;

  return (
    <div className="card max-w-2xl mx-auto p-4 sm:p-6 rounded border bg-white dark:bg-gray-900">
      <h2 className="text-xl font-semibold mb-1">{TweetHashtagValue.title}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{TweetHashtagValue.description}</p>

      <textarea rows={6} value={text} onChange={(e)=>setText(e.target.value)} className="w-full rounded border p-2" placeholder="Write tweet..." />
      <div className={`mt-2 text-sm ${remaining < 0 ? "text-red-600" : "text-gray-600"}`}>
        Length: {len} / {LIMIT} · Remaining: {remaining}
      </div>

      <div className="mt-3">
        <div className="text-sm font-medium mb-1">Hashtags</div>
        {hashtags.length ? (
          <div className="flex flex-wrap gap-2">
            {hashtags.map((h) => (
              <span key={h} className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-sm">{h}</span>
            ))}
          </div>
        ) : (
          <div className="text-sm text-gray-500">No hashtags detected.</div>
        )}
      </div>
    </div>
  );
}
