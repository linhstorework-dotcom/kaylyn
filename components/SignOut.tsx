import { signOut } from "@/auth"
 
export function SignOut() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut()
      }}
    >
      <button type="submit" className="cursor-pointer text-sm bg-red-500 text-white px-3 py-1 rounded w-full">
        Đăng xuất
      </button>
    </form>
  )
}