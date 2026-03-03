import React from 'react'

export default function loader() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      <h1 className="text-4xl font-bold mb-16">All Categories</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {Array.from({ length: 4 }).map((_,i) => (
          <a
            key={i}
            href={`/categories/${i}`}
            className="bg-[rgb(28,28,26)] text-white p-10 rounded-2xl hover:-translate-y-2 hover:shadow-2xl transition"
          >
            <h2 className="text-2xl font-semibold">Category {i + 1}</h2>
          </a>
        ))}
      </div>
    </div>
  );
}
