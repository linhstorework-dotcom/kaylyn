import { prisma } from "@/lib/prisma";

import ServiceForm from "../ServiceForm";

export default async function CreateServicePage() {
  const categories =
    await prisma.serviceCategory.findMany();

  return (
    <div className="min-h-screen bg-pink-50 p-10">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-pink-600">
            Tạo dịch vụ
          </h1>

          <p className="text-gray-500 mt-1">
            Thêm dịch vụ mới
          </p>
        </div>

        <ServiceForm
          categories={categories}
        />
      </div>
    </div>
  );
}