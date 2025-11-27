import CalendarList from "@/features/calendar/components/CalendarList";
import CalendarView from "@/features/calendar/components/CalendarView";

export default function HomePage() {
  const userId = "placeholder-user";
  const calendarId = "placeholder-calendar";

  return (
    <main>
      <h1>Haysync dashboard</h1>
      <CalendarList userId={userId} />
      <CalendarView calendarId={calendarId} />
    </main>
  );
}
