'use client'; // クライアントサイドでのみ動作することを指定

import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // カレンダー用のスタイルをインポート
import "../../styles/custom-calendar.css"; // カスタムスタイルをインポート
import AdminSidebar from "@/components/AdminSidebar";
import "../../app/globals.css";

interface Reservation {
  id: number;
  date: string;
  title: string;
}

export default function ReservationCalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newReservationTitle, setNewReservationTitle] = useState<string>("");

  useEffect(() => {
    setSelectedDate(new Date()); // カレンダーの現在の日付
  }, []);

  const handleAddReservation = () => {
    if (!selectedDate || !newReservationTitle) {
      alert("タイトルを入力してください");
      return;
    }

    const newReservation: Reservation = {
      id: reservations.length > 0 ? Math.max(...reservations.map((res) => res.id)) + 1 : 1,
      date: selectedDate.toISOString().split("T")[0],
      title: newReservationTitle,
    };

    setReservations([...reservations, newReservation]);
    setNewReservationTitle("");
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen flex">
      <AdminSidebar className="w-1/4" />
      <div className="flex-1 bg-gray-50 p-6">
        <div className="w-full bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">予約カレンダー</h2>
          <Calendar
            value={selectedDate}
            onChange={(date: Date) => setSelectedDate(date)}
            onClickDay={(date: Date) => {
              setSelectedDate(date);
              setIsModalOpen(true);
            }}
            tileContent={({ date }: { date: Date }) => {
              const dateString = date.toISOString().split("T")[0];
              const dayReservations = reservations.filter((res) => res.date === dateString);
              return dayReservations.map((res) => (
                <div key={res.id} className="text-xs bg-blue-500 text-white rounded px-1">
                  {res.title}
                </div>
              ));
            }}
          />
        </div>

        {/* 予約一覧 */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">予約一覧</h2>
          <ul className="space-y-2">
            {reservations.map((res) => (
              <li key={res.id} className="bg-gray-100 p-4 rounded-lg shadow">
                {res.date} - {res.title}
              </li>
            ))}
          </ul>
        </div>
      </div>

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
