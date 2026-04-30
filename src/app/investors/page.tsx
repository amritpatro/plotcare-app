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
import type { Metadata } from "next";
import { AndhraDistrictMap } from "@/components/AndhraDistrictMap";
import { ArrowIcon } from "@/components/ArrowIcon";
import { Footer } from "@/components/Footer";
import { HeroBackgroundLayers } from "@/components/HeroBackgroundLayers";
import { LeafletMap } from "@/components/LeafletMap";
import { LeadForm } from "@/components/LeadForm";
import { SiteNav } from "@/components/SiteNav";
import { ScrollProgress } from "@/components/ScrollProgress";

export const metadata: Metadata = {
  title: "Investor Brief",
  description:
    "PlotCare's investor narrative: a pre-launch land intelligence and activation platform starting with idle land in Andhra Pradesh.",
};

const basePath = process.env.PAGES_BASE_PATH ?? "";

const marketSources = [
  {
    stat: "35.4M",
    label: "overseas Indians listed by India's Ministry of External Affairs",
    source: "MEA Population of Overseas Indians",
    href: "https://www.mea.gov.in/population-of-overseas-indians.htm",
  },
  {
    stat: "8.52M",
    label: "operational holdings in Andhra Pradesh in Agriculture Census 2015-16",
    source: "PIB / Agriculture Census 2015-16",
    href: "https://www.pib.gov.in/PressReleaseIframePage.aspx?PRID=2085181",
  },
  {
    stat: "7%",
    label: "of India's agricultural land reported as fallow in a USDA/FAS India roadmap",
    source: "USDA FAS India Road Map 2024",
    href: "https://apps.fas.usda.gov/newgainapi/api/Report/DownloadReportByFileName?fileName=US+-+INDIA+ROAD+MAP+2024_New+Delhi_India_IN2024-0037.pdf",
  },
  {
    stat: "PM-KUSUM",
    label: "creates a policy-backed path for solar plants and land lease rent where suitable",
    source: "MNRE PM-KUSUM",
    href: "https://mnre.gov.in/en/pradhan-mantri-kisan-urja-suraksha-evam-utthaan-mahabhiyaan-pm-kusum/",
  },
];

const investorMetrics = [
  ["Report CAC target", "Rs 250-600", "WhatsApp-first owner intake and referral loops before paid acquisition."],
  ["Report price test", "Rs 999-2,499", "Diagnostic willingness-to-pay before any managed activation promise."],
  ["Activation take rate", "5-12%", "Future commission range only after pilot agreements and partner operations are validated."],
  ["Owner subscription", "Rs 199-499/mo", "Ongoing document vault, plot updates, and partner-readiness workflows."],
  ["Gross margin path", "65%+", "Software-led reports with field validation reserved for qualified opportunities."],
  ["Payback target", "< 60 days", "Early cohort goal for report-led lead acquisition, not a current claim."],
];

const roadmap = [
  {
    time: "Days 1-30",
    title: "Demand validation",
    copy: "Collect qualified landowner, farmer, and investor interest. Segment by district, land size, owner location, and use-case intent.",
  },
  {
    time: "Days 31-60",
    title: "Report delivery pilots",
    copy: "Produce the first structured Land Intelligence Reports and learn which fields, risks, and recommendations drive paid intent.",
  },
  {
    time: "Days 61-90",
    title: "Activation readiness",
    copy: "Identify farmer/operator partners, target pilot acres, draft agreement flows, and secure LOIs before claiming live traction.",
  },
];

