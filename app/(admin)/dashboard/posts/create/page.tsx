import { prisma } from "@/lib/prisma";

import PostForm from "../PostForm";

export default async function CreatePostPage() {
  const categories =
    await prisma.category.findMany();

  return (
    <div className="min-h-screen bg-pink-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-pink-600">
            Tạo bài viết
          </h1>

          <p className="text-gray-500 mt-1">
            Blog editor
          </p>
        </div>

        <PostForm
          categories={categories}
        />
      </div>
    </div>
  );
}