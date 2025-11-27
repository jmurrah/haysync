import { redirect } from "next/navigation";

export default function DashboardPage() {
  // Redirect old dashboard path to the project root (signed-in default)
  redirect("/");
}
