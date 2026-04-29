import Link from "next/link";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="footer">
      <div>
        <Logo />
        <p>
          PlotCare is a pre-launch land intelligence and activation platform.
          Assessments are advisory and formal transactions should be reviewed by
          qualified legal and agricultural professionals.
        </p>
      </div>
      <div className="footer-links">
        <Link href="/">Home</Link>
        <Link href="/investors">Investors</Link>
        <Link href="/privacy">Privacy</Link>
        <Link href="/terms">Terms</Link>
      </div>
    </footer>
  );
}
