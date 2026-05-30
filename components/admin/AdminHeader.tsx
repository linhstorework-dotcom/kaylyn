"use client";

import {
  Bell,
  Menu,
  Search,
} from "lucide-react";

import { useSidebar } from "./SidebarProvider";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AdminHeader() {
  const { setOpen } =
    useSidebar();

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/90 backdrop-blur border-b border-pink-100 px-4 md:px-6">
      <div className="h-full flex items-center justify-between">
        {/* LEFT */}
        <div className="flex items-center gap-3">
          {/* MOBILE MENU */}
          <button
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl hover:bg-pink-50 transition"
            onClick={() =>
              setOpen(true)
            }
          >
            <Menu size={22} />
          </button>

          {/* TITLE */}
          <div>
            <h1 className="font-bold text-lg md:text-xl text-gray-800">
              Admin Dashboard
            </h1>

            <p className="hidden md:block text-xs text-gray-400">
              Manage your spa system
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* SEARCH */}
          <div className="hidden lg:flex items-center gap-2 bg-pink-50 border border-pink-100 rounded-xl px-3 h-11 w-72">
            <Search
              size={18}
              className="text-gray-400"
            />

            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none text-sm w-full"
            />
          </div>

          {/* NOTIFICATION */}
          <button className="relative w-11 h-11 rounded-xl border border-pink-100 flex items-center justify-center hover:bg-pink-50 transition">
            <Bell
              size={20}
              className="text-gray-700"
            />

            <span className="absolute top-2 right-2 w-2 h-2 bg-pink-500 rounded-full" />
          </button>

          {/* USER */}
          <div className="flex items-center gap-3 pl-2">
            <Avatar className="w-10 h-10 border border-pink-100">
              <AvatarImage src="/avatar.png" />

              <AvatarFallback>
                AD
              </AvatarFallback>
            </Avatar>

            <div className="hidden md:block leading-tight">
              <p className="text-sm font-semibold text-gray-800">
                Admin
              </p>

              <p className="text-xs text-gray-400">
                Super Admin
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}