import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { name } = await request.json();

  // TODO: Write calendar to Firestore and associate with the current user
  return NextResponse.json({
    calendarId: "dummy-calendar-id",
    name,
    message: "Calendar creation placeholder",
  });
}
