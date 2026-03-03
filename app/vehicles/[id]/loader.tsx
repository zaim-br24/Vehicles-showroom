import React from 'react'

export default function loader() {
  
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 animate-pulse">
      <div className="grid gap-10 md:grid-cols-5">
        {/* LEFT SIDE */}
        <div className="md:col-span-3">
          {/* Main Image Skeleton */}
          <div className="h-[300px] sm:h-[400px] md:h-[450px] bg-gray-200 rounded-xl" />

          {/* Thumbnails Skeleton */}
          <div className="mt-4 flex gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="w-[60px] h-[60px] bg-gray-200 rounded-md"
              />
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="md:col-span-2 space-y-6">
          {/* Title */}
          <div className="h-8 w-3/4 bg-gray-200 rounded" />

          {/* Description Box */}
          <div className="bg-gray-100 rounded-xl p-6 space-y-3">
            <div className="h-6 w-1/3 bg-gray-200 rounded" />
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-4 w-5/6 bg-gray-200 rounded" />
          </div>

          {/* Specs Box */}
          <div className="bg-gray-100 rounded-xl p-6 space-y-4">
            <div className="h-6 w-1/3 bg-gray-200 rounded" />
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-4 w-full bg-gray-200 rounded" />
          </div>

          {/* CTA Box */}
          <div className="bg-gray-300 rounded-2xl p-8 space-y-4">
            <div className="h-6 w-1/2 bg-gray-200 rounded mx-auto" />
            <div className="h-4 w-3/4 bg-gray-200 rounded mx-auto" />
            <div className="flex gap-4 justify-center mt-4">
              <div className="h-10 w-32 bg-gray-200 rounded-xl" />
              <div className="h-10 w-32 bg-gray-200 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
  

