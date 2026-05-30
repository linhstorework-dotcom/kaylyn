
"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createBooking(
  formData: FormData
) {
  const serviceId =
    formData.get("serviceId")?.toString() || "";

  const phone =
    formData.get("phone")?.toString() || "";

  const date =
    formData.get("date")?.toString() || "";

  const note =
    formData.get("note")?.toString() || "";

  if (!serviceId || !phone || !date) {
    throw new Error("Thiếu thông tin đặt lịch");
  }

  await prisma.booking.create({
    data: {
      serviceId,
      phone,
      date: new Date(date),
      note,
    },
  });

  redirect("/dat-lich-thanh-cong");
}