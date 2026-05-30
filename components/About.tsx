import Image from "next/image";

export default function About() {
  return (
    <section
      id="about"
      className="relative w-full py-24 md:py-32 bg-linear-to-b from-white via-pink-50/30 to-white"
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

        {/* LEFT */}
        <div className="space-y-8">

          <p className="text-xs tracking-[0.35em] uppercase text-pink-500">
            Kaylyn Spa
          </p>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-rose-900 leading-tight">
            Nơi làn da được chăm sóc
            <span className="block text-pink-500 mt-2">
              bằng sự tinh tế và an toàn
            </span>
          </h2>

          <div className="space-y-5 text-gray-600 text-base md:text-lg leading-relaxed">
            <p>
              Kaylyn Spa là không gian chăm sóc da chuyên sâu, kết hợp giữa
              công nghệ hiện đại và phương pháp trị liệu an toàn, phù hợp với
              làn da châu Á.
            </p>

            <p>
              Chúng tôi tập trung vào các liệu trình phục hồi – cấp ẩm – tái
              tạo da, giúp làn da khỏe từ bên trong thay vì chỉ cải thiện bề
              mặt.
            </p>
          </div>

          {/* STATS */}
          <div className="flex items-center gap-10 pt-6">

            <div>
              <p className="text-4xl font-serif font-semibold text-pink-500">
                {process.env.YEARS_OF_EXPERIENCE}+
              </p>
              <p className="text-sm text-gray-500 mt-1">
                năm kinh nghiệm chuyên sâu
              </p>
            </div>

            <div className="w-px h-10 bg-gray-200" />

            <div>
              <p className="text-4xl font-serif font-semibold text-pink-500">
                {process.env.CUSTOMES_SERVED}+
              </p>
              <p className="text-sm text-gray-500 mt-1">
                khách hàng tin chọn dịch vụ
              </p>
            </div>

          </div>

          {/* brand philosophy line */}
          <p className="text-sm text-gray-400 italic pt-4">
            “Chúng tôi không chạy theo sự thay đổi nhanh — mà theo đuổi làn da
            khỏe bền vững.”
          </p>

        </div>

        {/* RIGHT */}
        <div className="relative">

          <div className="absolute -top-5 -left-5 w-full h-full border border-pink-200/40 rounded-3xl" />

          <div className="relative aspect-4/5 md:aspect-square rounded-3xl overflow-hidden shadow-xl">
            <Image
              src="/images/banners/about.png"
              alt="Kaylyn Spa chăm sóc da chuyên sâu"
              fill
              className="object-cover"
            />
          </div>

          {/* badge */}
          <div className="absolute bottom-6 left-6 bg-white/80 backdrop-blur-xl px-4 py-2 rounded-full">
            <p className="text-xs text-gray-600 tracking-wide">
              Premium Skin Care Experience
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}