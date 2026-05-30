import Link from "next/link";
import Image from "next/image";
import PromoMarquee from "./PromoMarquee";
import HeaderClient from "./HeaderClient";
import { UserMenu } from "./UserMenu";

const navItems = [
  { href: "/dich-vu", label: "Dịch vụ Spa" },
  { href: "/#contact", label: "Liên hệ" },
  { href: "/bai-viet", label: "Bài viết làm đẹp" },
];

export default function Header() {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        <PromoMarquee />

        <div className="backdrop-blur-xl  bg-white/80 shadow-sm border-b border-pink-100">
          <div className="max-w-7xl mx-auto px-4 md:px-6 h-18 flex items-center justify-between">

            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 group shrink-0"
              aria-label="Kaylyn Spa trang chủ"
            >
              <div className="relative">
                {/* Glow */}
                <div className="absolute inset-0 bg-pink-400/30 blur-xl rounded-full scale-110 opacity-0 group-hover:opacity-100 transition duration-500" />

                <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-linear-to-br from-pink-500 via-rose-400 to-fuchsia-500 p-0.5 shadow-lg shadow-pink-200/50">
                  <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center overflow-hidden">
                    <Image
                      src="/logo.png"
                      alt="Kaylyn Spa Pleiku Gia Lai"
                      width={42}
                      height={42}
                      priority
                      className="object-contain group-hover:scale-105 transition duration-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col leading-none">
                <span
                  className="
        text-2xl md:text-3xl
        font-black tracking-tight
        bg-gradient-to-r from-pink-500 via-fuchsia-500 to-rose-400
        bg-clip-text text-transparent
      "
                >
                  Kaylyn
                </span>

                <span className="text-[11px] md:text-xs uppercase tracking-[0.35em] text-neutral-500 font-semibold ml-1 mt-1">
                  Spa & Beauty
                </span>
              </div>
            </Link>

            {/* Desktop menu SEO */}
            <nav aria-label="Main navigation" className="hidden md:block">
              <ul className="flex items-center gap-10 text-[15px] font-semibold text-neutral-700">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="
                        relative transition-colors duration-300
                        hover:text-rose-500
                        after:absolute after:left-0 after:-bottom-1
                        after:h-0.5 after:w-0
                        after:bg-linear-to-r after:from-pink-400 after:to-rose-400
                        after:transition-all after:duration-300
                        hover:after:w-full
                      "
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="flex items-center gap-x-3">
              <UserMenu />
              <HeaderClient navItems={navItems} />

            </div>

          </div>
        </div>
      </header>

      <div className="h-28" />
    </>
  );
}