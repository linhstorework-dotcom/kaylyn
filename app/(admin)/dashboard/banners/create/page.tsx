import BannerForm from "../BannerForm";

export default function CreateBannerPage() {
  return (
    <div className="min-h-screen bg-pink-50 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-pink-600">
            Tạo Banner
          </h1>

          <p className="text-gray-500 mt-1">
            Upload banner mới
          </p>
        </div>

        <BannerForm />
      </div>
    </div>
  );
}