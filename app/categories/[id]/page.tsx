"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface Vehicle {
  _id: string;
  title: { en: string };
  thumbnail: { url: string };
  specs: { year: number };
  category: { _id: string; name: { en: string } };
}

interface Category {
  _id: string;
  name: { en: string };
}

export default function CategoryDetailsPage() {
  const params = useParams();
  const categoryId = params.id;

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [category, setCategory] = useState<Category | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch category info
        const catRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/categories/${categoryId}`,
        );
        const catData: Category = await catRes.json();
        setCategory(catData);

        // Fetch all vehicles
        const vehRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/vehicles`,
        );
        const vehData = await vehRes.json();

        // Unwrap data if API returns object instead of array
        const vehiclesArray: Vehicle[] = Array.isArray(vehData)
          ? vehData
          : Array.isArray(vehData.vehicles)
            ? vehData.vehicles
            : [];

        // Filter vehicles by category
        const filtered = vehiclesArray.filter(
          (v) => v.category._id === categoryId,
        );
        setVehicles(filtered);
      } catch (err) {
        console.error("Error fetching category or vehicles:", err);
      }
    };

    fetchData();
  }, [categoryId]);

  if (!category) return <p className="p-6">Loading category...</p>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-12">{category.name.en} Trucks</h1>

      {vehicles.length === 0 && (
        <p className="text-gray-500">No vehicles found in this category.</p>
      )}

      <div className="grid md:grid-cols-3 gap-8 mt-8">
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
              <h3 className="text-xl font-semibold mb-2">{vehicle.title.en}</h3>
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
  );
}
