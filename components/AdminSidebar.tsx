import Link from "next/link";

export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-gray-800 text-white p-4">
      <h1 className="text-2xl font-bold mb-6">管理者ページ</h1>
      <nav className="space-y-4">
        <Link href="/admin" className="block hover:bg-gray-700 px-4 py-2 rounded">
          ダッシュボード
        </Link>
        <Link href="/admin/inventory" className="block hover:bg-gray-700 px-4 py-2 rounded">
          在庫管理
        </Link>
        <Link href="/admin/orders" className="block hover:bg-gray-700 px-4 py-2 rounded">
          出勤管理
        </Link>
      </nav>
    </aside>
  );
}
