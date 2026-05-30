import { prisma } from "@/lib/prisma";

import { notFound } from "next/navigation";

import PostForm from "../../PostForm";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditPostPage({
  params,
}: Props) {
  const { id } = await params;

  const post =
    await prisma.post.findUnique({
      where: { id },
    });

  if (!post) {
    return notFound();
  }

  const categories =
    await prisma.category.findMany();

  return (
    <div className="min-h-screen bg-pink-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-pink-600">
            Chỉnh sửa bài viết
          </h1>
        </div>

        <PostForm
          categories={categories}
          post={post}
        />
      </div>
    </div>
  );
}