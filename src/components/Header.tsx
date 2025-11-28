import ThemeToggle from "./ThemeToggle";
import SignOutButton from "@/features/auth/components/SignOutButton";
import Logo from "./Logo";
import LayoutContainer from "./LayoutContainer";

export default function Header() {
  return (
    <header className="flex justify-center items-center w-full border-b-2">
      <LayoutContainer className="flex justify-between items-center">
        <Logo size="48px" />
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <SignOutButton />
        </div>
      </LayoutContainer>
    </header>
  );
}
