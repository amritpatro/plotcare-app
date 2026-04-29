import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { SiteNav } from "@/components/SiteNav";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "PlotCare privacy policy placeholder for pre-launch validation.",
};

export default function PrivacyPage() {
  return (
    <main className="site-shell">
      <SiteNav />
      <article className="legal-page">
        <h1>Privacy Policy</h1>
        <p>
          PlotCare is in pre-launch validation. We collect only the details
          submitted through our forms so we can understand landowner, farmer, and
          investor interest.
        </p>
        <h2>Information collected</h2>
        <p>
          Forms may collect name, WhatsApp or phone number, email address,
          district, organization, message, audience type, submission source, and
          browser user-agent for basic debugging.
        </p>
        <h2>How it is used</h2>
        <p>
          Submissions are used to follow up, prioritize validation cohorts,
          improve the product, and prepare investor or customer brief materials.
          PlotCare should not sell personal information.
        </p>
        <h2>Storage</h2>
        <p>
          Lead data is configured to be stored in a Google Sheet controlled by
          the PlotCare team. Production launch should add a full privacy review,
          retention policy, and access controls.
        </p>
      </article>
      <Footer />
    </main>
  );
}
