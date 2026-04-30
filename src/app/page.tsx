/*
Phase 2 enhancement changelog:
1. Replaced static land-map mockups with live Leaflet maps centered on Visakhapatnam.
2. Added an 18 percent opacity hero video layer with graceful missing-file fallback.
3. Added subtle breathing motion to the hero topographic SVG at 0.06 opacity.
4. Added a fixed 3px amber-to-terracotta scroll progress bar.
5. Added isolated 30 percent scroll-speed parallax for the hero topographic wrapper.
6. Added WhatsApp chat entry points in the hero, farmer section, and footer.
7. Replaced lead submission with Airtable posting plus console lead fallback.
8. Added the Investor Metrics section on the investor page.
9. Added the Land Pulse NDVI health-report section between landowners and farmers.
10. Added a schematic Andhra Pradesh district map with Visakhapatnam highlighted.
*/
/*
Phase 2 bug and security audit changelog:
- Guarded browser-only DOM access and Leaflet initialization behind client effects.
- Kept scroll DOM writes inside requestAnimationFrame with passive scroll listeners.
- Added a CSP meta tag for the external CDNs and APIs used by Phase 2.
- Avoided innerHTML for user/API text, keeping AI and lead messages as React text.
- Added the Airtable browser-token warning and removed hardcoded token assumptions.
- Added reduced-motion overrides for decorative animation and parallax layers.
- Isolated parallax transforms on a wrapper so the inner SVG pulse can animate safely.
- Added mobile single-column rules, 48px touch targets, required district selection, tel patterns, and active pill classes.
- Added runSuccessAnimation before form submission calls use it.
*/
import { AiAdvisor } from "@/components/AiAdvisor";
import { ArrowIcon } from "@/components/ArrowIcon";
import { FaqAccordion } from "@/components/FaqAccordion";
import { FeatureTabs } from "@/components/FeatureTabs";
import { Footer } from "@/components/Footer";
import { HeroBackgroundLayers } from "@/components/HeroBackgroundLayers";
import { LeafletMap } from "@/components/LeafletMap";
import { LeadForm } from "@/components/LeadForm";
import { SiteNav } from "@/components/SiteNav";
import { ScrollProgress } from "@/components/ScrollProgress";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import Image from "next/image";

const basePath = process.env.PAGES_BASE_PATH ?? "";
const imagePath = (path: string) => `${basePath}${path}`;

const problemCards = [
  {
    title: "Owners cannot see what the land can become",
    copy: "Survey numbers and memory are not enough for urban and NRI owners. They need a clean land profile before they can trust any use case.",
  },
  {
    title: "Farmers need access without buying land",
    copy: "Many capable farmers and operators need land access, not ownership. PlotCare is designed to make that matching process structured.",
  },
  {
    title: "Idle land needs a managed operating layer",
    copy: "Land activation is not one transaction. It needs mapping, suitability checks, partner matching, agreements, and ongoing updates.",
  },
];

const useCases = [
  {
    title: "Prawn and fish farming",
    label: "Water-led opportunity",
    copy: "Works only when water retention, inlet quality, permissions, and an experienced operator are confirmed.",
    image: imagePath("/images/aquaculture-ponds-real.jpg"),
    alt: "Real fish farming pond with aeration equipment",
    requirements: ["Min land 0.5-1 ac", "Water depth 4-6 ft", "Temp 24-32 C"],
  },
  {
    title: "Solar land leasing",
    label: "Open-land thesis",
    copy: "Best for flat, non-shaded land where road access, grid proximity, and lease tenure can be checked early.",
    image: imagePath("/images/solar-land-lease-real.jpg"),
    alt: "Real solar panels installed across open land",
    requirements: ["Min land 2-5 ac", "Low shade", "Grid access nearby"],
  },
  {
    title: "Nursery and medicinal herbs",
    label: "Demand-nearby thesis",
    copy: "Needs reliable water, shade-net or greenhouse planning, and nearby buyers before planting inventory.",
    image: imagePath("/images/nursery-herbs-real.jpg"),
    alt: "Real plant nursery rows inside a protected growing area",
    requirements: ["Min land 0.25 ac", "Temp 20-34 C", "Daily water access"],
  },
  {
    title: "Sericulture and beekeeping",
    label: "Microclimate thesis",
    copy: "Depends on vegetation, low chemical drift, seasonal flowering, and a trained local caretaker.",
    image: imagePath("/images/beekeeping-sericulture-real.jpg"),
    alt: "Real honey bees on a hive frame",
    requirements: ["Min land 0.25 ac", "Low pesticide zone", "Shade and flora"],
  },
  {
    title: "Traditional crop match",
    label: "Farmer-partner thesis",
    copy: "For owners who want a practical first activation with local crop knowledge and simple seasonal terms.",
    image: imagePath("/images/crop-match-real.jpg"),
    alt: "Real farmers inspecting a healthy crop field",
    requirements: ["Min land 1 ac", "Soil and crop history", "Seasonal water"],
  },
];

