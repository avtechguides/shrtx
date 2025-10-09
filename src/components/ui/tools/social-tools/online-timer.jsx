import React, { useEffect, useRef, useState } from "react";

export const OnlineTimerValue = {
  slug: "online-timer",
  title: "Online Timer",
  description: "Start, pause, reset a stopwatch timer.",
  category: "Social Tools",
  icon: "⏱️",
};

function format(ms) {
  const m = Math.floor(ms / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  const cs = Math.floor((ms % 1000) / 10);
  return `${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}.${String(cs).padStart(2,"0")}`;
}

export default function OnlineTimer() {
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const startRef = useRef(0);
  const rafRef = useRef(0);

  useEffect(() => {
    function tick(t) {
      if (!startRef.current) startRef.current = t - elapsed;
      setElapsed(t - startRef.current);
      rafRef.current = requestAnimationFrame(tick);
    }
    if (running) {
      rafRef.current = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(rafRef.current);
    }
    return () => {};
  }, [running]);

  function onStart() {
    if (running) return;
    startRef.current = performance.now() - elapsed;
    setRunning(true);
  }
  function onPause() {
    setRunning(false);
    cancelAnimationFrame(rafRef.current);
  }
  function onReset() {
    setRunning(false);
    cancelAnimationFrame(rafRef.current);
    startRef.current = 0;
    setElapsed(0);
  }

  return (
    <div className="card max-w-sm mx-auto p-4 sm:p-6 rounded border bg-white dark:bg-gray-900">
      <h2 className="text-xl font-semibold mb-1">{OnlineTimerValue.title}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{OnlineTimerValue.description}</p>
      <div className="text-3xl font-mono text-center mb-4" aria-live="polite">{format(elapsed)}</div>
      <div className="flex gap-2 justify-center">
        <button onClick={onStart} className="h-9 px-3 rounded bg-black text-white" disabled={running}>Start</button>
        <button onClick={onPause} className="h-9 px-3 rounded bg-gray-100 border" disabled={!running}>Pause</button>
        <button onClick={onReset} className="h-9 px-3 rounded bg-gray-100 border">Reset</button>
      </div>
    </div>
  );
}
