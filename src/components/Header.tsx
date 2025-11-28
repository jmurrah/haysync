import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="flex justify-center items-center w-full border-b-2">
      <div className="flex justify-between items-center w-10/12">
        <h1 className="text-5xl">
          <span className="text-[var(--logo-hay)]">hay</span>
          <span className="text-[var(--primary)] font-bold">sync</span>
        </h1>
        <ThemeToggle />
      </div>
    </header>
  );
}
