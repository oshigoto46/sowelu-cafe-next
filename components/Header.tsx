import React from "react";

export default function Header() {
  return (
    <header className="w-full bg-white text-gray-800 py-4 shadow-md">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* ロゴ */}
        <div className="text-xl font-bold tracking-wide">打刻システム</div>

        {/* ナビゲーション */}
        <nav className="flex space-x-6 text-sm font-medium">
          <a
            href="#member"
            className="hover:text-black transition"
          >
            MEMBER / メンバー紹介
          </a>
          <a
            href="#community"
            className="hover:text-black transition"
          >
            COMMUNITY / コミュニティ紹介
          </a>
          <a
            href="#about"
            className="hover:text-black transition"
          >
            ABOUT / ネイバーウォークとは？
          </a>
        </nav>
      </div>
    </header>
  );
}
