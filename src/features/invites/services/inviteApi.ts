export async function generateShareToken(calendarId: string) {
  const response = await fetch("/api/calendar/share", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ calendarId }),
  });

  // TODO: Handle response validation and persistence
  return response.json();
}

export async function joinWithToken(token: string) {
  const response = await fetch("/api/calendar/join", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  });

  // TODO: Handle response validation
  return response.json();
}
