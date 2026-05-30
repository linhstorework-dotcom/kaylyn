"use server";

import { prisma } from "@/lib/prisma";

import { revalidatePath } from "next/cache";

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name:
    process.env.CLOUDINARY_CLOUD_NAME,

  api_key:
    process.env.CLOUDINARY_API_KEY,

  api_secret:
    process.env.CLOUDINARY_API_SECRET,
});

type BannerData = {
  title?: string;

  imageUrl: string;

  imageId: string;

  active: boolean;
};

export async function createBanner(
  data: BannerData
) {
  await prisma.banner.create({
    data,
  });

  revalidatePath("/dashboard/banners");
}

export async function toggleBanner(
  id: string
) {
  const banner =
    await prisma.banner.findUnique({
      where: { id },
    });

  if (!banner) return;

  await prisma.banner.update({
    where: { id },

    data: {
      active: !banner.active,
    },
  });

  revalidatePath("/dashboard/banners");
}

export async function deleteBanner(
  id: string
) {
  const banner =
    await prisma.banner.findUnique({
      where: { id },
    });

  if (!banner) return;

  await cloudinary.uploader.destroy(
    banner.imageId
  );

  await prisma.banner.delete({
    where: { id },
  });

  revalidatePath("/dashboard/banners");
}