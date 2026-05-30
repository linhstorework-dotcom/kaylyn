import Link from "next/link";

import { prisma } from "@/lib/prisma";

import PostsTable from "./PostsTable";
import Pagination from "@/components/Pagination";

const PAGE_SIZE = 5;

type Props = {
  searchParams: Promise<{
    page?: string;
  }>;
};

export default async function PostsPage({
  searchParams,
}: Props) {
  const params = await searchParams;

  const page = Number(params?.page) || 1;

  const totalPosts =
    await prisma.post.count();

  const posts =
    await prisma.post.findMany({
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
    totalPosts / PAGE_SIZE
  );

  return (
    <div className="min-h-screen bg-pink-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-pink-600">
              Quản lý bài viết
            </h1>

            <p className="text-gray-500 mt-1">
              Blog CMS Dashboard
            </p>
          </div>

          <Link
            href="/dashboard/posts/create"
            className="bg-pink-500 hover:bg-pink-600 transition text-white px-5 py-3 rounded-xl text-center"
          >
            + Tạo bài viết
          </Link>
        </div>

        <PostsTable posts={posts} />

        <div className="mt-8">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
}