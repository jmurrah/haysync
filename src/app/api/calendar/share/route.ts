import crypto from "crypto";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { calendarId } = await request.json();
  const token = crypto.randomBytes(16).toString("hex");
  const shareLink = `/join/${token}`; // TODO: Generate full URL and persist token mapping in Firestore

  return NextResponse.json({
    token,
    calendarId,
    shareLink,
    message: "Share token generation placeholder",
  });
}
