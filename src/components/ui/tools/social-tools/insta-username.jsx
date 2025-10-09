import React, { useMemo, useState } from 'react';

export const InstaUsernameValue = {
  slug: 'insta-username',
  title: 'Instagram Username Checker',
  description: 'Check if an Instagram username format is valid and generate ideas.',
  category: 'Social Tools',
  icon: '📸',
};

function valid(u) {
  return /^[a-zA-Z0-9._]{1,30}$/.test(u);
}

const ADJ = ['cool', 'urban', 'daily', 'artsy', 'wander', 'vivid', 'cozy', 'retro'];
const NOUN = ['vibes', 'studio', 'journey', 'pixels', 'stories', 'threads', 'frames', 'notes'];

export default function InstaUsername() {
  const [name, setName] = useState('');
  const ok = useMemo(() => valid(name), [name]);
  const [suggestions, setSuggestions] = useState([]);

  function suggest() {
    const out = [];
    for (let i = 0; i < 10; i++) {
      const adj = ADJ[Math.floor(Math.random() * ADJ.length)];
      const noun = NOUN[Math.floor(Math.random() * NOUN.length)];
      const num = Math.floor(Math.random() * 100);
      out.push(`${adj}.${noun}${num}`);
    }
    setSuggestions(out);
  }

  return (
    <div className="card max-w-xl mx-auto p-4 sm:p-6 rounded border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <h2 className="text-xl font-semibold mb-1">{InstaUsernameValue.title}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{InstaUsernameValue.description}</p>

      <label className="sr-only" htmlFor="insta-username-input">Instagram username</label>
      <input
        id="insta-username-input"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="h-10 px-3 rounded border w-full mb-2
                   border-gray-300 dark:border-gray-700
                   bg-white dark:bg-gray-900
                   text-gray-900 dark:text-gray-100
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="username"
        inputMode="latin"
        autoComplete="off"
      />

      <div className={`text-sm ${name ? (ok ? 'text-green-600' : 'text-red-600') : 'text-gray-500 dark:text-gray-400'}`}>
        {name
          ? ok
            ? 'Looks valid.'
            : 'Only letters, numbers, dot, underscore; up to 30 chars.'
          : 'Enter a username to validate.'}
      </div>

      <button
        type="button"
        onClick={suggest}
        className="mt-3 h-9 px-3 rounded bg-black text-white
                   hover:opacity-90 active:opacity-80
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Suggest
      </button>

      {!!suggestions.length && (
        <ul className="mt-3 text-sm space-y-1">
          {suggestions.map((s, i) => (
            <li key={i} className="font-mono">{s}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
