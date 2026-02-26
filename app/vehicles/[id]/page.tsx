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
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-16">
      {/* MAIN IMAGE */}
      <div className="relative h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden flex items-center justify-center ">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt="vehicle"
            className="w-full h-full  object-contain object-center shadow-lg"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          />
        </AnimatePresence>
      </div>

      {/* THUMBNAILS */}
      <div className="mt-2 flex gap-1 justify-center flex-wrap">
        {images.map((img: string, index: number) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-15 h-15 sm:w-20 sm:h-20 rounded-md overflow-hidden border-2 transition-all duration-300 ${
              currentIndex === index
                ? "border-yellow-500 scale-105"
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

      {/* VEHICLE INFO */}
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {/* DESCRIPTION BOX */}
        <div className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold mb-4">Description</h2>
          <p className="text-gray-600 leading-relaxed">
            {vehicle.description?.en}
          </p>
        </div>

        {/* SPECS BOX */}
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
      </div>
    </div>
  );
}
