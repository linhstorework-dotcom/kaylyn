
import { createCategory } from "../actions";

export default async function CreateCategoryPage() {

  return (
    <div className="p-10 max-w-lg">

      <h1 className="text-3xl font-bold text-blue-700 mb-6">
        Create Category
      </h1>

      <form action={createCategory} className="flex flex-col gap-4">

        <input
          name="name"
          placeholder="Category name"
          className="border p-2 rounded"
        />


        <button className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Tạo danh mục
        </button>

      </form>

    </div>
  );
}