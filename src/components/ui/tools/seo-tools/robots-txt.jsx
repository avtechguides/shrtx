import React, { useMemo, useState } from "react";

export const RobotsTxtValue = {
  slug: "robots-txt",
  title: "robots.txt Generator",
  description: "Generate a robots.txt with common directives.",
  category: "SEO Tools",
  icon: "🤖",
};

function buildRobots({ sitemap, disallow, allow, userAgent, crawlDelay }) {
  const lines = [];
  lines.push(`User-agent: ${userAgent || "*"}`);
  (disallow || []).forEach((p) => lines.push(`Disallow: ${p}`));
  (allow || []).forEach((p) => lines.push(`Allow: ${p}`));
  if (crawlDelay) lines.push(`Crawl-delay: ${crawlDelay}`);
  if (sitemap) lines.push(`Sitemap: ${sitemap}`);
  return lines.join("\n");
}

export default function RobotsTxt() {
  const [sitemap, setSitemap] = useState("");
  const [disallowRaw, setDisallowRaw] = useState("");
  const [allowRaw, setAllowRaw] = useState("");
  const [userAgent, setUserAgent] = useState("*");
  const [crawlDelay, setCrawlDelay] = useState("");

  const output = useMemo(
    () =>
      buildRobots({
        sitemap,
        disallow: disallowRaw.split("\n").map((s) => s.trim()).filter(Boolean),
        allow: allowRaw.split("\n").map((s) => s.trim()).filter(Boolean),
        userAgent,
        crawlDelay,
      }),
    [sitemap, disallowRaw, allowRaw, userAgent, crawlDelay]
  );

  function copy() {
    if (output) navigator.clipboard.writeText(output);
  }

  return (
    <div className="card max-w-3xl mx-auto p-4 sm:p-6 rounded border bg-white dark:bg-gray-900">
      <h2 className="text-xl font-semibold mb-1">{RobotsTxtValue.title}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{RobotsTxtValue.description}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        <input
          value={sitemap}
          onChange={(e) => setSitemap(e.target.value)}
          className="h-10 px-3 rounded border sm:col-span-2"
          placeholder="Sitemap URL"
        />
        <input
          value={userAgent}
          onChange={(e) => setUserAgent(e.target.value)}
          className="h-10 px-3 rounded border"
          placeholder="User-agent (e.g., *)"
        />
        <input
          value={crawlDelay}
          onChange={(e) => setCrawlDelay(e.target.value.replace(/\D/g, ""))}
          className="h-10 px-3 rounded border"
          placeholder="Crawl-delay (seconds)"
        />
        <textarea
          rows={5}
          value={disallowRaw}
          onChange={(e) => setDisallowRaw(e.target.value)}
          className="w-full rounded border p-2 sm:col-span-1"
          placeholder="/admin
/private"
        />
        <textarea
          rows={5}
          value={allowRaw}
          onChange={(e) => setAllowRaw(e.target.value)}
          className="w-full rounded border p-2 sm:col-span-1"
          placeholder="/public
/blog"
        />
      </div>

      <button
        onClick={copy}
        className="h-9 px-3 rounded bg-black text-white mb-2"
        disabled={!output}
      >
        Copy
      </button>

      <textarea
        readOnly
        rows={10}
        value={output}
        className="w-full rounded border p-2 font-mono text-sm bg-gray-50 dark:bg-gray-800"
      />
    </div>
  );
}
