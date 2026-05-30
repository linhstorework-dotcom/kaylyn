// app/dat-lich-thanh-cong/page.tsx

import Link from "next/link";
import {
  CheckCircle2,
  Phone,
  ArrowRight,
} from "lucide-react";

export default function BookingSuccessPage() {
  return (
    <main className="min-h-screen bg-linear-to-b from-pink-50 via-white to-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl border border-pink-100 p-8 md:p-12 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-pink-100 flex items-center justify-center">
            <CheckCircle2 className="w-14 h-14 text-pink-500" />
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Đặt lịch thành công 🎉
        </h1>

        <p className="text-gray-600 text-base md:text-lg leading-8 mb-8">
          Kaylyn Spa đã nhận được thông tin đặt lịch
          của bạn. Chúng tôi sẽ sớm liên hệ để xác
          nhận lịch hẹn và tư vấn chi tiết.
        </p>

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="bg-pink-50 border border-pink-100 rounded-2xl p-5">
            <h2 className="font-semibold text-gray-900 mb-2">
              Thời gian phản hồi
            </h2>

            <p className="text-gray-500 text-sm leading-6">
              Thường trong vòng 5 - 15 phút trong giờ
              làm việc.
            </p>
          </div>

          <div className="bg-pink-50 border border-pink-100 rounded-2xl p-5">
            <h2 className="font-semibold text-gray-900 mb-2">
              Hỗ trợ nhanh
            </h2>

            <a
              href={`tel:${process.env.PHONE_NUMBER}`}
              className="inline-flex items-center gap-2 text-pink-600 font-medium"
            >
              <Phone className="w-4 h-4" />
              {process.env.PHONE_NUMBER}
            </a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded-xl border border-pink-200 hover:bg-pink-50 transition font-medium"
          >
            Về trang chủ
          </Link>

          <Link
            href="/dich-vu"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-pink-500 hover:bg-pink-600 transition text-white font-medium inline-flex items-center justify-center gap-2"
          >
            Xem thêm dịch vụ
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}