import { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";

export default function AdminSidebar({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // サイドバーの開閉状態

  return (
    <div className="grid grid-cols-[auto,1fr] min-h-screen">
      {/* サイドバー */}
      <aside
        className={`bg-gray-800 text-white p-4 transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed top-0 left-0 h-full w-64 z-40 md:static md:translate-x-0`}
      >
        <h1 className="text-2xl font-bold mb-6">管理者ページ</h1>
        <nav className="space-y-4">
          <Link href="/admin" className="block hover:bg-gray-700 px-4 py-2 rounded">
            ダッシュボード
          </Link>
          <Link href="/admin/inventory" className="block hover:bg-gray-700 px-4 py-2 rounded">
            在庫管理
          </Link>
          <Link href="/admin/calendar" className="block hover:bg-gray-700 px-4 py-2 rounded">
            出勤管理
          </Link>
        </nav>
      </aside>

      {/* ハンバーガーメニューボタン（スマホ用） */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* 背景（ハンバーガーメニューが開いているときのみ表示） */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* メインコンテンツ */}
      <main className="bg-gray-100 p-6">
        {children}
      </main>
    </div>
  );
}
