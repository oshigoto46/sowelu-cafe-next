import { useEffect, useState } from "react";
import "../app/globals.css";

// User 型を定義
interface User {
  id: number;
  name: string;
  email: string;
}

export default function UserPage() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // APIからユーザーを取得する関数
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/users");
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data: User[] = await response.json();
      setUsers(data);
    } catch (err) {
      setErrorMessage("Failed to fetch user records.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ページロード時にデータを取得
  useEffect(() => {
    fetchUsers();
  }, []);

  // ユーザーを作成する関数
  const handleSubmit = async () => {
    if (!name || !email) {
      setErrorMessage("Name and email are required.");
      return;
    }

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create user.");
      }

      const data: User = await response.json();
      setSuccessMessage(`User created successfully: ${data.name} (${data.email})`);
      setErrorMessage(null);
      fetchUsers(); // 新しい記録を取得して一覧を更新
      setName("");
      setEmail("");
    } catch (err) {
      setSuccessMessage(null);
      setErrorMessage((err as Error).message);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f8f7]">
      {/* ヘッダー */}
      <header className="w-full bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
          {/* ロゴ */}
          <div className="flex items-center">
            <img src="/logo.svg" alt="Logo" className="h-8 w-auto" />
          </div>

          {/* ナビゲーション */}
          <nav className="flex space-x-8 text-sm font-medium text-gray-700">
            <a href="#member" className="hover:text-black">
              MEMBER / メンバー紹介
            </a>
            <a href="#community" className="hover:text-black">
              COMMUNITY / コミュニティ紹介
            </a>
            <a href="#about" className="hover:text-black">
              ABOUT / ネイバーウォークとは？
            </a>
          </nav>

          {/* ボタン */}
          <div className="flex space-x-4">
            <a
              href="#reserve"
              className="px-4 py-2 bg-[#a67a5b] text-white rounded text-sm font-medium"
            >
              RESERVE<br />施設予約
            </a>
            <a
              href="#mypage"
              className="px-4 py-2 bg-black text-white rounded text-sm font-medium"
            >
              MY PAGE<br />マイページ
            </a>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-7xl mx-auto p-4 mt-8">
        {/* フォームセクション */}
        <section className="bg-white p-6 shadow-md rounded-lg mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Create User</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              />
            </div>
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            >
              Submit
            </button>
          </form>
          {successMessage && (
            <div className="mt-4 p-3 text-green-800 bg-green-100 border border-green-400 rounded-lg">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="mt-4 p-3 text-red-800 bg-red-100 border border-red-400 rounded-lg">
              {errorMessage}
            </div>
          )}
        </section>

        {/* ユーザー一覧セクション */}
        <section className="bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">User Records</h2>
          {loading ? (
            <p className="text-gray-600">Loading...</p>
          ) : users.length === 0 ? (
            <p className="text-gray-600">No user records found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="table-auto w-full border border-gray-300">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left text-sm text-gray-700">
                      ID
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-sm text-gray-700">
                      Name
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-sm text-gray-700">
                      Email
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr
                      key={user.id}
                      className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                    >
                      <td className="border border-gray-300 px-4 py-2">{user.id}</td>
                      <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                      <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
