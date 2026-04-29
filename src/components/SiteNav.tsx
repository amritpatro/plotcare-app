import Link from "next/link";
import { ArrowIcon } from "./ArrowIcon";
import { Logo } from "./Logo";

type SiteNavProps = {
  variant?: "customer" | "investor";
};

export function SiteNav({ variant = "customer" }: SiteNavProps) {
  const isInvestor = variant === "investor";

  return (
    <nav className="nav" aria-label="Primary navigation">
      <Logo />
      <div className="nav-links">
        {isInvestor ? (
          <>
            <a href="#market">Market</a>
            <a href="#model">Model</a>
            <a href="#roadmap">Roadmap</a>
            <Link href="/">Customer site</Link>
          </>
        ) : (
          <>
            <a href="#how-it-works">How it works</a>
            <a href="#land-report">Land report</a>
            <a href="#platform">Platform</a>
            <a href="#faq">FAQ</a>
            <Link href="/investors">Investors</Link>
          </>
        )}
      </div>
      <div className="nav-actions">
        {isInvestor ? (
          <a className="button button-primary" href="#investor-brief">
            Request investor brief <ArrowIcon />
          </a>
        ) : (
          <>
            <Link className="button button-outline" href="/investors">
              Investor brief
            </Link>
            <a className="button button-primary" href="#lead-form">
              Get land report <ArrowIcon />
            </a>
          </>
        )}
      </div>
    </nav>
  );
}
