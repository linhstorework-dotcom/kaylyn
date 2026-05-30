import Link from "next/link";

import Image from "next/image";

import { Post } from "@/app/generated/prisma/client";

import { deletePost } from "./actions";

type Category = {
  id: string;
  name: string;
};

type PostWithCategory = Post & {
  category?: Category | null;
};

type Props = {
  posts: PostWithCategory[];
};

export default function PostsTable({
  posts,
}: Props) {
  return (
    <div className="bg-white rounded-2xl border border-pink-100 shadow-sm overflow-hidden">
      <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b bg-pink-50 text-sm font-semibold text-gray-600">
        <div className="col-span-4">
          Bài viết
        </div>

        <div className="col-span-2">
          Thumbnail
        </div>

        <div className="col-span-2">
          Category
        </div>

        <div className="col-span-2">
          Status
        </div>

        <div className="col-span-2 text-right">
          Actions
        </div>
      </div>

      {posts.map((post) => (
        <div
          key={post.id}
          className="p-4 border-b last:border-none md:grid md:grid-cols-12 md:gap-4 md:items-center"
        >
          <div className="md:col-span-4">
            <p className="font-semibold">
              {post.title}
            </p>

            <p className="text-sm text-gray-500 line-clamp-1">
              {post.slug}
            </p>
          </div>

          <div className="md:col-span-2 mt-3 md:mt-0">
            {post.thumbnailUrl && (
              <Image
                src={post.thumbnailUrl}
                alt={post.title}
                width={90}
                height={60}
                className="rounded-lg object-cover"
              />
            )}
          </div>

          <div className="md:col-span-2 mt-3 md:mt-0">
            {post.category?.name ||
              "—"}
          </div>

          <div className="md:col-span-2 mt-3 md:mt-0">
            {post.published ? (
              <span className="text-green-600 font-medium">
                Published
              </span>
            ) : (
              <span className="text-gray-400">
                Draft
              </span>
            )}
          </div>

          <div className="md:col-span-2 flex gap-2 mt-4 md:mt-0 md:justify-end">
            <Link
              href={`/dashboard/posts/${post.id}/edit`}
              className="px-3 py-2 bg-pink-100 hover:bg-pink-200 text-pink-600 rounded-lg text-sm"
            >
              Edit
            </Link>

            <form
              action={async () => {
                "use server";

                await deletePost(
                  post.id
                );
              }}
            >
              <button className="px-3 py-2 bg-red-100 hover:bg-red-200 text-red-500 rounded-lg text-sm">
                Delete
              </button>
            </form>
          </div>
        </div>
      ))}

      {posts.length === 0 && (
        <div className="py-20 text-center text-gray-400">
          Chưa có bài viết
        </div>
      )}
    </div>
  );
}