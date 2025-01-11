'use client';

import React, { useState } from "react";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
// import '../../../app/globals.css';
// import '../../app/globals.css';

const localizer = momentLocalizer(moment);

interface Event {
  id: number;
  title: string;
  start: Date;
  end: Date;
}

interface CommonCalendarProps {
  events: Event[];
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
  isAdmin?: boolean; // 管理者モードのフラグ
}

export const CommonCalendar: React.FC<CommonCalendarProps> = ({
  events,
  setEvents,
  isAdmin = false,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentView, setCurrentView] = useState<string>(Views.WEEK); // コンポーネント内に移動

  const handleSelectDate = (date: Date) => {
    if (isAdmin) {
      setSelectedDate(date);
    }
  };

  const handleViewChange = (view: string) => {
    setCurrentView(view);
    alert(`ビューが「${view}」に切り替わりました！`); // ビュー切り替え時にアラートを表示
  };

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
      setSelectedDate(null); // 日付選択の解除
    }
  };

  return (
    <div className="w-full max-w-8xl">
      <h1 className="text-2xl font-bold mb-4 text-center">
        {isAdmin ? "勤怠管理カレンダー (管理者)" : "予約カレンダー"}
      </h1>
      <Calendar
        localizer={localizer}
        events={events}
        defaultView={Views.WEEK}
        views={['month', 'week', 'day']}
        selectable
        onSelectSlot={(slotInfo) => handleSelectDate(slotInfo.start)}
        onView={handleViewChange} // ビュー変更時のイベント
        style={{
          height: "700px",
          backgroundColor: "#ffffff",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          padding: "16px",
        }}
      />
      {isAdmin && selectedDate && (
        <div className="mt-4 p-4 bg-gray-100 border rounded">
          <h3 className="text-lg font-bold mb-2">新しいイベントを追加</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.target as typeof e.target & {
                title: { value: string };
                startTime: { value: string };
                endTime: { value: string };
              };
              handleAddEvent(form.title.value, form.startTime.value, form.endTime.value);
            }}
          >
            <div className="mb-2">
              <label className="block text-sm font-medium">イベント名</label>
              <input
                name="title"
                type="text"
                className="w-full px-2 py-1 border rounded"
                required
              />
            </div>
            <div className="flex gap-2 mb-2">
              <div>
                <label className="block text-sm font-medium">開始時間</label>
                <input
                  name="startTime"
                  type="time"
                  className="w-full px-2 py-1 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">終了時間</label>
                <input
                  name="endTime"
                  type="time"
                  className="w-full px-2 py-1 border rounded"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              保存
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
