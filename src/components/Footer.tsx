type FooterProps = React.HTMLAttributes<HTMLElement>;

export default function Footer(props: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer
      className="w-full flex justify-center items-center w-fill py-4"
      {...props}
    >
      <p className="text-sm text-[var(--text-muted)]">
        © {year} hay<span className="italic">sync</span>
      </p>
    </footer>
  );
}
