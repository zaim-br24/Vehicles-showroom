"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function VehicleDetailsPage() {
  const params = useParams();
  const vehicleId = params.id;

  const [vehicle, setVehicle] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchVehicle = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/vehicles/${vehicleId}`,
      );
      const data = await res.json();
      console.log("Fetched vehicle:", data);
      setVehicle(data);
    };

    fetchVehicle();
  }, [vehicleId]);

  if (!vehicle) return <div className="p-10">Loading...</div>;

  const images = [
    vehicle.thumbnail?.url,
    ...(vehicle.gallery?.map((g: any) => g.url) || []),
  ].filter(Boolean);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-16">
      {/* 2 COLUMN LAYOUT */}
      <div className="grid gap-10 md:grid-cols-5">
        {/* LEFT SIDE (Images) */}
        <div className="md:col-span-3">
          {/* MAIN IMAGE */}
          <div className="relative h-[300px] sm:h-[400px] md:h-[450px] bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={images[currentIndex]}
                alt="vehicle"
                className="w-full h-full object-contain object-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            </AnimatePresence>
          </div>

          {/* THUMBNAILS */}
          <div className="mt-4  flex gap-2 flex-wrap">
            {images.map((img: string, index: number) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-[60px] h-[60px] min-w-[60px] min-h-[60px] rounded-md overflow-hidden border-2 transition ${
                  currentIndex === index
                    ? "border-yellow-500"
                    : "border-gray-300 hover:border-yellow-400"
                }`}
              >
                <img
                  src={img}
                  alt="thumbnail"
                  className="w-full h-full object-cover object-center"
                />
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE (Info Boxes Stacked) */}
        <div className="md:col-span-2 space-y-6">
          <h1 className="text-3xl font-bold ">{vehicle.title?.en}</h1>
          {/* DESCRIPTION */}
          <div className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold mb-4">Description</h2>
            <p className="text-gray-600 leading-relaxed">
              {vehicle.description?.en}
            </p>
          </div>

          {/* SPECS */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold mb-4">Specifications</h2>

            <div className="space-y-3 text-gray-700 text-sm">
              <div className="flex justify-between">
                <span className="font-medium">Year</span>
                <span>{vehicle.specs?.year}</span>
              </div>

              {vehicle.specs?.fuel && (
                <div className="flex justify-between">
                  <span className="font-medium">Fuel</span>
                  <span>{vehicle.specs.fuel}</span>
                </div>
              )}

              {vehicle.specs?.engine && (
                <div className="flex justify-between">
                  <span className="font-medium">Engine</span>
                  <span>{vehicle.specs.engine}</span>
                </div>
              )}
            </div>
          </div>

          {/* CONTACT CTA */}
          <div className="bg-[rgb(28,28,26)] text-white rounded-2xl p-8 shadow-xl text-center">
            <h2 className="text-xl font-bold mb-4">
              Interested in This Vehicle?
            </h2>

            <p className="text-gray-300 mb-6">
              Contact us for pricing and availability.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="tel:+1234567890"
                className="bg-[rgb(235,168,61)] text-black px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition"
              >
                📞 +1 234 567 890
              </a>

              <a
                href="mailto:info@mztrucks.com"
                className="border border-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-black transition"
              >
                ✉ info@mztrucks.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
