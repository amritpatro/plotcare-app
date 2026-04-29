"use client";

import { useState } from "react";

const features = [
  {
    title: "Land Locator",
    copy: "Map a plot from survey details, village context, or coordinates so an absentee owner can understand exactly what they own.",
    rows: [
      ["Input", "Survey number, village, coordinates"],
      ["Output", "Plot profile and boundary confidence"],
      ["Value", "Visibility before activation"],
    ],
  },
  {
    title: "Land Intelligence Report",
    copy: "Rank realistic use cases by water access, shade, soil, slope, plot size, investment level, and expected monthly income.",
    rows: [
      ["Primary score", "Suitability by use case"],
      ["Use cases", "Farming, mushroom, solar, aquaculture"],
      ["Decision", "Activate, lease, or hold"],
    ],
  },
  {
    title: "Verified Partner Matching",
    copy: "Bring local farmer and production partners into one managed workflow, with verification designed before any commercial pilot.",
    rows: [
      ["Supply", "Landowner plots"],
      ["Demand", "Farmers and agri operators"],
      ["Trust layer", "References, documents, agreements"],
    ],
  },
  {
    title: "Revenue Tracking",
    copy: "Give landowners transparent updates after activation: activity, harvest events, expected payouts, and next actions.",
    rows: [
      ["Signals", "Crop cycle and partner updates"],
      ["Owner view", "Income and documents"],
      ["Pilot target", "Track first activated acres"],
    ],
  },
];

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
        <div className="dashboard" style={{ marginTop: 24 }}>
          {feature.rows.map(([label, value]) => (
            <div className="dashboard-row" key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
