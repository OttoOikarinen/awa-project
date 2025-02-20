import Link from "next/link";

export default function Home() {
  return (
    <div>
      Home page
      <div className="flex gap-4">
        <Link
          href="/register"
          className="px-4 py-2 border border-gray-500 text-gray-900 rounded-lg hover:bg-gray-100 transition"
        >
          Register
        </Link>
        <Link
          href="/login"
          className="px-4 py-2 border border-gray-500 text-gray-900 rounded-lg hover:bg-gray-100 transition"
        >
          Login
        </Link>
            </div>
    </div>
  );
}
