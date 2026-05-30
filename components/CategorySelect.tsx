/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

export default function CategorySelect({
  categories,
  selected,
  setSelected,
}: any) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const current =
    selected === "all"
      ? "Tất cả dịch vụ"
      : categories.find((c: any) => c.slug === selected)?.name;

  return (
    <div className="relative w-full sm:w-70" ref={ref}>
      {/* trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="
          w-full
          h-12
          rounded-2xl
          bg-white
          border
          border-gray-200
          px-4
          flex
          items-center
          justify-between
          shadow-sm
          hover:border-pink-300
          transition-all
          mb-2
        "
      >
        <span className="text-sm font-medium text-gray-700">
          {current}
        </span>

        <ChevronDown
          className={`
            w-4
            h-4
            text-gray-400
            transition-transform
            ${open ? "rotate-180" : ""}
          `}
        />
      </button>

      {/* dropdown */}
      <div
        className={`
          absolute
          top-[110%]
          left-0
          w-full
          rounded-2xl
          border
          border-gray-100
          bg-white/95
          backdrop-blur-xl
          shadow-2xl
          shadow-pink-100/40
          p-2
          z-50
          transition-all
          duration-200
          ${
            open
              ? "opacity-100 visible translate-y-0"
              : "opacity-0 invisible -translate-y-2"
          }
        `}
      >
        <button
          onClick={() => {
            setSelected("all");
            setOpen(false);
          }}
          className={`
            w-full
            h-11
            px-4
            rounded-xl
            flex
            items-center
            justify-between
            text-sm
            transition
            ${
              selected === "all"
                ? "bg-pink-50 text-pink-600"
                : "hover:bg-gray-50"
            }
          `}
        >
          Tất cả dịch vụ

          {selected === "all" && (
            <Check className="w-4 h-4" />
          )}
        </button>

        {categories.map((c: any) => (
          <button
            key={c.id}
            onClick={() => {
              setSelected(c.slug);
              setOpen(false);
            }}
            className={`
              w-full
              h-11
              px-4
              rounded-xl
              flex
              items-center
              justify-between
              text-sm
              transition
              ${
                selected === c.slug
                  ? "bg-pink-50 text-pink-600"
                  : "hover:bg-gray-50"
              }
            `}
          >
            {c.name}

            {selected === c.slug && (
              <Check className="w-4 h-4" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}