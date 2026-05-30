"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  Gem,
  HeartHandshake,
} from "lucide-react";

const promoText =
  "KAYLYN SPA • ƯU ĐÃI VIP 💎 CHẠM TỚI VẺ ĐẸP TINH TẾ • 50 SUẤT ĐẶC QUYỀN DÀNH RIÊNG CHO KHÁCH HÀNG KHU VỰC";

export default function PromoMarquee() {
  return (
    <section className="relative overflow-hidden bg-linear-to-r from-[#7F0D34] via-[#a01248] to-[#7F0D34] border-y border-white/10">
      {/* Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),transparent_60%)]" />

      {/* Blur circles */}
      <div className="absolute -top-10 left-10 w-32 h-32 bg-pink-400/20 blur-3xl rounded-full" />

      <div className="absolute -bottom-10 right-10 w-32 h-32 bg-rose-300/20 blur-3xl rounded-full" />

      <div className="relative max-w-7xl mx-auto overflow-hidden py-3">
        <motion.div
          className="flex w-max items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 18,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {[1, 2].map((item) => (
            <div
              key={item}
              className="flex items-center gap-6 px-6 whitespace-nowrap"
            >
              <div className="flex items-center gap-2 text-pink-100">
                <Sparkles className="w-4 h-4" />

                <span className="text-sm md:text-base font-semibold tracking-wide">
                  {promoText}
                </span>

                <Gem className="w-4 h-4" />
              </div>

              <div className="w-2 h-2 rounded-full bg-pink-200/70" />

              <div className="flex items-center gap-2 text-pink-100">
                <HeartHandshake className="w-4 h-4" />

                <span className="text-sm md:text-base font-medium">
                  TƯ VẤN MIỄN PHÍ • ƯU ĐÃI CÓ GIỚI
                  HẠN
                </span>
              </div>

              <div className="w-2 h-2 rounded-full bg-pink-200/70" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}