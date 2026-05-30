"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

import { ServiceCategory } from "@/types";
import { Service } from "@/app/generated/prisma/client";
import CategorySelect from "./CategorySelect";

export default function ServicesFilter({
  categories,
}: {
  categories: ServiceCategory[];
}) {
  const [selected, setSelected] = useState("all");

  const filtered =
    selected === "all"
      ? categories
      : categories.filter((c) => c.slug === selected);

  return (
    <section className="py-20 overflow-hidden bg-gradient-to-b from-white via-pink-50/30 to-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <div className="flex items-center justify-center gap-3">
            <div className="h-[2px] w-10 bg-gradient-to-r from-transparent via-pink-400 to-transparent rounded-full" />
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-pink-500">
              Beauty Collection
            </span>
            <div className="h-[2px] w-10 bg-gradient-to-r from-transparent via-pink-400 to-transparent rounded-full" />
          </div>

          <h2 className="mt-5 text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Trải nghiệm{" "}
            <span className="text-pink-500 relative">
              dịch vụ
              <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-pink-200 rounded-full" />
            </span>{" "}
            làm đẹp
          </h2>

          <p className="mt-4 text-gray-500 text-sm md:text-base">
            Khám phá các liệu trình chăm sóc sắc đẹp chuyên sâu, giúp bạn thư
            giãn và tái tạo năng lượng.
          </p>
        </motion.div>

        {/* categories */}
        <div className="mb-10">
          <CategorySelect
            categories={categories}
            selected={selected}
            setSelected={setSelected}
          />
        </div>

        {/* services */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.flatMap((category, catIndex) =>
            category.services.slice(0, 4).map((service: Service, index) => (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: (catIndex + index) * 0.05,
                }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="
                  group
                  rounded-3xl
                  overflow-hidden
                  bg-white/80
                  backdrop-blur-xl
                  border border-gray-100
                  hover:border-pink-200
                  shadow-sm
                  hover:shadow-2xl
                  hover:shadow-pink-200/30
                  transition-all
                  duration-300
                "
              >
                {/* image */}
                <div className="relative overflow-hidden">
                  {service.imageUrl ? (
                    <Image
                      src={service.imageUrl}
                      alt={service.title}
                      width={400}
                      height={250}
                      className="
                        w-full
                        h-44
                        object-cover
                        group-hover:scale-110
                        transition-transform
                        duration-700
                      "
                    />
                  ) : (
                    <div className="relative h-44 bg-gradient-to-br from-pink-100 via-rose-50 to-purple-100 flex items-center justify-center">
                      <div className="absolute -top-10 -left-10 w-28 h-28 bg-pink-300/40 rounded-full blur-3xl" />
                      <div className="absolute bottom-0 right-0 w-28 h-28 bg-purple-300/40 rounded-full blur-3xl" />

                      <div className="relative z-10 text-center">
                        <div className="w-14 h-14 mx-auto rounded-2xl bg-white/70 backdrop-blur-xl flex items-center justify-center shadow-lg">
                          <Sparkles className="w-7 h-7 text-pink-500" />
                        </div>
                        <p className="mt-3 font-semibold text-gray-700 line-clamp-1">
                          {service.title}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* discount */}
                  {service.discountPercent && (
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xl text-pink-600 text-xs font-semibold px-3 py-1 rounded-full shadow">
                      -{service.discountPercent}%
                    </span>
                  )}
                </div>

                {/* content */}
                <div className="p-5 flex flex-col">
                  <h3 className="font-semibold text-gray-900 text-[17px] line-clamp-1">
                    {service.title}
                  </h3>

                  {service.description && (
                    <p className="text-sm text-gray-500 mt-2 line-clamp-2 min-h-[40px]">
                      {service.description}
                    </p>
                  )}

                  {/* price */}
                  <div className="flex items-center gap-2 mt-4">
                    {service.salePrice || service.salePrice === 0 ? (
                      <>
                        <span className="text-lg font-bold text-pink-600">
                          {service.salePrice.toLocaleString()}đ
                        </span>
                        <span className="text-xs text-gray-400 line-through">
                          {service.price.toLocaleString()}đ
                        </span>
                      </>
                    ) : (
                      <span className="text-lg font-bold text-gray-900">
                        {service.price.toLocaleString()}đ
                      </span>
                    )}
                  </div>

                  {/* CTA */}
                  <Link
                    href={`/dich-vu/${service.slug}/dat-lich`}
                    className="
                      mt-5
                      w-full
                      h-11
                      inline-flex
                      items-center
                      justify-center
                      rounded-2xl
                      bg-gradient-to-r
                      from-pink-500
                      to-rose-500
                      text-white
                      text-sm
                      font-medium
                      hover:shadow-lg
                      hover:shadow-pink-300/40
                      transition-all
                      duration-300
                    "
                  >
                    Xem chi tiết
                  </Link>
                </div>
              </motion.article>
            ))
          )}
        </div>

        {/* mobile button */}
        <div className="flex justify-center mt-12 sm:hidden">
          <Link
            href="/dich-vu"
            className="inline-flex items-center justify-center h-11 px-6 rounded-full bg-pink-100 text-pink-600 font-medium hover:bg-pink-200 transition"
          >
            Xem tất cả dịch vụ
          </Link>
        </div>
      </div>
    </section>
  );
}