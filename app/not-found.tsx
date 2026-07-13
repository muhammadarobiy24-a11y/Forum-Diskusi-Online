import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h2 className="text-xl font-bold">404 - Page Not Found</h2>
      <Link
        href="/"
        className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-700"
      >
        Go Home
      </Link>
    </div>
  );
}
