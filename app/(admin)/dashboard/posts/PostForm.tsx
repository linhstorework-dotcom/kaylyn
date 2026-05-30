/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useMemo, useState } from "react";

import Image from "next/image";

import slugify from "slugify";

import { useRouter } from "next/navigation";

import { useForm, useFieldArray } from "react-hook-form";

import { CldUploadWidget } from "next-cloudinary";

import Tiptap from "@/components/Tiptap";

import { Post, Category } from "@/app/generated/prisma/client";

import {
  createPost,
  updatePost,
  FAQ,
} from "./actions";

type Props = {
  categories: Category[];

  post?: Post | null;
};

type FormData = {
  title: string;

  excerpt?: string;

  content?: string;

  thumbnailUrl?: string;

  thumbnailId?: string;

  categoryId?: string;

  published: boolean;

  keywords?: string;

  faq: FAQ[];
};

export default function PostForm({
  categories,
  post,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [imageUrl, setImageUrl] =
    useState(
      post?.thumbnailUrl || ""
    );

  const [imageId, setImageId] =
    useState(
      post?.thumbnailId || ""
    );

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      title: post?.title || "",

      excerpt:
        post?.excerpt || "",

      content:
        post?.content || "",

      thumbnailUrl:
        post?.thumbnailUrl || "",

      thumbnailId:
        post?.thumbnailId || "",

      categoryId:
        post?.categoryId || "",

      published:
        post?.published || false,

      keywords:
        post?.keywords || "",

      faq:
        (post?.faq as FAQ[]) ||
        [],
    },
  });

  const {
    fields,
    append,
    remove,
  } = useFieldArray({
    control,

    name: "faq",
  });

  const title = watch("title");

  const slug = useMemo(() => {
    return slugify(title || "", {
      lower: true,
      strict: true,
      locale: "vi",
    });
  }, [title]);

  const onSubmit = async (
    data: FormData
  ) => {
    try {
      setLoading(true);

      const payload = {
        ...data,

        thumbnailUrl: imageUrl,

        thumbnailId: imageId,
      };

      if (post) {
        await updatePost(
          post.id,
          payload
        );
      } else {
        await createPost(
          payload
        );
      }

      router.push(
        "/dashboard/posts"
      );

      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-pink-100 shadow-sm p-6 md:p-8">
      <form
        onSubmit={handleSubmit(
          onSubmit
        )}
        className="space-y-6"
      >
        {/* TITLE */}
        <div>
          <label className="label">
            Tiêu đề
          </label>

          <input
            {...register("title", {
              required: true,
            })}
            placeholder="Nhập tiêu đề..."
            className="input"
          />
        </div>

        {/* SLUG */}
        <div>
          <label className="label">
            Slug
          </label>

          <div className="input bg-gray-50 text-gray-500">
            {slug || "slug"}
          </div>
        </div>

        {/* KEYWORDS */}
        <div>
          <label className="label">
            Keywords SEO
          </label>

          <input
            {...register(
              "keywords"
            )}
            placeholder="spa, massage, skincare..."
            className="input"
          />
        </div>

        {/* EXCERPT */}
        <div>
          <label className="label">
            Mô tả ngắn
          </label>

          <textarea
            {...register(
              "excerpt"
            )}
            rows={4}
            placeholder="Mô tả SEO..."
            className="input"
          />
        </div>

        {/* CATEGORY */}
        <div>
          <label className="label">
            Category
          </label>

          <select
            {...register(
              "categoryId"
            )}
            className="input"
          >
            <option value="">
              Chọn category
            </option>

            {categories.map(
              (category) => (
                <option
                  key={
                    category.id
                  }
                  value={
                    category.id
                  }
                >
                  {category.name}
                </option>
              )
            )}
          </select>
        </div>

        {/* THUMBNAIL */}
        <div className="space-y-4">
          <label className="label">
            Thumbnail
          </label>

          <CldUploadWidget
            uploadPreset="services_upload"
            onSuccess={(
              result: any
            ) => {
              setImageUrl(
                result.info
                  .secure_url
              );

              setImageId(
                result.info
                  .public_id
              );
            }}
          >
            {({ open }) => (
              <button
                type="button"
                onClick={() =>
                  open()
                }
                className="bg-pink-500 hover:bg-pink-600 text-white px-5 py-3 rounded-xl"
              >
                Upload Thumbnail
              </button>
            )}
          </CldUploadWidget>

          {imageUrl && (
            <div className="space-y-3">
              <Image
                src={imageUrl}
                alt="thumbnail"
                width={500}
                height={300}
                className="rounded-2xl border object-cover"
              />

              <button
                type="button"
                onClick={() => {
                  setImageUrl(
                    ""
                  );

                  setImageId(
                    ""
                  );
                }}
                className="bg-red-100 text-red-500 px-4 py-2 rounded-xl"
              >
                Xóa ảnh
              </button>
            </div>
          )}
        </div>

        {/* FAQ */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">
              FAQ
            </h3>

            <button
              type="button"
              onClick={() =>
                append({
                  question:
                    "",

                  answer: "",
                })
              }
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl"
            >
              + Thêm FAQ
            </button>
          </div>

          {fields.map(
            (field, index) => (
              <div
                key={field.id}
                className="border rounded-2xl p-4 space-y-3"
              >
                <input
                  {...register(
                    `faq.${index}.question`
                  )}
                  placeholder="Câu hỏi"
                  className="input"
                />

                <textarea
                  {...register(
                    `faq.${index}.answer`
                  )}
                  placeholder="Câu trả lời"
                  className="input"
                />

                <button
                  type="button"
                  onClick={() =>
                    remove(
                      index
                    )
                  }
                  className="text-red-500 text-sm"
                >
                  Xóa FAQ
                </button>
              </div>
            )
          )}
        </div>

        {/* CONTENT */}
        <div>
          <label className="label">
            Nội dung
          </label>

          <Tiptap
            value={
              watch(
                "content"
              ) || ""
            }
            slug={slug}
            onChange={(
              content
            ) =>
              setValue(
                "content",
                content
              )
            }
          />
        </div>

        {/* PUBLISHED */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            {...register(
              "published"
            )}
            className="w-5 h-5"
          />

          <label>
            Xuất bản bài viết
          </label>
        </div>

        {/* ACTION */}
        <div className="flex gap-3 flex-wrap">
          <button
            type="submit"
            disabled={loading}
            className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-xl"
          >
            {loading
              ? "Loading..."
              : post
                ? "Cập nhật bài viết"
                : "Tạo bài viết"}
          </button>

          <button
            type="button"
            onClick={() =>
              router.push(
                "/dashboard/posts"
              )
            }
            className="border border-pink-200 px-6 py-3 rounded-xl"
          >
            Quay lại
          </button>
        </div>
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