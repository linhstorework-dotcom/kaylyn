"use client";

import { useState } from "react";

import Image from "next/image";

import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";

import { CldUploadWidget } from "next-cloudinary";

import { createBanner } from "./actions";

type FormData = {
  title?: string;

  active: boolean;
};

export default function BannerForm() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [imageUrl, setImageUrl] =
    useState("");

  const [imageId, setImageId] =
    useState("");

  const { register, handleSubmit } =
    useForm<FormData>({
      defaultValues: {
        active: true,
      },
    });

  const onSubmit = async (
    data: FormData
  ) => {
    if (!imageUrl) {
      alert("Hãy upload ảnh");
      return;
    }

    try {
      setLoading(true);

      await createBanner({
        ...data,

        imageUrl,

        imageId,
      });

      router.push("/dashboard/banners");

      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-pink-100 shadow-sm p-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <div>
          <label className="label">
            Tiêu đề
          </label>

          <input
            {...register("title")}
            placeholder="Banner title"
            className="input"
          />
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            {...register("active")}
            className="w-5 h-5"
          />

          <label>
            Hiển thị ngoài trang chủ
          </label>
        </div>

        <div className="space-y-4">
          <CldUploadWidget
            uploadPreset="services_upload"
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onSuccess={(result: any) => {
              setImageUrl(
                result.info.secure_url
              );

              setImageId(
                result.info.public_id
              );
            }}
          >
            {({ open }) => (
              <button
                type="button"
                onClick={() => open()}
                className="bg-pink-500 hover:bg-pink-600 text-white px-5 py-3 rounded-xl"
              >
                Upload Banner
              </button>
            )}
          </CldUploadWidget>

          {imageUrl && (
            <Image
              src={imageUrl}
              alt="banner"
              width={1200}
              height={500}
              className="w-full h-62.5 rounded-2xl object-cover"
            />
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-xl"
        >
          {loading
            ? "Loading..."
            : "Create Banner"}
        </button>
      </form>

      <style jsx>{`
        .label {
          display: block;
          margin-bottom: 8px;
          font-size: 14px;
          font-weight: 500;
        }

        .input {
          width: 100%;
          border: 1px solid #fbcfe8;
          padding: 12px;
          border-radius: 14px;
          outline: none;
        }

        .input:focus {
          border-color: #f472b6;
          box-shadow: 0 0 0 3px #fce7f3;
        }
      `}</style>
    </div>
  );
}