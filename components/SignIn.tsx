import { signIn } from "@/auth";

export default function GoogleSignInButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <button
        type="submit"
        className="
        flex
        items-center
        gap-3
        rounded-lg
        px-3
        py-2
        text-sm
        font-medium
        bg-white
        hover:bg-gray-50
        transition
        shadow-sm
      "
      >
        {/* Google icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          className="w-5 h-5"
        >
          <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.6 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C33.8 6.1 29.2 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z" />
          <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 16.2 19 13 24 13c3 0 5.7 1.1 7.8 2.9l5.7-5.7C33.8 6.1 29.2 4 24 4c-7.7 0-14.3 4.4-17.7 10.7z" />
          <path fill="#4CAF50" d="M24 44c5.2 0 9.6-1.7 12.8-4.6l-5.9-4.8C29 35.8 26.6 36.6 24 36.6c-5.2 0-9.6-3.3-11.2-7.9l-6.5 5C9.6 39.6 16.3 44 24 44z" />
          <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1.1 3-3.3 5.3-6.4 6.6l.1-.1 5.9 4.8C33.6 41.5 44 34 44 24c0-1.3-.1-2.3-.4-3.5z" />
        </svg>

      </button>
    </form>
  );
}