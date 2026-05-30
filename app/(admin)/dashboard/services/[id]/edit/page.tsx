import { prisma } from "@/lib/prisma";

import ServiceForm from "../../ServiceForm";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditServicePage({
  params,
}: Props) {
  const { id } = await params;

  const service =
    await prisma.service.findUnique({
      where: {
        id,
      },
    });

  const categories =
    await prisma.serviceCategory.findMany();

  if (!service) {
    return (
      <div className="p-10">
        Service not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pink-50 p-10">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-pink-600">
            Cập nhật dịch vụ
          </h1>

          <p className="text-gray-500 mt-1">
            Chỉnh sửa thông tin dịch vụ
          </p>
        </div>

        <ServiceForm
          service={service}
          categories={categories}
        />
      </div>
    </div>
  );
}