'use client';

export default function TypingDots({ align = 'left' }) {
  const isLeft = align === 'left';

  return (
    <div className={`flex ${isLeft ? 'justify-start' : 'justify-end'} my-2`}>
      <div
        className={`px-3 py-2 rounded-xl flex gap-1 shadow-sm ${
          isLeft ? 'bg-gray-300' : 'bg-blue-400'
        }`}
      >
        {[...Array(4)].map((_, idx) => (
          <div
            key={idx}
            className={`w-2 h-2 rounded-full ${
              idx % 2 === 0 ? 'bg-white' : 'bg-gray-200'
            } animate-bounce`}
            style={{ animationDelay: `${idx * 0.2}s` }}
          ></div>
        ))}
      </div>
    </div>
  );
}
