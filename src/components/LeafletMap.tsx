"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

type LeafletLayer = {
  addTo: (map: LeafletMapInstance) => LeafletLayer;
  bindPopup?: (content: string) => LeafletLayer;
};

type LeafletMapInstance = {
  remove: () => void;
  setView: (center: [number, number], zoom: number) => LeafletMapInstance;
};

type LeafletGlobal = {
  map: (
    element: HTMLElement,
    options?: Record<string, unknown>,
  ) => LeafletMapInstance;
  tileLayer: (url: string, options?: Record<string, unknown>) => LeafletLayer;
  marker: (latlng: [number, number], options?: Record<string, unknown>) => LeafletLayer;
  circle: (
    latlng: [number, number],
    options?: Record<string, unknown>,
  ) => LeafletLayer;
  polygon: (
    latlngs: [number, number][],
    options?: Record<string, unknown>,
  ) => LeafletLayer;
  divIcon: (options?: Record<string, unknown>) => unknown;
};

declare global {
  interface Window {
    L?: LeafletGlobal;
    __plotcareLeafletLoading?: Promise<LeafletGlobal>;
  }
}

type LeafletMapProps = {
  className?: string;
  label: string;
  compact?: boolean;
  children?: ReactNode;
};

const LEAFLET_CSS = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
const LEAFLET_SCRIPT = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
const VISAKHAPATNAM: [number, number] = [17.6868, 83.2185];

function ensureLeafletStyles() {
  const existingLink = document.querySelector<HTMLLinkElement>(
    `link[href="${LEAFLET_CSS}"]`,
  );
  if (existingLink) return;

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = LEAFLET_CSS;
  link.crossOrigin = "";
  document.head.appendChild(link);
}

function loadLeaflet() {
  if (window.L) return Promise.resolve(window.L);
  if (window.__plotcareLeafletLoading) return window.__plotcareLeafletLoading;

  ensureLeafletStyles();
  window.__plotcareLeafletLoading = new Promise<LeafletGlobal>((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[src="${LEAFLET_SCRIPT}"]`,
    );

    const finishLoad = () => {
      if (window.L) {
        resolve(window.L);
        return;
      }
      reject(new Error("Leaflet loaded without exposing window.L."));
    };

    if (existingScript) {
      existingScript.addEventListener("load", finishLoad, { once: true });
      existingScript.addEventListener(
        "error",
        () => reject(new Error("Leaflet failed to load.")),
        { once: true },
      );
      return;
    }

    const script = document.createElement("script");
    script.src = LEAFLET_SCRIPT;
    script.async = true;
    script.crossOrigin = "";
    script.addEventListener("load", finishLoad, { once: true });
    script.addEventListener(
      "error",
      () => reject(new Error("Leaflet failed to load.")),
      { once: true },
    );
    document.body.appendChild(script);
  });

  return window.__plotcareLeafletLoading;
}

export function LeafletMap({ className = "", label, compact = false, children }: LeafletMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let map: LeafletMapInstance | null = null;

    loadLeaflet()
      .then((L) => {
        const element = mapRef.current;
        if (!element || cancelled) return;

        map = L.map(element, {
          attributionControl: true,
          scrollWheelZoom: false,
          zoomControl: !compact,
        }).setView(VISAKHAPATNAM, compact ? 11 : 10);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "&copy; OpenStreetMap contributors",
          maxZoom: 18,
        }).addTo(map);

        L.circle(VISAKHAPATNAM, {
          color: "#f0a040",
          fillColor: "#f0a040",
          fillOpacity: 0.16,
          radius: compact ? 4200 : 6200,
          weight: 2,
        }).addTo(map);

        L.polygon(
          [
            [17.71, 83.15],
            [17.74, 83.25],
            [17.68, 83.31],
            [17.62, 83.2],
          ],
          {
            color: "#f0a040",
            fillColor: "#f0a040",
            fillOpacity: 0.24,
            weight: 2,
          },
        ).addTo(map);

        L.marker(VISAKHAPATNAM, {
          icon: L.divIcon({
            className: "plotcare-map-marker",
            html: "<span></span>",
            iconAnchor: [9, 18],
            iconSize: [18, 18],
          }),
        })
          .addTo(map)
          .bindPopup?.("Visakhapatnam beachhead");
      })
      .catch((error: unknown) => {
        console.warn("PlotCare map fallback:", error);
        setFailed(true);
      });

    return () => {
      cancelled = true;
      if (map) map.remove();
    };
  }, [compact]);

  return (
    <div className={`leaflet-frame ${className}`} aria-label={label}>
      <div ref={mapRef} className="leaflet-map-canvas" />
      {failed ? (
        <div className="leaflet-fallback">
          <span>Visakhapatnam</span>
          <strong>Map preview unavailable</strong>
        </div>
      ) : null}
      {children}
    </div>
  );
}
