"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";

type NavItem = {
  href: string;
  label: string;
};

export default function HeaderClient({
  navItems,
}: {
  navItems: NavItem[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex items-center gap-4">
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-2 bg-white
       
        hover:bg-gray-50 cursor-pointer p-2  transition"
        >
          <Menu />
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 bg-white border-t shadow-lg md:hidden"
        >
          <nav className="max-w-7xl mx-auto px-6 py-6">
            <ul className="flex flex-col gap-5 text-sm font-semibold text-neutral-700">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="hover:text-rose-500 transition"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </motion.div>
      )}
    </>
  );
}