export default function InvestorsPage() {
  return (
    <main className="site-shell">
      <ScrollProgress />
      <SiteNav variant="investor" />

      <section className="hero">
        <HeroBackgroundLayers basePath={basePath} />
        <div className="hero-content">
          <div className="eyebrow"><span className="dot" /> Investor brief / pre-launch</div>
          <h1 className="headline">
            PlotCare is building the <span>activation layer</span> for idle land.
          </h1>
          <p className="subhead">
            Starting in Andhra Pradesh, PlotCare turns scattered land ownership
            into a structured workflow: map the plot, assess viable use cases,
            match verified operators, and track activation.
          </p>
          <div className="inline-actions" style={{ marginTop: 34 }}>
            <a className="button button-primary" href="#investor-brief">
              Request investor brief <ArrowIcon />
            </a>
            <a className="button button-outline" href="#market">
              See market thesis
            </a>
          </div>
          <div className="hero-proof">
            <div className="proof-chip">Pre-launch: no fake revenue, pilot, or partnership claims.</div>
            <div className="proof-chip">Wedge: AP landowners, especially urban and overseas families.</div>
            <div className="proof-chip">Model: reports, subscriptions, transaction-linked revenue.</div>
          </div>
        </div>

        <div className="dashboard hero-side">
          <LeafletMap
            className="map-window"
            label="Live Visakhapatnam investor beachhead map"
          />
          <div className="dashboard-row"><span>Beachhead</span><strong>Visakhapatnam and AP corridor</strong></div>
          <div className="dashboard-row"><span>Customer</span><strong>Absentee landowners</strong></div>
          <div className="dashboard-row"><span>Validation target</span><strong>Reports, partner LOIs, pilot acres</strong></div>
          <div className="dashboard-row"><span>Why now</span><strong>Digitized records + WhatsApp-first demand</strong></div>
        </div>
      </section>

      <section className="section paper">
        <div className="section-inner grid-3">
          {[
            ["Problem", "Landowners hold valuable assets they cannot inspect, trust, or operate remotely."],
            ["Solution", "PlotCare converts land details into a suitability report, partner workflow, and activation path."],
            ["Wedge", "Start with AP, where land, diaspora ownership, farmer demand, and renewable-use cases intersect."],
          ].map(([title, copy]) => (
            <article className="card" key={title}>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section dark topo" id="market">
        <div className="section-inner">
          <p className="section-kicker">Market thesis</p>
          <h2 className="section-title">
            A large, fragmented asset base is missing a trusted operating interface.
          </h2>
          <p className="section-copy">
            PlotCare&apos;s investor case is not built on an unsupported TAM slide.
            It is built on observable friction: many holdings, absentee ownership,
            land left fallow, and policy-backed pathways for productive rural land use.
          </p>
          <div className="grid-4">
            {marketSources.map((item) => (
              <article className="metric-card" key={item.stat}>
                <span className="metric">{item.stat}</span>
                <p>{item.label}</p>
              </article>
            ))}
          </div>
          <AndhraDistrictMap />
        </div>
      </section>

      <section className="section paper investor-metrics-section" id="investor-metrics">
        <div className="section-inner">
          <p className="section-kicker">Investor metrics</p>
          <h2 className="section-title">
            Six unit economics assumptions to pressure-test before scale.
          </h2>
          <div className="investor-metrics-grid">
            {investorMetrics.map(([title, value, copy]) => (
              <article className="investor-metric-card" key={title}>
                <span>{title}</span>
                <strong>{value}</strong>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section paper" id="model">
        <div className="section-inner">
          <p className="section-kicker">Business model</p>
          <h2 className="section-title">
            Monetization starts with insight and expands into activation.
          </h2>
          <div className="grid-3">
            {[
              ["Land reports", "A paid or free-to-paid diagnostic product that starts the owner relationship."],
              ["Owner subscription", "Ongoing mapping, documents, use-case tracking, partner discovery, and updates."],
              ["Platform commission", "Future revenue share on harvest, lease, or operator workflows once pilots prove the model."],
            ].map(([title, copy]) => (
              <article className="card" key={title}>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section sage">
        <div className="section-inner grid-2">
          <div>
            <p className="section-kicker">Why it can compound</p>
            <h2 className="section-title">Every report improves the land intelligence graph.</h2>
            <p className="section-copy">
              The defensibility is not a single software screen. It is the
              repeated workflow across plots, documents, owner intent, partner
              fit, land-use economics, and local operating outcomes.
            </p>
          </div>
          <div className="grid-2" style={{ marginTop: 0 }}>
            {[
              ["Data workflow", "Plot-level records, suitability, and owner intent."],
              ["Trust network", "Verified operator supply and repeatable checks."],
              ["Local wedge", "District-by-district expansion rather than diffuse national launch."],
              ["Execution moat", "Reports become the wedge into managed activation."],
            ].map(([title, copy]) => (
              <article className="card" key={title}>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section paper" id="roadmap">
        <div className="section-inner">
          <p className="section-kicker">90-day validation roadmap</p>
          <h2 className="section-title">
            Milestones that make the next investor conversation concrete.
          </h2>
          <div className="roadmap">
            {roadmap.map((item) => (
              <article className="roadmap-item" key={item.time}>
                <div className="roadmap-time">{item.time}</div>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section sage">
        <div className="section-inner">
          <p className="section-kicker">Source discipline</p>
          <h2 className="section-title">
            Every number shown to investors needs a traceable source.
          </h2>
          <div className="source-grid">
            {marketSources.map((item) => (
              <article className="source-card" key={item.source}>
                <p>
                  <a href={item.href} target="_blank" rel="noreferrer">
                    {item.source}
                  </a>
                  <br />
                  Used for: {item.label}.
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section dark topo" id="investor-brief">
        <div className="section-inner grid-2" style={{ alignItems: "center" }}>
          <div>
            <p className="section-kicker">Investor CTA</p>
            <h2 className="section-title">
              Request the brief. Help pressure-test the wedge.
            </h2>
            <p className="section-copy">
              PlotCare is not showing a funding amount yet. The immediate goal is
              to collect high-quality investor feedback, customer leads, and
              validation milestones.
            </p>
          </div>
          <LeadForm
            mode="investor"
            source="investor"
            title="Request investor brief"
            copy="Share your details and we will send the deck-ready narrative and validation roadmap."
          />
        </div>
      </section>

      <Footer />
    </main>
  );
}
