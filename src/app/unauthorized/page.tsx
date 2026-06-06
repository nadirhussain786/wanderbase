import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4f6fb]">
      <div className="text-center">
        <div className="text-6xl mb-4">🚫</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Access Denied</h1>
        <p className="text-gray-500 mb-6">You don&apos;t have permission to view this page.</p>
        <Link href="/" className="px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-light transition-colors">
          Go Home
        </Link>
      </div>
    </div>
  );
}
