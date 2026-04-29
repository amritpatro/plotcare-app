import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { SiteNav } from "@/components/SiteNav";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "PlotCare terms placeholder for pre-launch validation.",
};

export default function TermsPage() {
  return (
    <main className="site-shell">
      <SiteNav />
      <article className="legal-page">
        <h1>Terms of Use</h1>
        <p>
          PlotCare is a pre-launch concept and validation site. The information
          shown here is for product exploration and should not be treated as
          legal, financial, agricultural, or investment advice.
        </p>
        <h2>No guaranteed outcomes</h2>
        <p>
          Land use recommendations, income ranges, and activation ideas are
          advisory. Any land transaction, lease, crop plan, solar lease, or
          revenue arrangement should be reviewed by qualified professionals.
        </p>
        <h2>Investor materials</h2>
        <p>
          Investor-facing content describes a pre-launch opportunity and
          validation plan. It does not claim current revenue, live pilots,
          government partnerships, or a securities offering.
        </p>
        <h2>Launch readiness</h2>
        <p>
          Before commercial launch, these terms should be replaced by counsel-
          reviewed terms covering data handling, liability, agreements, disputes,
          payments, and jurisdiction.
        </p>
      </article>
      <Footer />
    </main>
  );
}
