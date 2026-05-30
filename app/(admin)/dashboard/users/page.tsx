import { prisma } from "@/lib/prisma";
import { deleteUser } from "./actions";
import Pagination from "@/components/Pagination";
import Link from "next/link";

const PAGE_SIZE = 5;

type Props = {
  searchParams: Promise<{
    page?: string;
  }>;
};

export default async function UsersPage({ searchParams }: Props) {
  const params = await searchParams;

  const page = Number(params?.page) || 1;

  const totalUsers = await prisma.user.count();

  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
  });

  const totalPages = Math.ceil(totalUsers / PAGE_SIZE);

  return (
    <div className="p-4 md:p-6 lg:p-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-blue-700">
          Users
        </h1>
      </div>

      {/* Mobile Card */}
      <div className="grid gap-4 md:hidden">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white shadow rounded-xl p-4 border"
          >
            <div className="space-y-2">
              <div>
                <p className="text-xs text-gray-400">Name</p>
                <p className="font-medium">
                  {user.name || "No name"}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">Email</p>
                <p className="text-sm text-gray-600 break-all">
                  {user.email}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-400">Role</p>
                <p>{user.role}</p>
              </div>

              <div>
                <p className="text-xs text-gray-400">Created</p>
                <p className="text-sm text-gray-500">
                  {user.createdAt.toDateString()}
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Link
                  href={`/dashboard/users/edit/${user.id}`}
                  className="text-blue-500 text-sm font-medium"
                >
                  Edit
                </Link>

                <form action={deleteUser}>
                  <input
                    type="hidden"
                    name="id"
                    value={user.id}
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
        <table className="w-full min-w-200">
          <thead className="bg-blue-100">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Role</th>
              <th className="p-4 text-left">Created</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="p-4">
                  {user.name || "No name"}
                </td>

                <td className="p-4 text-gray-600">
                  {user.email}
                </td>

                <td className="p-4">
                  {user.role}
                </td>

                <td className="p-4 text-gray-500">
                  {user.createdAt.toDateString()}
                </td>

                <td className="p-4">
                  <div className="flex items-center justify-center gap-4">
                    <Link
                      href={`/dashboard/users/edit/${user.id}`}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Edit
                    </Link>

                    <form action={deleteUser}>
                      <input
                        type="hidden"
                        name="id"
                        value={user.id}
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