"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-[rgb(28,28,26)] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-[rgb(235,168,61)]">
          MZ <span className="text-white">Trucks</span>
        </Link>

        <div className="hidden md:flex gap-6">
          <Link href="/" className="hover:text-[rgb(235,168,61)] transition">
            Accueil
          </Link>
          <Link
            href="/contact"
            className="hover:text-[rgb(235,168,61)] transition"
          >
            Contact
          </Link>
          <Link
            href="/about"
            className="hover:text-[rgb(235,168,61)] transition"
          >
            qui-sommes-nous?
          </Link>
        </div>

        {/* Mobile Menu */}
        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
          ☰
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[rgb(28,28,26)] px-6 py-4 flex flex-col gap-4">
          <Link href="/" className="hover:text-[rgb(235,168,61)] transition">
            Home
          </Link>
          <Link
            href="/contact"
            className="hover:text-[rgb(235,168,61)] transition"
          >
            Contact
          </Link>
          <Link
            href="/about"
            className="hover:text-[rgb(235,168,61)] transition"
          >
            Who We Are?
          </Link>
        </div>
      )}
    </nav>
  );
}
