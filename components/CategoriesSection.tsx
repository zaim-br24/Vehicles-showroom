"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Category {
  _id: string;
  name: { en: string };
  image: { url: string };
}

export default function CategoriesSection() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section id="categories" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12 text-center">Nos véhicules</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <Link key={cat._id} href={`/categories/${cat._id}`}>
              <div className="relative overflow-hidden rounded-2xl cursor-pointer shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300">
                <img
                  src={cat.image.url}
                  className="w-full h-50 object-cover brightness-75"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-xl font-semibold text-white">
                    {cat.name.en}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
