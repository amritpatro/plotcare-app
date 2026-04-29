import Link from "next/link";

export function Logo() {
  return (
    <Link className="brand" href="/" aria-label="PlotCare home">
      <span className="brand-mark" aria-hidden="true" />
      <span>PlotCare</span>
    </Link>
  );
}
