import { prisma } from "@/lib/prisma"
import { updateUser } from "../../actions"
import { Role } from "@/app/generated/prisma/enums"

export default async function EditUserPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const user = await prisma.user.findUnique({
        where: {
            id
        },
    })

    if (!user) return <div>User not found</div>

    return (
        <div className="p-10">

            <h1 className="text-2xl mb-6">Edit User</h1>

            <form
                action={updateUser.bind(null, user.id)}
                className="flex flex-col gap-4 max-w-md"
            >

                <input
                    name="name"
                    defaultValue={user.name ?? ""}
                    className="border p-2"
                />



                <select
                    name="role"
                    defaultValue={user.role}
                    className="border p-2"
                >
                    {Object.values(Role).map((r) => (
                        <option key={r} value={r}>
                            {r}
                        </option>
                    ))}
                </select>

                <button className="bg-green-500 text-white p-2 rounded">
                    Update
                </button>

            </form>

        </div>
    )
}