const mushroomRequirements = [
  "Min land 0.05-0.25 ac",
  "Temp 20-30 C",
  "Humidity 70-90%",
  "Shade and clean water",
];

const trustSafeguards = [
  {
    icon: "ID",
    title: "Aadhaar/KYC-ready farmers",
    copy: "Partner onboarding is designed around identity checks, references, and local operating history before owner approval.",
  },
  {
    icon: "LAW",
    title: "AP land-use review",
    copy: "Lease terms and use-case recommendations are flagged for Andhra Pradesh land, zoning, and tenancy review.",
  },
  {
    icon: "DOC",
    title: "Encrypted document vault",
    copy: "Survey notes, ownership files, reports, and partner documents stay organized behind account access.",
  },
  {
    icon: "MAP",
    title: "Satellite-crosschecked boundaries",
    copy: "Plot locations can be checked against satellite views, owner inputs, and government map references.",
  },
  {
    icon: "PAY",
    title: "Escrow-ready revenue flow",
    copy: "Revenue tracking is structured for transparent crop updates, partner payouts, and owner transfer records.",
  },
];

const trustTags = [
  "MeeBhoomi ready",
  "Bhuvan reference",
  "DILRMP records",
  "Aadhaar KYC",
  "DigiLocker workflow",
];

const betaFeedback = [
  {
    quote:
      "I inherited land near Vizag and had no practical way to judge what to do with it. A report-first approach feels much more trustworthy than jumping into a lease.",
    person: "Urban landowner interview, Hyderabad",
  },
  {
    quote:
      "If the owner knows the land is being assessed properly, farmer matching becomes easier. The missing piece is a neutral workflow everyone can trust.",
    person: "Farmer partner discovery call, AP coast",
  },
  {
    quote:
      "For investors, the interesting part is not just land discovery. It is whether PlotCare can repeat the operating playbook district by district.",
    person: "Angel investor feedback, pre-seed review",
  },
];

const faqs = [
  {
    question: "Is PlotCare already operating live projects?",
    answer:
      "PlotCare is pre-launch. This site is designed to collect landowner, farmer, and investor interest while the first validation pilots are prepared.",
  },
  {
    question: "Will the first Land Intelligence Report be legally binding?",
    answer:
      "No. The first report is advisory. It helps a landowner understand possible uses, risks, and next steps before any formal agreement or legal review.",
  },
  {
    question: "Can a landowner use PlotCare without visiting the land?",
    answer:
      "That is the core customer problem. PlotCare is designed for absentee owners who can share survey, village, and location context remotely.",
  },
  {
    question: "How will farmers be verified?",
    answer:
      "Verification is part of the planned operating workflow. The initial pilot will validate references, identity checks, land-use fit, and partner reliability before scale.",
  },
];

