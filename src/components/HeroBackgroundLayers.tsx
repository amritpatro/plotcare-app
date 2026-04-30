"use client";

import { useEffect, useRef, useState } from "react";

type HeroBackgroundLayersProps = {
  basePath?: string;
  showVideo?: boolean;
};

export function HeroBackgroundLayers({
  basePath = "",
  showVideo = false,
}: HeroBackgroundLayersProps) {
  const topoRef = useRef<HTMLDivElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const videoSource = `${basePath}/videos/plotcare-hero.mp4`;

  useEffect(() => {
    const wrapper = topoRef.current;
    if (!wrapper) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let ticking = false;

    const updateParallax = () => {
      ticking = false;
      if (reduceMotion.matches) {
        wrapper.style.setProperty("--hero-topo-y", "0px");
        return;
      }

      const hero = wrapper.closest(".hero");
      if (!hero) return;

      const rect = hero.getBoundingClientRect();
      const offset = Math.max(0, -rect.top) * 0.3;
      wrapper.style.setProperty("--hero-topo-y", `${offset}px`);
    };

    const requestUpdate = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateParallax);
    };

    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });

    return () => {
      window.removeEventListener("scroll", requestUpdate);
    };
  }, []);

  return (
    <>
      {showVideo && !videoFailed ? (
        <video
          className="hero-video-layer hero-background-layer"
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
          onError={() => setVideoFailed(true)}
        >
          <source src={videoSource} type="video/mp4" />
        </video>
      ) : null}
      <div
        ref={topoRef}
        className="hero-topo-parallax hero-background-layer"
        aria-hidden="true"
      >
        <svg className="hero-topo-ellipses" viewBox="0 0 1200 760" role="presentation">
          <g fill="none" stroke="currentColor" strokeWidth="1.4">
            <ellipse cx="120" cy="120" rx="220" ry="96" />
            <ellipse cx="310" cy="210" rx="280" ry="122" />
            <ellipse cx="555" cy="160" rx="240" ry="104" />
            <ellipse cx="815" cy="248" rx="300" ry="134" />
            <ellipse cx="1070" cy="156" rx="260" ry="110" />
            <ellipse cx="188" cy="466" rx="285" ry="124" />
            <ellipse cx="488" cy="560" rx="340" ry="146" />
            <ellipse cx="830" cy="486" rx="310" ry="132" />
            <ellipse cx="1120" cy="610" rx="285" ry="120" />
            <path d="M-80 336c145-82 286-82 422 0s278 82 426 0 294-82 438 0" />
            <path d="M-90 642c168-96 326-96 474 0s306 96 474 0 310-96 460 0" />
          </g>
        </svg>
      </div>
      <div className="hero-depth-fields hero-background-layer" aria-hidden="true">
        <span className="field-ridge field-ridge-one" />
        <span className="field-ridge field-ridge-two" />
        <span className="field-ridge field-ridge-three" />
      </div>
      <div className="hero-film-grain hero-background-layer" aria-hidden="true" />
    </>
  );
}
