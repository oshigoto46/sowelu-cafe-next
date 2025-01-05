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
              <a href="#" className="font-medium text-black">
                MEMBER / メンバー紹介
              </a>
              <a href="#" className="font-medium text-black">
                COMMUNITY / コミュニティ紹介
              </a>
              <a href="#" className="font-medium text-black">
                ABOUT / ネイバーとは？
              </a>
            </nav>
          </div>
          <div className="flex space-x-4">
            <button className="bg-brown-600 text-white py-2 px-4 rounded hover:bg-brown-700">
              RESERVE / 施術予約
            </button>
            <button className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800">
              MY PAGE / マイページ
            </button>
          </div>
        </header>
        <main className="flex flex-col items-center justify-center h-screen p-4">{children}</main>
      </body>
    </html>
  );
}
