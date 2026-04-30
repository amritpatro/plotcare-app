"use client";

import { useSyncExternalStore } from "react";
import { LeadForm, type LeadFormProps } from "./LeadForm";

const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export function ClientOnlyLeadForm(props: LeadFormProps) {
  const mounted = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );

  if (!mounted) {
    return (
      <div
        className={`form-panel form-panel-skeleton${props.light ? " light" : ""}`}
        aria-hidden="true"
        suppressHydrationWarning
      >
        <h2 className="form-title">{props.title}</h2>
        <p className="form-copy">{props.copy}</p>
        <div className="form-grid">
          <span className="form-skeleton-line wide" />
          <span className="form-skeleton-line" />
          <span className="form-skeleton-line" />
          <span className="form-skeleton-button" />
        </div>
      </div>
    );
  }

  return <LeadForm {...props} />;
}
