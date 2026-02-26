"use client";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-[75vh] flex items-center justify-center text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/hero-truck.jpg" // <-- put your image in /public
          alt="Hero Background"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 md:px-0 max-w-3xl">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
          MACHINES <span className=" text-[rgb(235,168,61)] ">D’OCCASION.</span>
        </h1>

        <p className="text-xl md:text-1xl mb-8 text-gray-200">
          Notre société vous propose une sélection de machines d’occasion BTP
          toutes marques confondues, à prix compétitifs.
        </p>
        <Link
          href="#categories"
          className="bg-[rgb(235,168,61)] text-black px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition"
        >
          Découvrez les véhicules
        </Link>
      </div>

      {/* Bottom Skew Shape */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-white -skew-y-2"></div>
    </section>
  );
}
