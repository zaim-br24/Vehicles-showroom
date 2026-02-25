export default function Footer() {
  return (
    <footer className="bg-[rgb(28,28,26)] text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-10 text-center text-sm">
        <p>© {new Date().getFullYear()} MZ Trucks. All rights reserved.</p>
      </div>
    </footer>
  );
}
