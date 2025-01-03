import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-[#f9f8f7] min-h-screen">
      {/* ヘッダー */}
      <header className="w-full flex justify-between items-center px-8 py-4 bg-white border-b border-gray-200">
        {/* ロゴ */}
        <div className="flex items-center">
          <Image src="/logo.svg" alt="Logo" width={50} height={50} />
        </div>

        {/* ナビゲーション */}
        <nav className="flex space-x-6 text-sm font-medium text-gray-700">
          <Link href="https://sowelu.neighborwork.jp/" className="hover:text-black">
            ABOUT / CafeSowelとは
          </Link>
          <a href="#news" className="hover:text-black">
            NEWS / お知らせ
          </a>
        </nav>

        {/* ボタン */}
        <div className="flex space-x-4">
          <Link href="/calendar" className="px-4 py-2 bg-[#a67a5b] text-white rounded text-sm font-medium">
            RESERVE
            <br />
            施設予約
          </Link>
          <a
            href="#mypage"
            className="px-4 py-2 bg-black text-white rounded text-sm font-medium"
          >
            MY PAGE
            <br />
            マイページ
          </a>
        </div>
      </header>

      {/* メインセクション */}
      <main className="flex flex-col items-center mt-12">
        <p className="text-gray-700 text-lg">会員の方は下記からログインしてください</p>
        <a
          href="#login"
          className="mt-4 px-8 py-3 bg-gray-800 text-white rounded text-sm font-medium flex items-center"
        >
          ログイン
          <span className="ml-2">&rarr;</span>
        </a>
      </main>
    </div>
  );
}
