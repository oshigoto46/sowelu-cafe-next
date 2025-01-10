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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-4">予約カレンダー</h1>
      <Calendar
        localizer={localizer}
        events={events}
        defaultView={Views.WEEK}
        views={['week', 'day']}
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={(event) => alert(`イベント: ${event.title}`)}
        style={{ height: 600 }}
        step={30} // 30分刻み
        timeslots={2} // 1時間を2分割
      />
    </div>
  );
}
