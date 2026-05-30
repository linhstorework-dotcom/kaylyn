export default function Standards() {
  return (
    <section
      className="relative overflow-hidden bg-[#fff8fb] py-28 md:py-36 font-sans"
      aria-labelledby="standards-heading"
    >
      <div className="pointer-events-none absolute -top-48 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gradient-to-br from-pink-200/40 via-rose-200/30 to-transparent blur-[200px] rounded-full" />

      <div className="relative max-w-6xl mx-auto px-6">
        <header className="relative max-w-4xl mb-20">
          {/* background word */}
          <span
            className="
              absolute -top-20 left-0
              text-[12vw] md:text-[120px]
              font-serif font-semibold
              tracking-[0.25em]
              text-pink-200/60
              select-none
              leading-none
              whitespace-nowrap
            "
            aria-hidden="true"
          >
            STANDARD
          </span>

          <p className="uppercase tracking-[0.35em] text-rose-500 text-xs font-medium mb-6 relative z-10">
            Kaylyn Spa
          </p>

          <h2
            id="standards-heading"
            className="
              relative z-10
              text-4xl md:text-5xl lg:text-6xl
              font-serif
              font-medium
              leading-tight
              mb-6
              text-rose-900
            "
          >
            Khi làm đẹp
            <br className="hidden md:block" />
            trở thành một chuẩn mực
          </h2>

          <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-2xl">
            Kaylyn Spa theo đuổi triết lý làm đẹp an toàn, tinh tế và có chiều sâu —
            nơi mỗi liệu trình đều được thiết kế như một trải nghiệm cá nhân.
          </p>
        </header>

        <div className="space-y-14 md:space-y-16">
          {[1, 2, 3].map((item) => (
            <article
              key={item}
              className={`flex gap-8 items-start ${
                item === 2 ? "md:pl-20" : ""
              }`}
            >
              {/* number */}
              <span className="text-5xl md:text-6xl font-serif text-rose-300/80">
                {String(item).padStart(2, "0")}
              </span>

              <div className="max-w-2xl">
                <h3 className="font-serif text-2xl md:text-3xl text-rose-900 mb-3">
                  {item === 1 && "Chuẩn y khoa & an toàn"}
                  {item === 2 && "Cá nhân hóa tuyệt đối"}
                  {item === 3 && "Trải nghiệm tinh tế & riêng tư"}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {item === 1 &&
                    "Liệu trình dựa trên nền tảng da liễu hiện đại, ưu tiên phục hồi và nuôi dưỡng làn da khỏe từ gốc."}
                  {item === 2 &&
                    "Mỗi làn da là một câu chuyện riêng, được soi da và xây dựng phác đồ phù hợp."}
                  {item === 3 &&
                    "Không gian yên tĩnh giúp làn da và tinh thần cùng được tái tạo."}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}