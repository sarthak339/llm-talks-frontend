'use client';

import React from 'react';

export default function MessageBubble({ from, model, message, time, align = 'left' }) {
  const isLeft = align === 'left';

  return (
    <div className={`flex ${isLeft ? 'justify-start' : 'justify-end'} my-4`}>
      <div
        className={`max-w-[70%] px-4 py-2 rounded-lg shadow-md ${
          isLeft ? 'bg-gray-200 text-black' : 'bg-blue-600 text-white'
        }`}
      >
        <div className="text-sm font-semibold mb-1">{from.toUpperCase()} ({model})</div>
        <div className="whitespace-pre-line">{message}</div>
        <div className="text-xs mt-1 text-right opacity-70">{time}</div>
      </div>
    </div>
  );
}
