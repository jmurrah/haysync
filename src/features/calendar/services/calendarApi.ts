export type CreateCalendarPayload = {
  name: string;
};

export type ShareCalendarPayload = {
  calendarId: string;
};

export type JoinCalendarPayload = {
  token: string;
};

export type AddEventPayload = {
  calendarId: string;
  title: string;
  date: string;
};

export async function createCalendar(payload: CreateCalendarPayload) {
  const response = await fetch("/api/calendar/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  // TODO: Validate response and handle errors
  return response.json();
}

export async function shareCalendar(payload: ShareCalendarPayload) {
  const response = await fetch("/api/calendar/share", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  // TODO: Persist token and handle errors
  return response.json();
}

export async function joinCalendar(payload: JoinCalendarPayload) {
  const response = await fetch("/api/calendar/join", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  // TODO: Handle membership updates and errors
  return response.json();
}

export async function addEvent(payload: AddEventPayload) {
  // TODO: Implement call to events API route once available
  return Promise.resolve({ id: "placeholder-event-id", ...payload });
}
