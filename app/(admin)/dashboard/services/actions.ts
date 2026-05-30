"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

import cloudinary from "@/lib/cloudinary";
import { generateUniqueSlug } from '@/lib/generateSlug';
import { Service } from "@/app/generated/prisma/client";

type ServiceData = {
  title: string;
  description?: string;
  slug?: string;
  price: number;
  salePrice?: number;
  discountPercent?: number;

  duration?: number;

  categoryId?: string;

  imageUrl?: string;
  imageId?: string;
};

export async function createService(
  data: Service
) {
  const title = data.title;
    if (!title) return;
  
    const slug = await generateUniqueSlug(title, "service");
    data.slug = slug;
  await prisma.service.create({
    data
  });

  revalidatePath("/dashboard/services");
}

export async function updateService(
  id: string,
  data: Service & ServiceData
) {
  const oldService =
    await prisma.service.findUnique({
      where: { id },
    });

  if(oldService?.title !== data.title) {
    const slug = await generateUniqueSlug(data.title, "service");
    data.slug = slug;
  }

  

  // nếu đổi ảnh mới => xóa ảnh cũ
  if (
    oldService?.imageId &&
    oldService.imageId !== data.imageId
  ) {
    await cloudinary.uploader.destroy(
      oldService.imageId
    );
  }

  await prisma.service.update({
    where: { id },
    data,
  });

  revalidatePath("/dashboard/services");
}

export async function deleteService(
  id: string
) {
  const service =
    await prisma.service.findUnique({
      where: { id },
    });

  if (service?.imageId) {
    await cloudinary.uploader.destroy(
      service.imageId
    );
  }

  await prisma.service.delete({
    where: { id },
  });

  revalidatePath("/dashboard/services");
}