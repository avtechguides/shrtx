import React, { useMemo, useState } from 'react';

export const EmojiTranslatorValue = {
  slug: 'emoji-translator',
  title: 'Emoji Translator',
  description: 'Replace words with matching emojis.',
  category: 'Fun Tools',
  icon: '😊',
};

const MAP = {
  love: '❤️',
  happy: '😊',
  fire: '🔥',
  money: '💰',
  star: '⭐',
  pizza: '🍕',
  coffee: '☕',
};

export default function EmojiTranslator() {
  const [input, setInput] = useState('I love coffee and pizza');

  const output = useMemo(() => {
    return input.replace(/\b([a-z]+)\b/gi, (w) => MAP[w.toLowerCase()] || w);
  }, [input]);

  return (
    <div className="card max-w-2xl mx-auto p-4 sm:p-6 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <h2 className="text-xl font-semibold mb-1">{EmojiTranslatorValue.title}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{EmojiTranslatorValue.description}</p>

      <label className="sr-only" htmlFor="emoji-input">Enter text</label>
      <textarea
        id="emoji-input"
        rows={5}
        className="w-full rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type here..."
      />

      <div className="mt-3 rounded border border-gray-300 dark:border-gray-700 p-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-mono">
        {output}
      </div>
    </div>
  );
}
