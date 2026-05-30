"use client";

import { motion } from "framer-motion";

import Image from "next/image";

import Autoplay from "embla-carousel-autoplay";

import { Banner } from "@/app/generated/prisma/client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type Props = {
  banners: Banner[];
};

export default function HeroCarousel({
  banners,
}: Props) {
  if (banners.length === 0) {
    return null;
  }

  return (
    <section className="w-full">
      <motion.div
        initial={{
          opacity: 0,
          y: -40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="w-full"
      >
        <Carousel
          plugins={[
            Autoplay({
              delay: 4000,
              stopOnInteraction: true,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent>
            {banners.map(
              (banner, index) => (
                <CarouselItem
                  key={banner.id}
                >
                  <div className="relative w-full h-65 sm:h-85 md:h-105 lg:h-130 xl:h-155">
                    <Image
                      src={
                        banner.imageUrl
                      }
                      alt={
                        banner.title ||
                        `Banner ${index + 1}`
                      }
                      fill
                      priority={
                        index === 0
                      }
                      sizes="100vw"
                      className="object-cover"
                    />
                  </div>
                </CarouselItem>
              )
            )}
          </CarouselContent>

          <CarouselPrevious />

          <CarouselNext />
        </Carousel>
      </motion.div>
    </section>
  );
}