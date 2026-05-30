"use server";

import { prisma } from "@/lib/prisma";

import { revalidatePath } from "next/cache";

import { BookingStatus } from "@/app/generated/prisma/client";

export async function updateBookingStatus(
  id: string,
  status: BookingStatus
) {
  await prisma.booking.update({
    where: { id },

    data: {
      status,
    },
  });

  revalidatePath("/dashboard/bookings");
}

export async function deleteBooking(
  id: string
) {
  await prisma.booking.delete({
    where: { id },
  });

  revalidatePath("/dashboard/bookings");
}