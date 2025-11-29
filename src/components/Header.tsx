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
    <header className="w-full flex justify-center items-center" {...props}>
      <div className="w-full flex items-center justify-between py-4">
        <div className="flex-1 flex justify-start items-center gap-2">
          <h1 className="text-4xl">
            hay<span className="italic">sync</span>
          </h1>
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
