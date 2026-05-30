import { prisma } from "@/lib/prisma";

import Image from "next/image";

export default async function AdminDashboard() {
  const [
    totalServices,
    totalPosts,
    totalUsers,
    totalBanners,
    totalBookings,
    recentServices,
    recentPosts,
  ] = await Promise.all([
    prisma.service.count(),

    prisma.post.count(),

    prisma.user.count(),

    prisma.banner.count(),

    prisma.booking.count(),

    prisma.service.findMany({
      take: 5,

      orderBy: {
        createdAt: "desc",
      },
    }),

    prisma.post.findMany({
      take: 5,

      orderBy: {
        createdAt: "desc",
      },
    }),
  ]);

  return (
    <div className="space-y-6">
      {/* STATS */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-pink-100">
          <p className="text-sm text-gray-500">
            Total Services
          </p>

          <h3 className="text-3xl font-bold mt-2 text-pink-600">
            {totalServices}
          </h3>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-pink-100">
          <p className="text-sm text-gray-500">
            Total Posts
          </p>

          <h3 className="text-3xl font-bold mt-2 text-pink-600">
            {totalPosts}
          </h3>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-pink-100">
          <p className="text-sm text-gray-500">
            Total Users
          </p>

          <h3 className="text-3xl font-bold mt-2 text-pink-600">
            {totalUsers}
          </h3>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-pink-100">
          <p className="text-sm text-gray-500">
            Total Banners
          </p>

          <h3 className="text-3xl font-bold mt-2 text-pink-600">
            {totalBanners}
          </h3>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-pink-100">
          <p className="text-sm text-gray-500">
            Total Bookings
          </p>

          <h3 className="text-3xl font-bold mt-2 text-pink-600">
            {totalBookings}
          </h3>
        </div>
      </div>

      {/* RECENT DATA */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* RECENT SERVICES */}
        <div className="bg-white border border-pink-100 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-lg">
              Recent Services
            </h2>
          </div>

          <div className="space-y-4">
            {recentServices.map(
              (service) => (
                <div
                  key={service.id}
                  className="flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    {service.imageUrl && (
                      <Image
                        src={
                          service.imageUrl
                        }
                        alt={
                          service.title
                        }
                        width={60}
                        height={60}
                        className="w-14 h-14 rounded-xl object-cover"
                      />
                    )}

                    <div>
                      <p className="font-medium">
                        {
                          service.title
                        }
                      </p>

                      <p className="text-sm text-gray-500">
                        {service.price.toLocaleString()}
                        đ
                      </p>
                    </div>
                  </div>

                  {service.salePrice && (
                    <span className="text-pink-500 text-sm font-medium">
                      Sale{" "}
                      {service.salePrice.toLocaleString()}
                      đ
                    </span>
                  )}
                </div>
              )
            )}

            {recentServices.length ===
              0 && (
              <p className="text-gray-400 text-sm">
                Chưa có dịch vụ
              </p>
            )}
          </div>
        </div>

        {/* RECENT POSTS */}
        <div className="bg-white border border-pink-100 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-lg">
              Recent Posts
            </h2>
          </div>

          <div className="space-y-4">
            {recentPosts.map(
              (post) => (
                <div
                  key={post.id}
                  className="flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    {post.thumbnailUrl && (
                      <Image
                        src={
                          post.thumbnailUrl
                        }
                        alt={
                          post.title
                        }
                        width={60}
                        height={60}
                        className="w-14 h-14 rounded-xl object-cover"
                      />
                    )}

                    <div>
                      <p className="font-medium line-clamp-1">
                        {post.title}
                      </p>

                      <p className="text-sm text-gray-500">
                        {
                          post.slug
                        }
                      </p>
                    </div>
                  </div>

                  <span
                    className={`text-sm font-medium ${
                      post.published
                        ? "text-green-600"
                        : "text-gray-400"
                    }`}
                  >
                    {post.published
                      ? "Published"
                      : "Draft"}
                  </span>
                </div>
              )
            )}

            {recentPosts.length ===
              0 && (
              <p className="text-gray-400 text-sm">
                Chưa có bài viết
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}