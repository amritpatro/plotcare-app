"use client";

import { CSSProperties, useEffect, useRef, useState } from "react";

const districts = [
  { name: "Srikakulam", d: "M458 42 548 70 526 134 438 108Z" },
  { name: "Vizianagaram", d: "M424 116 526 140 498 202 392 184Z" },
  { name: "Visakhapatnam", d: "M382 190 502 210 466 282 352 258Z", active: true },
  { name: "East Godavari", d: "M328 264 466 292 420 366 286 334Z" },
  { name: "West Godavari", d: "M276 328 414 374 348 442 228 386Z" },
  { name: "Krishna", d: "M224 390 344 448 276 514 168 438Z" },
  { name: "Guntur", d: "M156 440 274 520 210 590 96 512Z" },
  { name: "Prakasam", d: "M86 520 210 598 150 686 38 600Z" },
  { name: "Nellore", d: "M150 692 256 620 316 704 210 764Z" },
  { name: "Kurnool", d: "M34 314 166 326 158 434 26 418Z" },
  { name: "Kadapa", d: "M166 438 282 518 254 620 146 596Z" },
  { name: "Anantapur", d: "M22 182 158 194 164 314 30 306Z" },
  { name: "Chittoor", d: "M258 622 372 560 438 650 318 722Z" },
];

export function AndhraDistrictMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = mapRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.24 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={mapRef}
      className={`ap-district-card${visible ? " is-visible" : ""}`}
      aria-label="Schematic Andhra Pradesh district expansion map"
    >
      <div>
        <p className="section-kicker">District expansion</p>
        <h3>Visakhapatnam first, then AP corridor expansion.</h3>
        <p>
          The beachhead district stays highlighted while adjacent Andhra Pradesh
          districts expand into the validation roadmap.
        </p>
      </div>
      <svg className="ap-district-map" viewBox="0 0 580 790" role="img">
        <title>Andhra Pradesh district schematic with Visakhapatnam highlighted</title>
        {districts.map((district, index) => (
          <path
            key={district.name}
            className={district.active ? "ap-district is-active" : "ap-district"}
            d={district.d}
            style={{ "--district-index": index } as CSSProperties}
          />
        ))}
        <text x="378" y="245" className="ap-map-label">Visakhapatnam</text>
      </svg>
    </div>
  );
}
