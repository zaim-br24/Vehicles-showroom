"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Vehicle {
  _id: string;
  title: { en: string };
  thumbnail: { url: string };
  specs: { year: number };
}

export default function FeaturedVehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/vehicles`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        // Check if data is an array
        if (Array.isArray(data)) {
          setVehicles(data.slice(0, 6));
        } else if (Array.isArray(data.vehicles)) {
          // In case your API wraps vehicles in an object
          setVehicles(data.vehicles.slice(0, 6));
        } else {
          console.error("Unexpected vehicles data:", data);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="fade-in py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-16 text-center">
          certains de nos véhicules
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {vehicles.map((vehicle) => (
            <div
              key={vehicle._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 hover:-translate-y-2"
            >
              <img
                src={vehicle.thumbnail.url}
                className="h-60 w-full object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  {vehicle.title.en}
                </h3>
                <p className="text-gray-500 mb-6">Year: {vehicle.specs.year}</p>
                <Link
                  href={`/vehicles/${vehicle._id}`}
                  className="block w-full text-center py-3 bg-[rgb(235,168,61)] text-black rounded-xl font-semibold hover:opacity-90 transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
