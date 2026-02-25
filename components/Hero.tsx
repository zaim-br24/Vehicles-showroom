"use client";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative bg-[rgb(28,28,26)] text-white h-[70vh] flex items-center justify-center">
      <div className="text-center px-6 md:px-0">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Find Your Perfect Truck
        </h1>
        <p className="text-xl md:text-2xl mb-8">
          Explore the best trucks in the market with MZ Trucks
        </p>
        <Link
          href="#categories"
          className="bg-[rgb(235,168,61)] text-black px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition"
        >
          Browse Categories
        </Link>
      </div>
      {/* Optional background zig-zag / wave shape */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-white -skew-y-2"></div>
    </section>
  );
}
