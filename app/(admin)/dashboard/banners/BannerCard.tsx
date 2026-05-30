import Image from "next/image";

import {
  deleteBanner,
  toggleBanner,
} from "./actions";

import { Banner } from "@/app/generated/prisma/client";

type Props = {
  banner: Banner;
};

export default function BannerCard({
  banner,
}: Props) {
  return (
    <div className="bg-white rounded-2xl border border-pink-100 shadow-sm overflow-hidden">
      <Image
        src={banner.imageUrl}
        alt="banner"
        width={1200}
        height={500}
        className="w-full h-55 object-cover"
      />

      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-semibold text-lg">
              {banner.title ||
                "Untitled Banner"}
            </h3>

            <p
              className={`text-sm mt-1 ${
                banner.active
                  ? "text-green-600"
                  : "text-gray-400"
              }`}
            >
              {banner.active
                ? "Đang hiển thị"
                : "Đã ẩn"}
            </p>
          </div>

          <div className="flex gap-2">
            <form
              action={async () => {
                "use server";

                await toggleBanner(
                  banner.id
                );
              }}
            >
              <button
                className={`px-4 py-2 rounded-xl text-sm ${
                  banner.active
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {banner.active
                  ? "Ẩn"
                  : "Hiện"}
              </button>
            </form>

            <form
              action={async () => {
                "use server";

                await deleteBanner(
                  banner.id
                );
              }}
            >
              <button className="px-4 py-2 rounded-xl text-sm bg-red-100 text-red-600">
                Delete
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}