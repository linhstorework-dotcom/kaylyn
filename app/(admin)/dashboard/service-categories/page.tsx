import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteServiceCategory } from "./actions";
import Pagination from "@/components/Pagination";

const PAGE_SIZE = 5;

type Props = {
  searchParams: Promise<{
    page?: string;
  }>;
};

export default async function ServiceCategoriesPage({
  searchParams,
}: Props) {
  const params = await searchParams;

  const page = Number(params?.page) || 1;

  const totalCategories =
    await prisma.serviceCategory.count();

  const categories =
    await prisma.serviceCategory.findMany({
      orderBy: { name: "asc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    });

  const totalPages = Math.ceil(
    totalCategories / PAGE_SIZE
  );

  return (
    <div className="p-4 md:p-6 lg:p-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-blue-700">
          Danh mục dịch vụ
        </h1>

        <Link
          href="/dashboard/service-categories/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-center"
        >
          + Add Service Category
        </Link>
      </div>

      {/* Mobile Card */}
      <div className="grid gap-4 md:hidden">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-white border rounded-xl shadow p-4"
          >
            <div className="space-y-2">
              <div>
                <p className="text-xs text-gray-400">
                  Name
                </p>

                <p className="font-medium">
                  {cat.name}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">
                  Slug
                </p>

                <p className="text-sm text-gray-500 break-all">
                  {cat.slug}
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Link
                  href={`/dashboard/service-categories/${cat.id}/edit`}
                  className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-600 transition"
                >
                  Edit
                </Link>

                <form action={deleteServiceCategory}>
                  <input
                    type="hidden"
                    name="id"
                    value={cat.id}
                  />

                  <button className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600 transition">
                    Delete
                  </button>
                </form>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto bg-white shadow rounded-xl">
        <table className="w-full min-w-175">
          <thead className="bg-blue-100">
            <tr>
              <th className="p-4 text-left">
                Name
              </th>

              <th className="p-4 text-left">
                Slug
              </th>

              <th className="p-4 text-center">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {categories.map((cat) => (
              <tr
                key={cat.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="p-4">
                  {cat.name}
                </td>

                <td className="p-4 text-gray-500">
                  {cat.slug}
                </td>

                <td className="p-4">
                  <div className="flex justify-center gap-3">
                    <Link
                      href={`/dashboard/service-categories/${cat.id}/edit`}
                      className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition"
                    >
                      Edit
                    </Link>

                    <form action={deleteServiceCategory}>
                      <input
                        type="hidden"
                        name="id"
                        value={cat.id}
                      />

                      <button className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition">
                        Delete
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}