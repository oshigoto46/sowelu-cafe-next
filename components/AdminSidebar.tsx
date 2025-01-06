import { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";

export default function AdminSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // サイドバーの開閉状態

  return (
    <>
      {/* ハンバーガーメニューボタン（スマホ用） */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* サイドバー */}
      <aside
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white p-4 z-40 transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:w-64`}
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

      {/* 背景（ハンバーガーメニューが開いているときのみ表示） */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  );
}
