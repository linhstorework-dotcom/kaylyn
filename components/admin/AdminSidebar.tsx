"use client";

import Link from "next/link";

import {
  LayoutDashboard,
  Users,
  X,
  Home,
  FolderKanban,
  Sparkles,
  ImageIcon,
  FileText,
  CalendarDays,
  ClipboardList,
} from "lucide-react";

import { useSidebar } from "./SidebarProvider";

export default function AdminSidebar() {
  const { open, setOpen } =
    useSidebar();

  return (
    <>
      {/* OVERLAY MOBILE */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() =>
            setOpen(false)
          }
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-50
          w-64 h-screen
          bg-white border-r border-pink-100
          transform transition-transform duration-300
          ${
            open
              ? "translate-x-0"
              : "-translate-x-full"
          }
          md:translate-x-0
        `}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between p-6 border-b border-pink-100">
          <h2 className="text-xl font-bold text-pink-600">
            Admin Panel
          </h2>

          <button
            className="md:hidden"
            onClick={() =>
              setOpen(false)
            }
          >
            <X size={22} />
          </button>
        </div>

        {/* MENU */}
        <nav className="p-4 space-y-1 text-gray-700">
          <SidebarItem
            href="/"
            icon={<Home size={18} />}
            label="Home Page"
          />

          <SidebarItem
            href="/dashboard"
            icon={
              <LayoutDashboard
                size={18}
              />
            }
            label="Dashboard"
          />

          <SidebarItem
            href="/dashboard/bookings"
            icon={
              <CalendarDays
                size={18}
              />
            }
            label="Bookings"
          />

          <SidebarItem
            href="/dashboard/users"
            icon={
              <Users size={18} />
            }
            label="Users"
          />

          <SidebarItem
            href="/dashboard/categories"
            icon={
              <FolderKanban
                size={18}
              />
            }
            label="Categories"
          />

          <SidebarItem
            href="/dashboard/service-categories"
            icon={
              <ClipboardList
                size={18}
              />
            }
            label="Service Categories"
          />

          <SidebarItem
            href="/dashboard/services"
            icon={
              <Sparkles
                size={18}
              />
            }
            label="Services"
          />

          <SidebarItem
            href="/dashboard/banners"
            icon={
              <ImageIcon
                size={18}
              />
            }
            label="Banners"
          />

          <SidebarItem
            href="/dashboard/posts"
            icon={
              <FileText
                size={18}
              />
            }
            label="Posts"
          />

          
        </nav>
      </aside>
    </>
  );
}

type SidebarItemProps = {
  href: string;

  icon: React.ReactNode;

  label: string;
};

function SidebarItem({
  href,
  icon,
  label,
}: SidebarItemProps) {
  return (
    <Link
      href={href}
      className="
        flex items-center gap-3
        px-3 py-2.5
        rounded-xl
        hover:bg-pink-50
        hover:text-pink-600
        transition
      "
    >
      {icon}

      <span className="text-sm font-medium">
        {label}
      </span>
    </Link>
  );
}