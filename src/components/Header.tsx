"use client";

import ThemeToggle from "./ThemeToggle";
import SignOutButton from "@/features/auth/components/SignOutButton";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";

type HeaderProps = React.HTMLAttributes<HTMLElement>;

export default function Header(props: HeaderProps) {
  const { user } = useCurrentUser();

  if (!user) {
    return null;
  }

  return (
    <header className="w-full" {...props}>
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex-1">
          <ThemeToggle />
        </div>
        <div className="flex-1 flex justify-center" />
        <div className="flex-1 flex justify-end">
          {user ? <SignOutButton /> : null}
        </div>
      </div>
    </header>
  );
}
