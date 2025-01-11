'use client';

import React, { useState } from "react";
import { CommonCalendar } from "@/components/CommonCalendar";
import '../../../app/globals.css';
// import '../../app/globals.css';

interface Event {
  id: number;
  title: string;
  start: Date;
  end: Date;
}

export default function AdminCalendarPage() {
  const [events, setEvents] = useState<Event[]>([]);

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start p-6">
      <CommonCalendar events={events} setEvents={setEvents} isAdmin={true} />
    </div>
  );
}
