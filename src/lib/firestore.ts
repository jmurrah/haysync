import { adminDb } from "./firebase-admin";

export async function getUserCalendars(userId: string) {
  if (!adminDb) {
    // TODO: Initialize Firestore and fetch calendars for the user
    return [];
  }

  // TODO: Replace with Firestore query for calendars
  return [];
}

export async function getCalendarEvents(calendarId: string) {
  if (!adminDb) {
    // TODO: Initialize Firestore and fetch events for the calendar
    return [];
  }

  // TODO: Replace with Firestore query for events
  return [];
}
