import React, { useMemo, useState } from "react";

export const PostSchedulerValue = {
  slug: "post-scheduler",
  title: "Post Scheduler",
  description: "Plan a post, see local and target timezone timestamps.",
  category: "Social Tools",
  icon: "🗓️",
};

const ZONES = ["UTC","Europe/London","Europe/Berlin","Asia/Kolkata","Asia/Tokyo","America/New_York","America/Los_Angeles","Australia/Sydney"];

function formatIn(date, tz) {
  try {
    return new Intl.DateTimeFormat(undefined, {
      timeZone: tz,
      year: "numeric", month: "2-digit", day: "2-digit",
      hour: "2-digit", minute: "2-digit", hour12: false
    }).format(date);
  } catch { return ""; }
}

export default function PostScheduler() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [targetZone, setTargetZone] = useState("UTC");
  const [dateStr, setDateStr] = useState(() => new Date().toISOString().slice(0,16)); // local datetime-local
  const localDate = useMemo(() => new Date(dateStr), [dateStr]);

  return (
    <div className="card max-w-2xl mx-auto p-4 sm:p-6 rounded border bg-white dark:bg-gray-900">
      <h2 className="text-xl font-semibold mb-1">{PostSchedulerValue.title}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{PostSchedulerValue.description}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        <input value={title} onChange={(e)=>setTitle(e.target.value)} className="h-10 px-3 rounded border" placeholder="Post title" />
        <select value={targetZone} onChange={(e)=>setTargetZone(e.target.value)} className="h-10 px-3 rounded border">
          {ZONES.map(z=><option key={z} value={z}>{z}</option>)}
        </select>
        <textarea rows={4} value={content} onChange={(e)=>setContent(e.target.value)} className="w-full rounded border p-2 sm:col-span-2" placeholder="Post content..." />
        <label className="flex flex-col">
          <span className="text-xs text-gray-500 mb-1">Local datetime</span>
          <input type="datetime-local" value={dateStr} onChange={(e)=>setDateStr(e.target.value)} className="h-10 px-3 rounded border" />
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
        <div className="p-2 rounded border bg-gray-50 dark:bg-gray-800">
          <div className="text-gray-600">Local time</div>
          <div className="font-mono">{formatIn(localDate, Intl.DateTimeFormat().resolvedOptions().timeZone)}</div>
        </div>
        <div className="p-2 rounded border bg-gray-50 dark:bg-gray-800">
          <div className="text-gray-600">Target time ({targetZone})</div>
          <div className="font-mono">{formatIn(localDate, targetZone)}</div>
        </div>
      </div>

      <p className="text-xs text-gray-500 mt-3">Note: This is a planner UI. Connect to a platform API to schedule publishing.</p>
    </div>
  );
}
