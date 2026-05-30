"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { generateUniqueSlug } from "@/lib/generateSlug";

export async function createCategory(formData: FormData) {
  const name = formData.get("name") as string;
  if (!name) return;

  const slug = await generateUniqueSlug(name, "category");

  await prisma.category.create({
    data: { name, slug },
  });

  revalidatePath("/dashboard/categories");
  redirect("/dashboard/categories");
}
export async function updateCategory(formData: FormData) {
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;

  const category = await prisma.category.findUnique({
    where: { id },
  });

  let slug = category?.slug;

  if (category?.name !== name) {
    slug = await generateUniqueSlug(name, "category");
  }

  await prisma.category.update({
    where: { id },
    data: {
      name,
      slug,
    },
  });

  revalidatePath("/dashboard/categories");
  redirect("/dashboard/categories");
}
export async function deleteCategory(formData: FormData) {
  const id = formData.get("id") as string;

  await prisma.category.delete({
    where: { id },
  });

  revalidatePath("/dashboard/categories");
}
