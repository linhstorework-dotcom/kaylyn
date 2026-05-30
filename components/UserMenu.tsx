import { auth } from "@/auth"
import  {prisma}  from "@/lib/prisma"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SignOut } from "./SignOut"
import SignIn from "./SignIn"
import Link from "next/link"

export async function UserMenu() {
    const session = await auth()

    let user = null

    if (session?.user?.email) {
        user = await prisma.user.findUnique({
            where: { email: session.user.email },
        })
    }

    if (!session?.user) {
        return <SignIn />
    }

    const initials =
        session.user.name
            ?.split(" ")
            .map((n: string) => n[0])
            .join("") || "U"

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="rounded-full outline-none shadow-sm">
                <Avatar className="size-8 cursor-pointer">
                    <AvatarImage
                        src={session.user.image || undefined}
                        alt={session.user.name ?? "avatar"}
                    />
                    <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-36 border-none bg-white shadow-lg ">
                <DropdownMenuGroup>

                    {user?.role === "ADMIN" && (
                        <DropdownMenuItem>
                            <Link href="/dashboard">Trang quản trị</Link>
                        </DropdownMenuItem>
                    )}
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                        <SignOut />
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}