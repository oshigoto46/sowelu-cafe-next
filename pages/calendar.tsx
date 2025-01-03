import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // カレンダー用のスタイルをインポート
import "../styles/custom-calendar.css"; // カスタムスタイルをインポート
import "../app/globals.css";
import Header from "../components/Header";

interface Reservation {
  id: number;
  date: string;
  title: string;
}

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [hoveredDate, setHoveredDate] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newReservationTitle, setNewReservationTitle] = useState<string>("");

  const handleAddReservation = () => {
    if (!selectedDate || !newReservationTitle) {
      alert("タイトルを入力してください");
      return;
    }

    const newReservation: Reservation = {
      id: Date.now(),
      date: selectedDate.toISOString().split("T")[0],
      title: newReservationTitle,
    };

    setReservations([...reservations, newReservation]);
    setNewReservationTitle("");
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* ヘッダー */}
      <Header />

      {/* メインコンテンツ */}
      <main className="max-w-7xl mx-auto mt-8 bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">予約カレンダー</h2>

        {/* カレンダー */}
        <div className="calendar-container mb-6">
          <Calendar
            onChange={(date) => setSelectedDate(date as Date)}
            onClickDay={(date) => {
              setSelectedDate(date);
              setIsModalOpen(true);
            }}
            tileContent={({ date }) => {
              const dateString = date.toISOString().split("T")[0];
              const dayReservations = reservations.filter(
                (res) => res.date === dateString
              );

              return (
                <div
                  onMouseEnter={() => setHoveredDate(dateString)}
                  onMouseLeave={() => setHoveredDate(null)}
                  className="relative w-full h-full"
                >
                  {dayReservations.map((res) => (
                    <div
                      key={res.id}
                      className="text-xs bg-blue-500 text-white rounded px-1"
                    >
                      {res.title}
                    </div>
                  ))}
                  {hoveredDate === dateString && (
                    <button
                      onClick={() => {
                        setSelectedDate(date);
                        setIsModalOpen(true);
                      }}
                      className="absolute top-1 left-1 bg-blue-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center hover:bg-blue-600"
                    >
                      ＋
                    </button>
                  )}
                </div>
              );
            }}
          />
        </div>

        {/* 予約一覧 */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">予約一覧</h2>
          {reservations.length === 0 ? (
            <p className="text-gray-500">予約はありません。</p>
          ) : (
            <ul className="space-y-2">
              {reservations.map((res) => (
                <li
                  key={res.id}
                  className="bg-gray-100 p-4 rounded-lg shadow flex justify-between items-center"
                >
                  <span className="text-gray-800">
                    {res.date} - {res.title}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>

      {/* モーダル */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {selectedDate?.toISOString().split("T")[0]} に予約を追加
            </h3>
            <input
              type="text"
              value={newReservationTitle}
              onChange={(e) => setNewReservationTitle(e.target.value)}
              placeholder="予約タイトルを入力"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            />
            <div className="mt-4 flex space-x-4">
              <button
                onClick={handleAddReservation}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
              >
                追加
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-400"
              >
                キャンセル
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
