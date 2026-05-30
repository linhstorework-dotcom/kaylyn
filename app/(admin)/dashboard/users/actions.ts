"use server";

import { Role } from "@/app/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


export async function createUser(formData: FormData) {

  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const role = formData.get("role") as Role

  await prisma.user.create({
    data: {
      name,
      email,
      password,
      role,
    },
  })

  revalidatePath("/dashboard/users")
}

export async function updateUser(id: string, formData: FormData) {

  const name = formData.get("name") as string
  const role = formData.get("role") as Role

  await prisma.user.update({
    where: { id },
    data: {
      name,
      role,
    },
  })

  revalidatePath("/dashboard/users/")
  redirect(`/dashboard/users/`);
}
export async function deleteUser(formData: FormData) {
  const id = formData.get("id") as string;

  await prisma.user.delete({
    where: { id },
  });

  revalidatePath("/dashboard/users");
}