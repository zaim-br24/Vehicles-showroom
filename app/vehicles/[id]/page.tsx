"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

interface Vehicle {
  _id: string;
  title: { en: string };
  description?: { en: string };
  thumbnail: { url: string };
  gallery: { url: string }[];
  specs: { year: number; fuel?: string; engine?: string };
  category: { _id: string; name: { en: string } };
}

export default function VehicleDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const vehicleId = params.id;

  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/vehicles/${vehicleId}`,
        );
        const data: Vehicle = await res.json();
        setVehicle(data);
      } catch (err) {
        console.error("Error fetching vehicle:", err);
      }
    };
    fetchVehicle();
  }, [vehicleId]);

  if (!vehicle) return <p className="p-6">Loading vehicle details...</p>;

  const images = [vehicle.thumbnail.url, ...vehicle.gallery.map((g) => g.url)];

  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      <button
        onClick={() => router.back()}
        className="mb-8 text-[rgb(28,28,26)] font-semibold hover:underline"
      >
        ← Back
      </button>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Left: Gallery */}
        <div className="flex flex-col items-center">
          {/* Main Image */}
          <div className="w-full md:w-[28rem] h-[28rem] mb-4 rounded-2xl overflow-hidden shadow-lg">
            <img
              src={images[currentIndex]}
              alt={vehicle.title.en}
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Thumbnails */}
          <div className="flex gap-4 overflow-x-auto">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition ${
                  currentIndex === idx
                    ? "border-[rgb(235,168,61)]"
                    : "border-gray-300 hover:border-[rgb(235,168,61)]"
                }`}
              >
                <img
                  src={img}
                  alt={`${vehicle.title.en} ${idx}`}
                  className="w-full h-full object-cover object-center"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Vehicle Details */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {vehicle.title.en}
            </h1>
            <p className="text-gray-700 mb-6">{vehicle.description?.en}</p>

            <div className="mb-6 bg-gray-50 p-6 rounded-2xl shadow-inner">
              <h2 className="text-2xl font-semibold mb-4 text-[rgb(28,28,26)]">
                Vehicle Specs
              </h2>
              <ul className="space-y-2 text-gray-800">
                <li>
                  <span className="font-semibold">Year:</span>{" "}
                  {vehicle.specs.year}
                </li>
                {vehicle.specs.fuel && (
                  <li>
                    <span className="font-semibold">Fuel:</span>{" "}
                    {vehicle.specs.fuel}
                  </li>
                )}
                {vehicle.specs.engine && (
                  <li>
                    <span className="font-semibold">Engine:</span>{" "}
                    {vehicle.specs.engine}
                  </li>
                )}
                <li>
                  <span className="font-semibold">Category:</span>{" "}
                  {vehicle.category.name.en}
                </li>
              </ul>
            </div>
          </div>

          <Link
            href={`/categories/${vehicle.category._id}`}
            className="mt-6 w-full py-3 bg-[rgb(235,168,61)] text-black text-center font-semibold rounded-xl hover:opacity-90 transition"
          >
            More in {vehicle.category.name.en}
          </Link>
        </div>
      </div>
    </div>
  );
}
