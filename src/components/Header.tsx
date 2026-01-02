"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-yellow-300 shadow-lg py-4 relative z-50">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="hover:scale-105 transition">
          <Image
            src="/logo.png"
            alt="KitSavdo Logo"
            width={180}
            height={72}
            className="drop-shadow-md"
            priority
          />
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {["/", "/liked", "/cart"].map((href, i) => (
            <Link
              key={i}
              href={href}
              className="text-white font-semibold text-lg hover:text-yellow-100 transition hover:scale-110"
            >
              {["Bosh sahifa", "Sevimlilar", "Savat"][i]}
            </Link>
          ))}
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white text-3xl focus:outline-none"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <div className="md:hidden absolute top-full left-0 w-full bg-yellow-400 shadow-lg">
          <nav className="flex flex-col py-4">
            {[
              { href: "/", label: "Bosh sahifa" },
              { href: "/liked", label: "Sevimlilar" },
              { href: "/cart", label: "Savat" },
            ].map((item, i) => (
              <Link
                key={i}
                href={item.href}
                onClick={() => setOpen(false)}
                className="px-6 py-3 text-white font-semibold hover:bg-yellow-500 transition"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
