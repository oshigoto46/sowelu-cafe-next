import { useEffect, useState } from "react";

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
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold my-4">User Management</h1>

      {/* フォーム */}
      <div className="w-full max-w-md bg-white p-4 shadow-md rounded mb-8">
        <h2 className="text-xl font-bold mb-4">Create User</h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </label>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </label>
        </div>

        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
        >
          Submit
        </button>

        {successMessage && (
          <div className="mt-4 p-2 text-green-700 bg-green-100 border border-green-400 rounded">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="mt-4 p-2 text-red-700 bg-red-100 border border-red-400 rounded">
            {errorMessage}
          </div>
        )}
      </div>

      {/* 一覧 */}
      <div className="w-full max-w-3xl bg-white p-4 shadow-md rounded">
        <h2 className="text-xl font-bold mb-4">User Records</h2>
        {loading ? (
          <div>Loading...</div>
        ) : users.length === 0 ? (
          <div>No user records found.</div>
        ) : (
          <table className="table-auto border-collapse border border-gray-400 w-full">
            <thead>
              <tr>
                <th className="border border-gray-400 px-4 py-2">ID</th>
                <th className="border border-gray-400 px-4 py-2">Name</th>
                <th className="border border-gray-400 px-4 py-2">Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="border border-gray-400 px-4 py-2 text-center">{user.id}</td>
                  <td className="border border-gray-400 px-4 py-2 text-center">{user.name}</td>
                  <td className="border border-gray-400 px-4 py-2 text-center">{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
