import { prisma } from "@/lib/prisma";

import BookingTable from "./BookingTable";

export default async function BookingsPage() {
    const bookings =
        await prisma.booking.findMany({
            include: {
                user: true,

                service: true,

                staff: true,
            },

            orderBy: {
                createdAt: "desc",
            },
        });

    return (
        <div className="min-h-screen bg-pink-50 p-4 md:p-8">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* HEADER */}
                <div>
                    <h1 className="text-3xl font-bold text-pink-600">
                        Quản lý Booking
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Theo dõi lịch hẹn khách
                        hàng
                    </p>
                </div>

                {/* STATS */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div className="bg-white p-5 rounded-2xl border border-pink-100 shadow-sm">
                        <p className="text-sm text-gray-500">
                            Total Bookings
                        </p>

                        <h3 className="text-3xl font-bold text-pink-600 mt-2">
                            {bookings.length}
                        </h3>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-pink-100 shadow-sm">
                        <p className="text-sm text-gray-500">
                            Pending
                        </p>

                        <h3 className="text-3xl font-bold text-yellow-500 mt-2">
                            {
                                bookings.filter(
                                    (b) =>
                                        b.status ===
                                        "PENDING"
                                ).length
                            }
                        </h3>
                    </div>
                    <div className="bg-white p-5 rounded-2xl border border-pink-100 shadow-sm">
                        <p className="text-sm text-gray-500">
                            Confirmed
                        </p>

                        <h3 className="text-3xl font-bold text-blue-500 mt-2">
                            {
                                bookings.filter(
                                    (b) =>
                                        b.status ===
                                        "CONFIRMED"
                                ).length
                            }
                        </h3>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-pink-100 shadow-sm">
                        <p className="text-sm text-gray-500">
                            Completed
                        </p>

                        <h3 className="text-3xl font-bold text-green-500 mt-2">
                            {
                                bookings.filter(
                                    (b) =>
                                        b.status === "DONE"
                                ).length
                            }
                        </h3>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-pink-100 shadow-sm">
                        <p className="text-sm text-gray-500">
                            Cancelled
                        </p>

                        <h3 className="text-3xl font-bold text-red-500 mt-2">
                            {
                                bookings.filter(
                                    (b) =>
                                        b.status ===
                                        "CANCELLED"
                                ).length
                            }
                        </h3>
                    </div>
                </div>

                {/* TABLE */}
                <BookingTable
                    bookings={bookings}
                />
            </div>
        </div>
    );
}