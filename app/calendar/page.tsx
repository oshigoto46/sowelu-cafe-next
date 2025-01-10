'use client';

import React, { useState } from 'react';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
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

  // スロット（時間範囲）選択時の処理
  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    const title = window.prompt('新しいイベントのタイトルを入力してください:');
    if (title) {
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

  // 日付クリック時の処理（`month` ビュー用）
  const handleSelectDate = (date: Date) => {
    const title = window.prompt(`${moment(date).format('YYYY-MM-DD')} のイベントタイトルを入力してください:`);
    if (title) {
      setEvents((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          title,
          start: date,
          end: moment(date).add(1, 'hours').toDate(), // デフォルト1時間のイベント
        },
      ]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-4">予約カレンダー</h1>
      <Calendar
        localizer={localizer}
        events={events}
        defaultView={Views.MONTH} // デフォルトを月間表示に
        views={['month', 'week', 'day']} // 表示を月、週、日で切り替え可能
        selectable
        onSelectSlot={handleSelectSlot} // 時間スロット選択時の処理
        onSelectEvent={(event) => alert(`イベント: ${event.title}`)} // イベントクリック時の処理
        onDrillDown={handleSelectDate} // 月表示での日付クリック処理
        style={{ height: 600 }}
        step={30} // 30分刻み（週・日ビュー用）
        timeslots={2} // 1時間を2分割（週・日ビュー用）
      />
    </div>
  );
}
