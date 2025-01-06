"use client";

import { useState } from "react";
import Link from "next/link";
import { FaLock, FaBars, FaTimes } from "react-icons/fa";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <html lang="ja">
      <body className="font-sans bg-gray-50">
        <header className="flex justify-between items-center p-4 border-b border-gray-200">
          {/* ロゴとナビゲーション */}
          <div className="flex items-center">
            <img
              src="/logo.svg" // ロゴ画像
              alt="Logo"
              className="h-10 mr-4"
            />
            {/* PC用ナビゲーション */}
            <nav className="hidden md:flex space-x-4 text-sm">
              <Link href="https://sowelu-incu.com/" className="font-medium text-black">
                ABOUT / SOWELUとは？
              </Link>
              <Link
                href="/admin"
                className="flex items-center text-black font-medium hover:text-blue-600"
              >
                <FaLock className="mr-2 text-lg" /> Admin画面
              </Link>
            </nav>
          </div>

          {/* ハンバーガーメニュー */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-black focus:outline-none"
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>

          {/* スマホメニュー */}
          {isMenuOpen && (
            <>
              <div
                className="fixed inset-0 bg-black bg-opacity-50 z-10"
                onClick={() => setIsMenuOpen(false)}
              ></div>
              <div className="absolute top-16 left-0 w-full bg-white shadow-md md:hidden z-20">
                <nav className="flex flex-col items-start p-4 space-y-4 text-sm">
                  <Link
                    href="https://sowelu-incu.com/"
                    className="font-medium text-black hover:text-blue-600"
                  >
                    ABOUT / SOWELUとは？
                  </Link>
                  <Link
                    href="/admin"
                    className="flex items-center text-black font-medium hover:text-blue-600"
                  >
                    <FaLock className="mr-2 text-lg" /> Admin画面
                  </Link>
                  <Link href="/calendar" className="text-black font-medium hover:text-blue-600">
                    RESERVE / 施設予約
                  </Link>
                  <Link href="/mypage" className="text-black font-medium hover:text-blue-600">
                    MY PAGE / マイページ
                  </Link>
                </nav>
              </div>
            </>
          )}

          {/* PC用右側リンク */}
          <div className="hidden md:flex space-x-4">
            <Link
              href="/calendar"
              className="bg-brown-600 text-white py-2 px-4 rounded hover:bg-brown-700"
            >
              RESERVE / 施設予約
            </Link>
            <Link
              href="/mypage"
              className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
            >
              MY PAGE / マイページ
            </Link>
          </div>
        </header>

        <main className="flex flex-col items-center justify-center h-screen p-4">
          {children}
        </main>
      </body>
    </html>
  );
}
