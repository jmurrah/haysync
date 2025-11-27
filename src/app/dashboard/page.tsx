import CalendarList from "@/features/calendar/components/CalendarList";
import CalendarView from "@/features/calendar/components/CalendarView";

export default function DashboardPage() {
  const userId = "placeholder-user";
  const calendarId = "placeholder-calendar";

  return (
    <main>
      <h1>Dashboard placeholder</h1>
      <CalendarList userId={userId} />
      <CalendarView calendarId={calendarId} />
    </main>
  );
}
