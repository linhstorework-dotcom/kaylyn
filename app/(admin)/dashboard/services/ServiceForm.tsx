/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

"use client";
import { useEffect, useState } from "react";

import Image from "next/image";

import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";

import { CldUploadWidget } from "next-cloudinary";
import { X } from "lucide-react";
import {
    Service,
    ServiceCategory,
} from "@/app/generated/prisma/client";

import {
    createService,
    updateService,
} from "./actions";

type FormData = {
    title: string;

    description?: string;

    price: number;

    salePrice?: number;

    discountPercent?: number;

    duration?: number;

    categoryId?: string;
};



type Props = {
    categories: ServiceCategory[];

    service?: Service;
};

export default function ServiceForm({
    categories,
    service,
}: Props) {
    const router = useRouter();

    const [loading, setLoading] =
        useState(false);

    const [imageUrl, setImageUrl] =
        useState(service?.imageUrl || "");

    const [imageId, setImageId] =
        useState(service?.imageId || "");

    const [editingField, setEditingField] =
        useState<
            "salePrice" | "discountPercent" | null
        >(null);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
    } = useForm<FormData>({
        defaultValues: service || {},
    });

    const price = watch("price");

    const salePrice = watch("salePrice");

    const discountPercent =
        watch("discountPercent");

    useEffect(() => {
        if (!price) return;

        if (editingField === "salePrice") {
            if (!salePrice) return;

            const discount = Math.round(
                ((price - salePrice) / price) * 100
            );

            setValue(
                "discountPercent",
                discount
            );
        }

        if (
            editingField ===
            "discountPercent"
        ) {
            if (!discountPercent) return;

            const sale = Math.round(
                price -
                (price * discountPercent) /
                100
            );

            setValue("salePrice", sale);
        }
    }, [
        price,
        salePrice,
        discountPercent,
        editingField,
        setValue,
    ]);

    const onSubmit = async (
        data: FormData
    ) => {
        try {
            setLoading(true);

            const payload = {
                ...data,

                imageUrl,

                imageId,
            };

            if (service) {
                await updateService(
                    service.id,
                    payload
                );
            } else {
                await createService(payload);
            }

            router.push("/dashboard/services");
            router.refresh();
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-pink-100 p-8">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
            >
                <div className="grid md:grid-cols-2 gap-5">
                    <div>
                        <label className="label">
                            Tên dịch vụ
                        </label>

                        <input
                            {...register("title")}
                            placeholder="Tên dịch vụ"
                            className="input"
                        />
                    </div>

                    <div>
                        <label className="label">
                            Danh mục
                        </label>

                        <select
                            {...register("categoryId")}
                            className="input"
                        >
                            <option value="">
                                Chọn danh mục
                            </option>

                            {categories.map((c) => (
                                <option
                                    key={c.id}
                                    value={c.id}
                                >
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="label">
                            Giá gốc
                        </label>

                        <input
                            type="number"
                            {...register("price", {
                                valueAsNumber: true,
                            })}
                            placeholder="Giá"
                            className="input"
                        />
                    </div>

                    <div>
                        <label className="label">
                            Giá sale
                        </label>

                        <input
                            type="number"
                            {...register("salePrice", {
                                valueAsNumber: true,
                            })}
                            placeholder="Giá sale"
                            className="input"
                            onFocus={() =>
                                setEditingField(
                                    "salePrice"
                                )
                            }
                        />
                    </div>

                    <div>
                        <label className="label">
                            % giảm
                        </label>

                        <input
                            type="number"
                            {...register(
                                "discountPercent",
                                {
                                    valueAsNumber: true,
                                }
                            )}
                            placeholder="% giảm"
                            className="input"
                            onFocus={() =>
                                setEditingField(
                                    "discountPercent"
                                )
                            }
                        />
                    </div>

                    <div>
                        <label className="label">
                            Thời gian
                        </label>

                        <input
                            type="number"
                            {...register("duration", {
                                valueAsNumber: true,
                            })}
                            placeholder="Duration"
                            className="input"
                        />
                    </div>
                </div>

                <div>
                    <label className="label">
                        Mô tả
                    </label>

                    <textarea
                        {...register("description")}
                        placeholder="Mô tả dịch vụ"
                        className="input min-h-30"
                    />
                </div>

                <div className="space-y-4">
                    <label className="label">
                        Hình ảnh
                    </label>

                    <CldUploadWidget
                        uploadPreset="services_upload"
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
                                Upload ảnh
                            </button>
                        )}
                    </CldUploadWidget>

                    {imageUrl && (
                        <div className="relative w-fit">
                            <Image
                                src={imageUrl}
                                alt="preview"
                                width={200}
                                height={200}
                                className="rounded-xl object-cover border"
                            />

                            <button
                                type="button"
                                onClick={() => {
                                    setImageUrl("");
                                    setImageId("");
                                }}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </div>

                <div className="flex gap-3 pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-xl"
                    >
                        {loading
                            ? "Loading..."
                            : service
                                ? "Update Service"
                                : "Create Service"}
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            router.push(
                                "/dashboard/services"
                            )
                        }
                        className="border border-pink-200 px-6 py-3 rounded-xl text-pink-500"
                    >
                        Cancel
                    </button>
                </div>
            </form>

            <style jsx>{`
        .label {
          display: block;
          margin-bottom: 8px;
          font-size: 14px;
          font-weight: 500;
          color: #374151;
        }

        .input {
          width: 100%;
          border: 1px solid #fbcfe8;
          padding: 12px;
          border-radius: 14px;
          outline: none;
          background: white;
        }

        .input:focus {
          border-color: #f472b6;
          box-shadow: 0 0 0 3px #fce7f3;
        }
      `}</style>
        </div>
    );
}