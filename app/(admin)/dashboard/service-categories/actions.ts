"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { generateUniqueSlug } from "@/lib/generateSlug";

export async function createServiceCategory(formData: FormData) {
  const name = formData.get("name") as string;
  if (!name) return;

  const slug = await generateUniqueSlug(name, "service-category");

  await prisma.serviceCategory.create({
    data: { name, slug },
  });

  revalidatePath("/dashboard/service-categories");
  redirect("/dashboard/service-categories");
}
export async function updateServiceCategory(formData: FormData) {
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;

  const category = await prisma.serviceCategory.findUnique({
    where: { id },
  });

  let slug = category?.slug;

  if (category?.name !== name) {
    slug = await generateUniqueSlug(name, "service-category");
  }

  await prisma.serviceCategory.update({
    where: { id },
    data: {
      name,
      slug,
    },
  });

  revalidatePath("/dashboard/service-categories");
  redirect("/dashboard/service-categories");
}
export async function deleteServiceCategory(formData: FormData) {
  const id = formData.get("id") as string;

  await prisma.serviceCategory.delete({
    where: { id },
  });

  revalidatePath("/dashboard/service-categories");
}
