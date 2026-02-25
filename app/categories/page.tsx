interface Category {
  _id: string;
  name: { en: string };
}

export default async function CategoriesPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
    cache: "no-store",
  });

  const categories: Category[] = await res.json();

  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      <h1 className="text-4xl font-bold mb-16">All Categories</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {categories.map((cat) => (
          <a
            key={cat._id}
            href={`/categories/${cat._id}`}
            className="bg-[rgb(28,28,26)] text-white p-10 rounded-2xl hover:-translate-y-2 hover:shadow-2xl transition"
          >
            <h2 className="text-2xl font-semibold">{cat.name.en}</h2>
          </a>
        ))}
      </div>
    </div>
  );
}
