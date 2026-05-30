import { notFound } from "next/navigation";
import { getServiceBySlug } from "@/features/services/services";
import type { Metadata } from "next";
import Link from "next/link";
import { createBooking } from "./actions";
import {
  Clock3,
  ShieldCheck,
  Sparkles,
  Phone,
} from "lucide-react";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const service = await getServiceBySlug(slug);

  if (!service) return {};

  return {
    title: `Đặt lịch ${service.title} | Kaylyn Spa`,
    description: service.description,

    alternates: {
      canonical: `${baseUrl}/dich-vu/${slug}/dat-lich`,
    },

    openGraph: {
      title: `Đặt lịch ${service.title}`,
      description:
        service.description ||
        "Đặt lịch dịch vụ làm đẹp tại Kaylyn Spa Pleiku",
      url: `${baseUrl}/dich-vu/${slug}/dat-lich`,
      type: "website",
      locale: "vi_VN",
    },

    twitter: {
      card: "summary_large_image",
      title: `Đặt lịch ${service.title}`,
      description:
        service.description ||
        "Đặt lịch dịch vụ làm đẹp tại Kaylyn Spa Pleiku",
    },
  };
}

export default async function BookingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const service = await getServiceBySlug(slug);

  if (!service) return notFound();

  const price =
    service.salePrice ?? service.price;

  return (
    <main className="min-h-screen bg-linear-to-b from-pink-50 via-white to-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-10 md:py-16">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* LEFT */}
          <section>
            <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-600 px-4 py-2 rounded-full text-sm font-medium mb-5">
              <Sparkles className="w-4 h-4" />
              Booking Service
            </div>

            <h1 className="text-3xl md:text-5xl font-bold leading-tight text-gray-900 mb-5">
              Đặt lịch{" "}
              <span className="text-pink-500">
                {service.title}
              </span>
            </h1>

            <p className="text-gray-600 leading-7 text-base md:text-lg mb-8">
              {service.description}
            </p>

            <div className="bg-white border border-pink-100 shadow-sm rounded-3xl p-6 mb-8">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <p className="text-sm text-gray-400 mb-1">
                    Giá dịch vụ
                  </p>

                  <h2 className="text-3xl font-bold text-pink-600">
                    {price.toLocaleString()}đ
                  </h2>
                </div>

                <div className="bg-pink-50 text-pink-600 px-4 py-2 rounded-xl text-sm font-medium">
                  Tư vấn miễn phí
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4 bg-white p-4 rounded-2xl border border-gray-100">
                <div className="bg-pink-100 p-3 rounded-xl">
                  <Clock3 className="w-5 h-5 text-pink-500" />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">
                    Đặt lịch nhanh chóng
                  </h3>

                  <p className="text-gray-500 text-sm mt-1">
                    Chỉ mất khoảng 1 phút để hoàn tất
                    thông tin đặt lịch.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white p-4 rounded-2xl border border-gray-100">
                <div className="bg-pink-100 p-3 rounded-xl">
                  <ShieldCheck className="w-5 h-5 text-pink-500" />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">
                    Chuyên viên giàu kinh nghiệm
                  </h3>

                  <p className="text-gray-500 text-sm mt-1">
                    Đội ngũ chăm sóc tận tâm, sử dụng
                    sản phẩm chất lượng cao.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* RIGHT */}
          <section className="bg-white rounded-3xl shadow-xl border border-pink-100 p-6 md:p-8 sticky top-10">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Thông tin đặt lịch
              </h2>

              <p className="text-gray-500 mt-1">
                Điền thông tin để Kaylyn Spa liên hệ
                xác nhận lịch hẹn.
              </p>
            </div>

            <form
              action={createBooking}
              className="space-y-5"
            >
              <input
                type="hidden"
                name="serviceId"
                value={service.id}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số điện thoại
                </label>

                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="Nhập số điện thoại"
                  className="w-full h-12 rounded-xl border border-gray-200 px-4 outline-none focus:border-pink-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ngày đặt lịch
                </label>

                <input
                  type="datetime-local"
                  name="date"
                  required
                  className="w-full h-12 rounded-xl border border-gray-200 px-4 outline-none focus:border-pink-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ghi chú
                </label>

                <textarea
                  rows={4}
                  name="note"
                  placeholder="Nhu cầu hoặc tình trạng của bạn..."
                  className="w-full rounded-xl border border-gray-200 p-4 outline-none focus:border-pink-400 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full h-12 rounded-xl bg-pink-500 hover:bg-pink-600 transition text-white font-semibold"
              >
                Xác nhận đặt lịch
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-100">
              <Link
                href={`tel:${process.env.PHONE_NUMBER}`}
                className="flex items-center justify-center gap-2 text-pink-600 font-medium"
              >
                <Phone className="w-4 h-4" />
                Hotline tư vấn: {process.env.PHONE_NUMBER}
              </Link>
            </div>
          </section>
        </div>
      </div>

      {/* SERVICE SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: service.title,
            description: service.description,
            provider: {
              "@type": "BeautySalon",
              name: "Kaylyn Spa",
              url: baseUrl,
            },
            areaServed: {
              "@type": "City",
              name: "Pleiku",
            },
            offers: {
              "@type": "Offer",
              price: price,
              priceCurrency: "VND",
              availability:
                "https://schema.org/InStock",
              url: `${baseUrl}/dich-vu/${slug}/dat-lich`,
            },
            potentialAction: {
              "@type": "ReserveAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate: `${baseUrl}/dich-vu/${slug}/dat-lich`,
              },
            },
          }),
        }}
      />
    </main>
  );
}