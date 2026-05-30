import Link from "next/link";

import { prisma } from "@/lib/prisma";

import BannerCard from "./BannerCard";
import Pagination from "@/components/Pagination";

const PAGE_SIZE = 6;

type Props = {
  searchParams: Promise<{
    page?: string;
  }>;
};

export default async function BannersPage({
  searchParams,
}: Props) {
  const params = await searchParams;

  const page = Number(params?.page) || 1;

  const totalBanners =
    await prisma.banner.count();

  const banners =
    await prisma.banner.findMany({
      orderBy: {
        createdAt: "desc",
      },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    });

  const totalPages = Math.ceil(
    totalBanners / PAGE_SIZE
  );

  return (
    <div className="min-h-screen bg-pink-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-pink-600">
              Banner Manager
            </h1>

            <p className="text-gray-500 mt-1">
              Quản lý banner trang chủ
            </p>
          </div>

          <Link
            href="/dashboard/banners/create"
            className="bg-pink-500 hover:bg-pink-600 transition text-white px-5 py-3 rounded-xl text-center"
          >
            + Thêm Banner
          </Link>
        </div>

        {banners.length === 0 ? (
          <div className="bg-white rounded-2xl p-20 text-center text-gray-400 border border-pink-100">
            Chưa có banner nào
          </div>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {banners.map((banner) => (
                <BannerCard
                  key={banner.id}
                  banner={banner}
                />
              ))}
            </div>

            <div className="mt-8">
              <Pagination totalPages={totalPages} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}