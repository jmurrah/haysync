export interface Calendar {
  id: string;
  name: string;
  ownerId: string;
}

export interface CalendarEvent {
  id: string;
  calendarId: string;
  title: string;
  date: string;
  description?: string;
}

export interface CalendarMember {
  userId: string;
  role: "owner" | "editor" | "viewer";
}
