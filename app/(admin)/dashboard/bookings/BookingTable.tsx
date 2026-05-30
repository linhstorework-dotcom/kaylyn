"use client";

import {
  Booking,
  BookingStatus,
  Service,
  Staff,
  User,
} from "@/app/generated/prisma/client";

import {
  deleteBooking,
  updateBookingStatus,
} from "./actions";

import BookingStatusBadge from "./BookingStatusBadge";
import { useTransition } from "react";

type BookingWithRelations = Booking & {
  user: User | null;
  service: Service;
  staff: Staff | null;
};

type Props = {
  bookings: BookingWithRelations[];
};

export default function BookingTable({
  bookings,
}: Props) {
  const [isPending, startTransition] =
    useTransition();

  return (
    <div className="bg-white rounded-2xl border border-pink-100 shadow-sm overflow-hidden">
      {/* HEADER */}
      <div className="hidden lg:grid grid-cols-12 gap-4 p-4 bg-pink-50 border-b text-sm font-semibold text-gray-600">
        <div className="col-span-2">Khách hàng</div>
        <div className="col-span-2">Dịch vụ</div>
        <div className="col-span-2">Staff</div>
        <div className="col-span-2">Ngày</div>
        <div className="col-span-2">Status</div>
        <div className="col-span-2 text-right">Actions</div>
      </div>

      {/* BODY */}
      {bookings.map((booking) => (
        <div
          key={booking.id}
          className="p-4 border-b last:border-none lg:grid lg:grid-cols-12 lg:gap-4 lg:items-center"
        >
          {/* USER */}
          <div className="lg:col-span-2">
            <p className="font-medium">
              {booking.user?.name || "Guest"}
            </p>
            <p className="text-sm text-gray-500">
              {booking.phone}
            </p>
          </div>

          {/* SERVICE */}
          <div className="lg:col-span-2 mt-3 lg:mt-0">
            <p className="font-medium">
              {booking.service.title}
            </p>
            <p className="text-sm text-pink-500">
              {booking.service.price.toLocaleString()}đ
            </p>
          </div>

          {/* STAFF */}
          <div className="lg:col-span-2 mt-3 lg:mt-0">
            {booking.staff?.name || (
              <span className="text-gray-400">
                Chưa gán
              </span>
            )}
          </div>

          {/* DATE */}
          <div className="lg:col-span-2 mt-3 lg:mt-0 text-sm">
            {new Date(booking.date).toLocaleDateString(
              "vi-VN"
            )}

            <p className="text-gray-500 mt-1">
              {new Date(booking.date).toLocaleTimeString(
                "vi-VN",
                {
                  hour: "2-digit",
                  minute: "2-digit",
                }
              )}
            </p>
          </div>

          {/* STATUS */}
          <div className="lg:col-span-2 mt-3 lg:mt-0">
            <select
              name="status"
              defaultValue={booking.status}
              disabled={isPending}
              className="border border-pink-200 rounded-xl px-3 py-2 text-sm"
              onChange={(e) => {
                const value =
                  e.target.value as BookingStatus;

                startTransition(() => {
                  updateBookingStatus(
                    booking.id,
                    value
                  );
                });
              }}
            >
              <option value="PENDING">PENDING</option>
              <option value="CONFIRMED">
                CONFIRMED
              </option>
              <option value="DONE">
                COMPLETED
              </option>
              <option value="CANCELLED">
                CANCELLED
              </option>
            </select>

            <div className="mt-2">
              <BookingStatusBadge
                status={booking.status}
              />
            </div>
          </div>

          {/* ACTIONS */}
          <div className="lg:col-span-2 mt-4 lg:mt-0 flex justify-end">
            <button
              onClick={() => {
                startTransition(() => {
                  deleteBooking(booking.id);
                });
              }}
              className="px-3 py-2 bg-red-100 hover:bg-red-200 text-red-500 rounded-xl text-sm"
            >
              Delete
            </button>
          </div>

          {/* NOTE */}
          {booking.note && (
            <div className="lg:col-span-12 mt-4 bg-pink-50 border border-pink-100 rounded-xl p-3 text-sm text-gray-600">
              <span className="font-medium">
                Note:
              </span>{" "}
              {booking.note}
            </div>
          )}
        </div>
      ))}

      {/* EMPTY */}
      {bookings.length === 0 && (
        <div className="py-20 text-center text-gray-400">
          Chưa có booking nào
        </div>
      )}
    </div>
  );
}