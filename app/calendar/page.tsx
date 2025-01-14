'use client';

import React, { useState, useEffect } from "react";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { EventPopup } from "./EventPopup";
import '../../styles/custom-calendar.css';
import '../../app/globals.css';

const localizer = momentLocalizer(moment);

interface Event {
  id: number;
  title: string;
  start: Date;
  end: Date;
}

export default function CalendarPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentView, setCurrentView] = useState<string>("week");
  const [loading, setLoading] = useState<boolean>(true);

  // 初期データを非同期で読み込む
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true); // ローディング開始
      try {
        // サンプルイベントのシミュレーション
        const simulatedEvents: Event[] = [
          {
            id: 1,
            title: "サンプルイベント",
            start: new Date(),
            end: new Date(new Date().getTime() + 60 * 60 * 1000), // 1時間後
          },
        ];

        await new Promise((resolve) => setTimeout(resolve, 1000)); // 1秒待機
        setEvents(simulatedEvents); // イベントをセット
      } catch (error) {
        console.error("イベントの読み込み中にエラーが発生しました:", error);
      } finally {
        setLoading(false); // ローディング終了
      }
    };

    fetchEvents();
  }, []);

  const handleAddEvent = (title: string, startTime: string, endTime: string) => {
    if (selectedDate) {
      const start = new Date(selectedDate);
      const end = new Date(selectedDate);
      start.setHours(parseInt(startTime.split(":")[0], 10));
      start.setMinutes(parseInt(startTime.split(":")[1], 10));
      end.setHours(parseInt(endTime.split(":")[0], 10));
      end.setMinutes(parseInt(endTime.split(":")[1], 10));

      setEvents((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          title,
          start,
          end,
        },
      ]);
    }
  };

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
  };

  const handleViewChange = (view: string) => {
    console.log(`ビュー変更イベント: ${view}`); // ビュー変更イベントのログ
    setCurrentView(view);
  };

  // useEffect(() => {
  //   alert(`現在のビュー: ${currentView}`); // 現在のビューをアラート
  // }, [currentView]);

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start p-6">
      <div className="w-full max-w-8xl">
        <h1 className="text-2xl font-bold mb-4 text-center">予約カレンダー</h1>
        {loading ? (
          // ローディング中の表示
          <div className="flex justify-center items-center h-full">
            <p className="text-gray-500 text-lg">Loading...</p>
          </div>
        ) : (
          // カレンダーの表示
          <Calendar
            localizer={localizer}
            events={events}
            defaultView={Views.WEEK}
            views={["month", "week", "day"]}
            view = {currentView}
            selectable
            onView={handleViewChange} // ビュー変更ハンドラー
            onSelectSlot={(slotInfo) => handleSelectDate(slotInfo.start)}
            style={{
              height: "700px",
              backgroundColor: "#ffffff",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              padding: "16px",
            }}
          />
        )}
        {selectedDate && (
          <EventPopup
            date={selectedDate}
            onClose={() => setSelectedDate(null)}
            onSave={handleAddEvent}
          />
        )}
      </div>
    </div>
  );
}
