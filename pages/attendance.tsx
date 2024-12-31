import { useEffect, useState } from "react";

// Attendance 型を明示的に定義
interface Attendance {
  id: number;
  userId: number;
  timestamp: string;
}

export default function AttendancePage() {
  const [userId, setUserId] = useState<number | "">("");
  const [attendances, setAttendances] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // APIから出退勤記録を取得する関数
  const fetchAttendances = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/attendances");
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data: Attendance[] = await response.json();
      setAttendances(data);
    } catch (err) {
      setErrorMessage("Failed to fetch attendance records.");
      console.error(err); // error を適切にログで使用
    } finally {
      setLoading(false);
    }
  };

  // ページロード時にデータを取得
  useEffect(() => {
    fetchAttendances();
  }, []);

  // 出退勤記録を送信する関数
  const handleSubmit = async () => {
    if (!userId) {
      setErrorMessage("User ID is required.");
      return;
    }

    try {
      const response = await fetch("/api/attendances", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to record attendance.");
      }

      const data: Attendance = await response.json();
      setSuccessMessage(`Attendance recorded successfully at ${data.timestamp}`);
      setErrorMessage(null);
      fetchAttendances(); // 新しい記録を取得して一覧を更新
    } catch (err) {
      setSuccessMessage(null);
      setErrorMessage((err as Error).message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold my-4">Attendance Management</h1>

      {/* フォーム */}
      <div className="w-full max-w-md bg-white p-4 shadow-md rounded mb-8">
        <h2 className="text-xl font-bold mb-4">Record Attendance</h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            User ID
            <input
              type="number"
              value={userId}
              onChange={(e) => setUserId(Number(e.target.value) || "")}
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
        <h2 className="text-xl font-bold mb-4">Attendance Records</h2>
        {loading ? (
          <div>Loading...</div>
        ) : attendances.length === 0 ? (
          <div>No attendance records found.</div>
        ) : (
          <table className="table-auto border-collapse border border-gray-400 w-full">
            <thead>
              <tr>
                <th className="border border-gray-400 px-4 py-2">ID</th>
                <th className="border border-gray-400 px-4 py-2">User ID</th>
                <th className="border border-gray-400 px-4 py-2">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {attendances.map((attendance) => (
                <tr key={attendance.id}>
                  <td className="border border-gray-400 px-4 py-2 text-center">{attendance.id}</td>
                  <td className="border border-gray-400 px-4 py-2 text-center">{attendance.userId}</td>
                  <td className="border border-gray-400 px-4 py-2 text-center">
                    {new Intl.DateTimeFormat("en-US", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    }).format(new Date(attendance.timestamp))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
