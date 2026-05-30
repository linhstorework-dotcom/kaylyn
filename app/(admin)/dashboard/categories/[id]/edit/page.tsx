import { prisma } from "@/lib/prisma";
import { updateCategory } from "../../actions";

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const category = await prisma.category.findUnique({
    where: { id },
  });

  

  if (!category) return "Category not found";

  return (
    <div className="p-10 max-w-lg">

      <h1 className="text-3xl font-bold text-blue-700 mb-6">
        Edit Category
      </h1>

      <form action={updateCategory} className="flex flex-col gap-4">

        <input type="hidden" name="id" value={category.id} />

        <input
          name="name"
          defaultValue={category.name}
          className="border p-2 rounded"
        />

        <button className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Update Category
        </button>

      </form>

    </div>
  );
}