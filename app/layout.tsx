import Link from "next/link";
import { FaLock } from "react-icons/fa";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="font-sans bg-gray-50">
        <header className="flex justify-between items-center p-4 border-b border-gray-200">
          <div className="flex items-center">
            <img
              src="/logo.svg" // ロゴ画像を適切に変更
              alt="Logo"
              className="h-10 mr-4"
            />
            <nav className="flex space-x-4 text-sm">
              <Link href="https://sowelu-incu.com/" className="font-medium text-black">
                ABOUT / SOWELUとは？
              </Link>
              <Link
                href="/admin" // Admin画面のリンク
                className="flex items-center text-black font-medium hover:text-blue-600"
              >
                <FaLock className="mr-2 text-lg" /> {/* 鍵マーク */}
                Admin画面
              </Link>
            </nav>
          </div>
          <div className="flex space-x-4">
            <Link
              href="/calendar"
              className="bg-brown-600 text-white py-2 px-4 rounded hover:bg-brown-700"
            >
              RESERVE / 施術予約
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
