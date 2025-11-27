import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { token } = await request.json();

  // TODO: Look up token in Firestore and add requester as a member of the calendar
  return NextResponse.json({
    calendarId: "joined-calendar-id",
    token,
    message: "Join calendar placeholder",
  });
}