export default function Home() {
  return (
    <main className="site-shell">
      <ScrollProgress />
      <SiteNav />

      <section className="hero" id="top">
        <HeroBackgroundLayers basePath={basePath} />
        <div className="hero-content">
          <div className="eyebrow"><span className="dot" /> Starting with Andhra Pradesh idle land</div>
          <h1 className="headline">
            Your land exists. Make it <span>earn.</span>
          </h1>
          <p className="subhead">
            PlotCare helps landowners understand what their exact plot can grow,
            lease, or produce, then prepares the path toward verified farmer and
            production partner activation.
          </p>
          <div className="inline-actions" style={{ marginTop: 34 }}>
            <a className="button button-primary" href="#lead-form">
              Request land report <ArrowIcon />
            </a>
            <a className="button button-outline" href="#how-it-works">
              See workflow
            </a>
          </div>
          <WhatsAppLink
            className="hero-whatsapp"
            message="Hi PlotCare, I want to understand what my land can earn."
          />
          <div className="hero-proof">
            <div className="proof-chip">Pre-launch validation focused on Visakhapatnam and AP landowners.</div>
            <div className="proof-chip">Designed for absentee, urban, and NRI land ownership realities.</div>
            <div className="proof-chip">No guaranteed income claims; suitability comes before activation.</div>
          </div>
          <AiAdvisor
            source="hero"
            placeholder="Describe your land's location, size, water access, or current condition..."
          />
        </div>

        <div id="lead-form" className="hero-side">
          <LeadForm
            mode="customer"
            source="hero"
            title="Analyse your land free"
            copy="Join the first PlotCare validation list and get a structured review of your plot's activation potential."
          />
        </div>
      </section>

      <section className="section paper">
        <div className="section-inner">
          <p className="section-kicker">The problem</p>
          <h2 className="section-title">
            Idle land is not just unused property. It is an unmanaged asset class.
          </h2>
          <p className="section-copy">
            PlotCare focuses on the trust gap between landowners who are far from
            their plots and local operators who could activate that land.
          </p>
          <div className="grid-3">
            {problemCards.map((card) => (
              <article className="card" key={card.title}>
                <h3>{card.title}</h3>
                <p>{card.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section dark topo" id="how-it-works">
        <div className="section-inner">
          <p className="section-kicker">How it works</p>
          <h2 className="section-title">From plot details to an activation plan.</h2>
          <div className="grid-3">
            {[
              ["Locate", "Collect survey, village, and map context to form a digital plot profile."],
              ["Assess", "Rank land use cases by fit, risk, effort, and expected revenue logic."],
              ["Activate", "Match the right partner type and prepare a pilot-ready agreement workflow."],
            ].map(([title, copy]) => (
              <article className="card dark-card" key={title}>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section sage" id="land-report">
        <div className="section-inner grid-2" style={{ alignItems: "center" }}>
          <div>
            <p className="section-kicker">Land Intelligence Report</p>
            <h2 className="section-title">
              A decision layer before anyone touches the land.
            </h2>
            <p className="section-copy">
              The report is designed to tell owners what is realistic, what is
              risky, and what to validate next. It keeps the pitch honest:
              suitability first, activation second.
            </p>
            <div className="report-points">
              <div><strong>Land area</strong><span>Owner-provided acreage and location context</span></div>
              <div><strong>Water and shade</strong><span>Suitability signals before use-case matching</span></div>
              <div><strong>Investment reality</strong><span>Clear zero, shared, or owner-funded assumptions</span></div>
            </div>
          </div>
          <div className="dashboard">
            <LeafletMap
              className="map-window"
              label="Live Visakhapatnam land report map"
            />
            <div className="dashboard-row"><span>Plot profile</span><strong>2.4 acres, AP coast</strong></div>
            <div className="dashboard-row"><span>Top fit</span><strong>Mushroom + nursery pilot</strong></div>
            <div className="dashboard-row"><span>Next step</span><strong>Water and access validation</strong></div>
          </div>
        </div>
      </section>

      <section className="section paper use-cases-section" id="use-cases">
        <div className="section-inner">
          <p className="section-kicker">Land use cases</p>
          <h2 className="section-title">
            From shaded plots to coastal land, every activation needs a fit check.
          </h2>
          <p className="section-copy">
            These are not guaranteed returns. They are validation paths that
            PlotCare can help a landowner evaluate before committing land,
            money, or trust to a partner.
          </p>
          <div className="mushroom-feature">
            <Image
              src={imagePath("/images/mushroom-cultivation.png")}
              alt="Mushroom cultivation bags growing inside a tidy shed"
              width={1200}
              height={800}
            />
            <div>
              <p className="section-kicker">Featured use case</p>
              <h3>Mushroom cultivation for shaded, humid plots</h3>
              <p>
                The first report flow can check shade, water, access, partner
                availability, and setup assumptions before positioning mushroom
                cultivation as a credible pilot.
              </p>
              <div className="requirement-list">
                {mushroomRequirements.map((requirement) => (
                  <span key={requirement}>{requirement}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="use-case-grid">
            {useCases.map((item) => (
              <article className="use-card" key={item.title}>
                <Image
                  className="use-card-image"
                  src={item.image}
                  alt={item.alt}
                  width={900}
                  height={620}
                />
                <div className="use-card-body">
                  <span>{item.label}</span>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                  <div className="requirement-list compact">
                    {item.requirements.map((requirement) => (
                      <span key={requirement}>{requirement}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
          <p className="requirements-note">
            Land, temperature, water, shade, and permit ranges are indicative
            starting checks. The final report should confirm local conditions
            before any owner or farmer commits.
          </p>
        </div>
      </section>

      <section className="section dark" id="platform">
        <div className="section-inner">
          <p className="section-kicker">The platform</p>
          <h2 className="section-title">
            Everything needed to move from idle plot to managed activation.
          </h2>
          <FeatureTabs />
        </div>
      </section>

      <section className="section paper landowner-section">
        <div className="section-inner grid-2" style={{ alignItems: "center" }}>
          <div>
            <p className="section-kicker">For landowners</p>
            <h2 className="section-title">
              Whether you are in Bangalore, Dubai, or ten minutes away, your land gets a clearer plan.
            </h2>
            <ul className="benefit-list">
              <li>Know where your plot is and what condition it appears to be in.</li>
              <li>Understand what the land can realistically grow, lease, or support.</li>
              <li>Shortlist partner types only after the land-use thesis is checked.</li>
              <li>Store report notes, documents, and follow-up tasks in one workflow.</li>
              <li>Track validation milestones before any formal commercial launch.</li>
            </ul>
          </div>
          <div className="phone-mock" aria-label="PlotCare mobile dashboard preview">
            <div className="phone-screen">
              <strong>PlotCare</strong>
              <div className="phone-tile"><span>Plot</span><b>VZK-2841 · 2.4 ac</b></div>
              <div className="phone-tile"><span>Top thesis</span><b>Mushroom + nursery</b></div>
              <div className="phone-tile"><span>Readiness score</span><b>78 / 100</b></div>
              <div className="phone-tile"><span>Next validation</span><b>Water access check</b></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section dark land-pulse-section">
        <div className="section-inner land-pulse-grid">
          <div>
            <p className="section-kicker">Land Pulse</p>
            <h2 className="section-title">
              Satellite health signals make remote land ownership less blind.
            </h2>
            <p className="section-copy">
              The report mockup shows how PlotCare can translate NDVI-style
              vegetation health, water stress, and access signals into a
              landowner-friendly readiness view before activation.
            </p>
          </div>
          <div className="ndvi-card" aria-label="NDVI satellite health report mockup">
            <div className="ndvi-header">
              <span>NDVI health report</span>
              <strong>VZK-2841</strong>
            </div>
            <div className="ndvi-tiles" aria-hidden="true">
              {Array.from({ length: 36 }).map((_, index) => (
                <span key={index} className={`ndvi-tile ndvi-${index % 5}`} />
              ))}
            </div>
            <div className="ndvi-readouts">
              <div><span>Vegetation</span><strong>74 / 100</strong></div>
              <div><span>Water stress</span><strong>Medium</strong></div>
              <div><span>Action</span><strong>Verify irrigation</strong></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section paper" id="for-farmers">
        <div className="section-inner grid-2" style={{ alignItems: "start" }}>
          <div>
            <p className="section-kicker">For farmers and operators</p>
            <h2 className="section-title">
              Access land without carrying the full cost of ownership.
            </h2>
            <p className="section-copy">
              PlotCare will validate a farmer partner network for cultivation,
              nursery, mushroom, aquaculture, and other land-backed production
              models. The goal is practical access, clear terms, and better
              owner trust.
            </p>
            <a className="button button-dark" href="#farmer-form">
              Apply as farmer partner <ArrowIcon />
            </a>
            <WhatsAppLink
              className="farmer-whatsapp"
              message="Hi PlotCare, I want to apply as a farmer or operator partner."
            />
          </div>
          <div id="farmer-form">
            <LeadForm
              mode="customer"
              source="farmer_partner"
              title="Farmer partner interest"
              copy="Tell us where you operate and what kind of land you are looking for."
              defaultAudience="farmer"
              light
            />
          </div>
        </div>
      </section>

      <section className="section sage">
        <div className="section-inner">
          <p className="section-kicker">Early feedback</p>
          <h2 className="section-title">
            The response we are designing for: cautious, practical, and trust-first.
          </h2>
          <p className="section-copy">
            These are discovery and beta-style comments, not paid customer
            testimonials. Replace them with verified customer reviews after the
            first pilots.
          </p>
          <div className="review-grid">
            {betaFeedback.map((item) => (
              <figure className="quote-card" key={item.person}>
                <blockquote>&ldquo;{item.quote}&rdquo;</blockquote>
                <figcaption>{item.person}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section sage protection-section" id="trust">
        <div className="section-inner protection-inner">
          <p className="section-kicker dot-kicker">Built on trust</p>
          <h2 className="section-title">
            Your land is your most valuable asset. We are built around protecting it.
          </h2>
          <div className="trust-card-grid">
            {trustSafeguards.map((item) => (
              <article className="trust-card" key={item.title}>
                <span className="trust-icon">{item.icon}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
          <div className="trust-tag-row" aria-label="Trust workflow references">
            {trustTags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <p className="trust-note">
            Final agreements, permissions, land title checks, and tax treatment
            still require qualified local review before activation.
          </p>
        </div>
      </section>

      <section className="section paper">
        <div className="section-inner">
          <p className="section-kicker">How PlotCare can make money</p>
          <h2 className="section-title">
            A simple model that starts with insight and grows with activation.
          </h2>
          <div className="revenue-grid">
            {[
              ["Land report", "A diagnostic entry product for owners not ready to activate yet."],
              ["Owner workspace", "Subscription potential for document readiness, reports, and updates."],
              ["Activation commission", "Future transaction-linked revenue after pilots prove operating reliability."],
            ].map(([title, copy]) => (
              <article className="revenue-card" key={title}>
                <span>Planned model</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
          <p className="model-note">
            No revenue is claimed yet. This section explains the business model
            investors can evaluate as validation milestones become real.
          </p>
        </div>
      </section>

      <section className="section paper" id="faq">
        <div className="section-inner">
          <p className="section-kicker">Questions</p>
          <h2 className="section-title">What early users should know.</h2>
          <FaqAccordion items={faqs} />
        </div>
      </section>

      <section className="section dark topo" id="final-cta">
        <div className="section-inner grid-2" style={{ alignItems: "center" }}>
          <div>
            <p className="section-kicker">Join validation</p>
            <h2 className="section-title">
              Your land has been waiting. Now it gets a plan.
            </h2>
            <p className="section-copy">
              Join the first validation cohort for Andhra Pradesh landowners and
              help shape the product before launch.
            </p>
          </div>
          <LeadForm
            mode="customer"
            source="final_cta"
            title="Get your first review"
            copy="No spam and no income guarantees. Just a structured next step for your land."
          />
        </div>
      </section>

      <Footer />
    </main>
  );
}
