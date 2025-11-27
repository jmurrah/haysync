"use client";

import { FormEvent, useState } from "react";
import { addEvent } from "../services/calendarApi";

type EventFormProps = {
  calendarId: string;
};

export default function EventForm({ calendarId }: EventFormProps) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await addEvent({ calendarId, title, date });
    setTitle("");
    setDate("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="event-title">Title</label>
        <input
          id="event-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Event title"
        />
      </div>
      <div>
        <label htmlFor="event-date">Date/Time</label>
        <input
          id="event-date"
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="When"
        />
      </div>
      <button type="submit">Add event</button>
    </form>
  );
}
