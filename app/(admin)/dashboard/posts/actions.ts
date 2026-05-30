"use server";
import cloudinary from "@/lib/cloudinary";
import { generateUniqueSlug } from "@/lib/generateSlug";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export type FAQ = {
  question: string;
  answer: string;
};

export type PostData = {
  title: string;
  slug?: string;
  excerpt?: string;

  content?: string;

  thumbnailUrl?: string;

  thumbnailId?: string;

  categoryId?: string;

  published: boolean;

  keywords?: string;

  faq: FAQ[];

  authorId?: string;
};

export async function createPost(data: PostData) {
  const slug = await generateUniqueSlug(data.title, "post");
  data.slug = slug;
  const cleanData = {
    title: data.title,
    slug,
    excerpt: data.excerpt ?? null,
    content: data.content ?? null,
    thumbnailUrl: data.thumbnailUrl ?? null,
    thumbnailId: data.thumbnailId ?? null,
    categoryId: data.categoryId ?? null,
    published: data.published,
    keywords: data.keywords ?? null,
    faq: data.faq,
    authorId: data.authorId ?? null,
  };
  await prisma.post.create({
    data: cleanData,
  });

  revalidatePath("/dashboard/posts");
}

export async function updatePost(id: string, data: PostData) {
  const oldPost = await prisma.post.findUnique({
    where: { id },
  });

  if (oldPost?.title !== data.title) {
    const slug = await generateUniqueSlug(data.title, "post");
    data.slug = slug;
  }
  if (oldPost?.thumbnailId && oldPost.thumbnailId !== data.thumbnailId) {
    await cloudinary.uploader.destroy(oldPost.thumbnailId);
  }

  await prisma.post.update({
    where: { id },
    data,
  });

  revalidatePath("/dashboard/posts");
}

export async function deletePost(id: string) {
  const post = await prisma.post.findUnique({
    where: { id },
  });
  if (post?.thumbnailId) {
    await cloudinary.uploader.destroy(post.thumbnailId);
  }

  await prisma.post.delete({
    where: { id },
  });

  revalidatePath("/dashboard/posts");
}
