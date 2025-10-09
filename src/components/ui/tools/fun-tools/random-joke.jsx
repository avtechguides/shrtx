import React, { useState } from "react";

export const RandomJokeValue = {
  slug: "random-joke",
  title: "Random Joke",
  description: "Generate a random lightweight joke.",
  category: "Fun Tools",
  icon: "😂",
};

const JOKES = [
  "Why did the developer go broke? Because they used up all their cache.",
  "I would tell a UDP joke, but you might not get it.",
  "There are 10 kinds of people: those who understand binary and those who don’t.",
];

export default function RandomJoke() {
  const [joke, setJoke] = useState(JOKES[0]);

  function next() {
    const i = Math.floor(Math.random() * JOKES.length);
    setJoke(JOKES[i]);
  }

  return (
    <div className="card max-w-md mx-auto p-4 sm:p-6 rounded border bg-white dark:bg-gray-900">
      <h2 className="text-xl font-semibold mb-1">{RandomJokeValue.title}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{RandomJokeValue.description}</p>
      <div className="p-3 rounded border bg-gray-50 dark:bg-gray-800 mb-3" aria-live="polite">{joke}</div>
      <button onClick={next} className="h-9 px-3 rounded bg-black text-white">Another</button>
    </div>
  );
}
