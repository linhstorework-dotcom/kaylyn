import Link from "next/link";
import Image from "next/image";

import { prisma } from "@/lib/prisma";

import { deleteService } from "./actions";

import Pagination from "@/components/Pagination";

const PAGE_SIZE = 5;

type Props = {
  searchParams: Promise<{
    page?: string;
  }>;
};

export default async function ServicesPage({
  searchParams,
}: Props) {
  const params = await searchParams;

  const page = Number(params?.page) || 1;

  const totalServices =
    await prisma.service.count();

  const services =
    await prisma.service.findMany({
      include: {
        category: true,
      },

      orderBy: {
        createdAt: "desc",
      },

      skip: (page - 1) * PAGE_SIZE,

      take: PAGE_SIZE,
    });

  const totalPages = Math.ceil(
    totalServices / PAGE_SIZE
  );
  console.log("Total Pages:", totalPages);

  return (
    <div className="min-h-screen bg-pink-50">
      <div className="max-w-6xl mx-auto p-4 md:p-6 lg:p-10">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-pink-600">
              Quản lý Services
            </h1>

            <p className="text-gray-500 mt-1 text-sm md:text-base">
              Quản lý toàn bộ dịch vụ
            </p>
          </div>

          <Link
            href="/dashboard/services/create"
            className="bg-pink-500 hover:bg-pink-600 text-white px-5 py-3 rounded-xl text-center transition"
          >
            + Tạo dịch vụ
          </Link>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-2xl border border-pink-100 shadow-sm overflow-hidden">
          {/* HEADER */}
          <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b bg-pink-50 text-sm font-semibold text-gray-600">
            <div className="col-span-5">
              Dịch vụ
            </div>

            <div className="col-span-2">
              Giá
            </div>

            <div className="col-span-2">
              Sale
            </div>

            <div className="col-span-1">
              Time
            </div>

            <div className="col-span-2 text-right">
              Actions
            </div>
          </div>

          {/* BODY */}
          {services.map((s) => (
            <div
              key={s.id}
              className="
                p-4 border-b last:border-none
                md:grid md:grid-cols-12 md:gap-4 md:items-center
              "
            >
              {/* SERVICE */}
              <div className="md:col-span-5 flex gap-4">
                {s.imageUrl && (
                  <Image
                    src={s.imageUrl}
                    alt={s.title}
                    width={70}
                    height={70}
                    className="w-17.5 h-17.5 rounded-xl object-cover shrink-0"
                  />
                )}

                <div className="min-w-0 flex-1">
                  <p className="font-semibold truncate">
                    {s.title}
                  </p>

                  <p className="text-sm text-gray-500 line-clamp-2 md:line-clamp-1">
                    {s.description}
                  </p>

                  {s.category && (
                    <p className="text-xs text-pink-500 mt-1">
                      {s.category.name}
                    </p>
                  )}

                  {/* MOBILE INFO */}
                  <div className="mt-3 space-y-1 text-sm text-gray-600 md:hidden">
                    <p>
                      Giá:{" "}
                      <span className="font-medium">
                        {s.price.toLocaleString()}
                        đ
                      </span>
                    </p>

                    <p>
                      Sale:{" "}
                      <span className="text-pink-500 font-medium">
                        {s.salePrice
                          ? `${s.salePrice.toLocaleString()}đ`
                          : "-"}
                      </span>
                    </p>

                    <p>
                      Time: {s.duration || 0}m
                    </p>
                  </div>
                </div>
              </div>

              {/* DESKTOP PRICE */}
              <div className="hidden md:block md:col-span-2 font-medium">
                {s.price.toLocaleString()}đ
              </div>

              {/* DESKTOP SALE */}
              <div className="hidden md:block md:col-span-2">
                {s.salePrice ? (
                  <span className="text-pink-500 font-medium">
                    {s.salePrice.toLocaleString()}
                    đ
                  </span>
                ) : (
                  "-"
                )}
              </div>

              {/* DESKTOP TIME */}
              <div className="hidden md:block md:col-span-1 text-sm text-gray-500">
                {s.duration || 0}m
              </div>

              {/* ACTIONS */}
              <div className="md:col-span-2 flex gap-2 mt-4 md:mt-0 md:justify-end">
                <Link
                  href={`/dashboard/services/${s.id}/edit`}
                  className="flex-1 md:flex-none text-center px-3 py-2 bg-pink-100 hover:bg-pink-200 text-pink-600 rounded-lg text-sm transition"
                >
                  Edit
                </Link>

                <form
                  className="flex-1 md:flex-none"
                  action={async () => {
                    "use server";

                    await deleteService(
                      s.id
                    );
                  }}
                >
                  <button className="w-full px-3 py-2 bg-red-100 hover:bg-red-200 text-red-500 rounded-lg text-sm transition">
                    Delete
                  </button>
                </form>
              </div>
            </div>
          ))}

          {/* EMPTY */}
          {services.length === 0 && (
            <div className="py-20 text-center text-gray-400">
              Chưa có dịch vụ nào
            </div>
          )}
        </div>

        {/* PAGINATION */}
        <div className="mt-8">
          <Pagination
            totalPages={totalPages}
          />
        </div>
      </div>
    </div>
  );
}