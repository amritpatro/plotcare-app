"use client";

import { useState } from "react";
import { LeafletMap } from "./LeafletMap";

type PreviewType = "locator" | "report" | "partners" | "revenue";

const features = [
  {
    title: "Land Locator",
    copy: "Map a plot from survey details, village context, or coordinates so an absentee owner can understand exactly what they own.",
    preview: "locator" as PreviewType,
    rows: [
      ["Input", "Survey number, village, coordinates"],
      ["Output", "Plot profile and boundary confidence"],
      ["Value", "Visibility before activation"],
    ],
  },
  {
    title: "Land Intelligence Report",
    copy: "Rank realistic use cases by water access, shade, soil, slope, plot size, investment level, and expected monthly income.",
    preview: "report" as PreviewType,
    rows: [
      ["Primary score", "Suitability by use case"],
      ["Use cases", "Farming, mushroom, solar, aquaculture"],
      ["Decision", "Activate, lease, or hold"],
    ],
  },
  {
    title: "Verified Partner Matching",
    copy: "Bring local farmer and production partners into one managed workflow, with verification designed before any commercial pilot.",
    preview: "partners" as PreviewType,
    rows: [
      ["Supply", "Landowner plots"],
      ["Demand", "Farmers and agri operators"],
      ["Trust layer", "References, documents, agreements"],
    ],
  },
  {
    title: "Revenue Tracking",
    copy: "Give landowners transparent updates after activation: activity, harvest events, expected payouts, and next actions.",
    preview: "revenue" as PreviewType,
    rows: [
      ["Signals", "Crop cycle and partner updates"],
      ["Owner view", "Income and documents"],
      ["Pilot target", "Track first activated acres"],
    ],
  },
];

function FeaturePreview({ type }: { type: PreviewType }) {
  if (type === "locator") {
    return (
      <LeafletMap
        className="feature-preview locator-demo leaflet-feature-map"
        label="Live Visakhapatnam land locator map"
        compact
      >
        <div className="locator-card">
          <span>Survey AP-VZK-2841</span>
          <strong>Boundary confidence 82%</strong>
        </div>
      </LeafletMap>
    );
  }

  if (type === "report") {
    return (
      <div className="feature-preview report-demo" aria-label="Demo land intelligence report">
        <div className="report-sheet">
          <div className="report-head">
            <span>PlotCare</span>
            <strong>Land Intelligence Report</strong>
          </div>
          <div className="report-score-strip">
            <div>
              <strong>82</strong>
              <span>Water fit</span>
            </div>
            <div>
              <strong>74</strong>
              <span>Access</span>
            </div>
            <div>
              <strong>68</strong>
              <span>Shade</span>
            </div>
          </div>
          <div className="report-ranking">
            <div>
              <span>Mushroom shed</span>
              <b>High</b>
            </div>
            <div>
              <span>Medicinal nursery</span>
              <b>Medium</b>
            </div>
            <div>
              <span>Solar lease</span>
              <b>Review</b>
            </div>
          </div>
          <div className="report-checks">
            <span>Water source check</span>
            <span>Road access photo</span>
            <span>Partner availability</span>
          </div>
        </div>
      </div>
    );
  }

  if (type === "partners") {
    return (
      <div className="feature-preview partner-demo" aria-label="Animated owner to farmer partner matching demo">
        <div className="partner-node owner-node">
          <span className="node-avatar">O</span>
          <strong>Owner</strong>
          <small>2.4 ac profile</small>
        </div>
        <div className="partner-rail">
          <span className="partner-pulse" />
          <span className="rail-step step-one">Match</span>
          <span className="rail-step step-two">Verify</span>
          <span className="rail-step step-three">Terms</span>
        </div>
        <div className="partner-node farmer-node">
          <span className="node-avatar">F</span>
          <strong>Farmer</strong>
          <small>Nursery operator</small>
        </div>
      </div>
    );
  }

  return (
    <div className="feature-preview revenue-demo" aria-label="Demo revenue tracking dashboard">
      <div className="revenue-topline">
        <div>
          <span>Expected month</span>
          <strong>Rs 38,400</strong>
        </div>
        <div>
          <span>Owner share</span>
          <strong>62%</strong>
        </div>
      </div>
      <div className="bar-chart" aria-hidden="true">
        <span className="bar bar-one"><b>May</b></span>
        <span className="bar bar-two"><b>Jun</b></span>
        <span className="bar bar-three"><b>Jul</b></span>
        <span className="bar bar-four"><b>Aug</b></span>
        <span className="bar bar-five"><b>Sep</b></span>
      </div>
      <div className="payout-list">
        <div><span>Harvest update</span><strong>Received</strong></div>
        <div><span>Partner payout</span><strong>Pending</strong></div>
        <div><span>Owner transfer</span><strong>Scheduled</strong></div>
      </div>
    </div>
  );
}

export function FeatureTabs() {
  const [active, setActive] = useState(0);
  const feature = features[active];

  return (
    <div className="tabs">
      <div className="tab-list" role="tablist" aria-label="Platform features">
        {features.map((item, index) => (
          <button
            id={`feature-tab-${index}`}
            key={item.title}
            type="button"
            role="tab"
            aria-selected={active === index}
            aria-controls={`feature-panel-${index}`}
            onClick={() => setActive(index)}
          >
            {item.title}
          </button>
        ))}
      </div>
      <div
        className="tab-panel"
        id={`feature-panel-${active}`}
        role="tabpanel"
        aria-labelledby={`feature-tab-${active}`}
      >
        <h3>{feature.title}</h3>
        <p>{feature.copy}</p>
        <div className="feature-panel-layout">
          <FeaturePreview type={feature.preview} />
          <div className="feature-summary">
            {feature.rows.map(([label, value]) => (
              <div className="dashboard-row" key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
