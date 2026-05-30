import { prisma } from "@/lib/prisma";

import HeroCarousel from "./HeroCarousel";

export default async function Hero() {
  const banners =
    await prisma.banner.findMany({
      where: {
        active: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });

  return (
    <HeroCarousel banners={banners} />
  );
}