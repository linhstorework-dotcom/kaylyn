
import { createServiceCategory } from "../actions";

export default async function CreateServiceCategoryPage() {

  return (
    <div className="p-10 max-w-lg">

      <h1 className="text-3xl font-bold text-blue-700 mb-6">
        Create Service Category
      </h1>

      <form action={createServiceCategory} className="flex flex-col gap-4">

        <input
          name="name"
          placeholder="Service Category name"
          className="border p-2 rounded"
        />


        <button className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Tạo danh mục
        </button>

      </form>

    </div>
  );
}