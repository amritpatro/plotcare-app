"use client";

import { FormEvent, useMemo, useState } from "react";
import { ArrowIcon } from "./ArrowIcon";

type CustomerSource = "hero" | "final_cta" | "farmer_partner";
type InvestorSource = "investor";
type Audience = "landowner" | "farmer";

type LeadFormProps =
  | {
      mode: "customer";
      source: CustomerSource;
      title: string;
      copy: string;
      defaultAudience?: Audience;
      light?: boolean;
    }
  | {
      mode: "investor";
      source: InvestorSource;
      title: string;
      copy: string;
      light?: boolean;
    };

type Status =
  | { type: "idle"; message: "" }
  | { type: "success" | "error"; message: string };

const districts = [
  "Visakhapatnam",
  "Vizianagaram",
  "Srikakulam",
  "East Godavari",
  "West Godavari",
  "Krishna",
  "Guntur",
  "Prakasam",
  "Nellore",
  "Kurnool",
  "Kadapa",
  "Anantapur",
  "Chittoor",
  "Outside Andhra Pradesh",
  "Not sure",
];

const staticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";
const leadsEndpoint = process.env.NEXT_PUBLIC_LEADS_ENDPOINT ?? (staticExport ? "" : "/api/leads");

export function LeadForm(props: LeadFormProps) {
  const [audience, setAudience] = useState<Audience>(
    props.mode === "customer" ? props.defaultAudience ?? "landowner" : "landowner",
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>({ type: "idle", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formClass = useMemo(
    () => `form-panel${props.light ? " light" : ""}`,
    [props.light],
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ type: "idle", message: "" });
    setErrors({});

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload =
      props.mode === "investor"
        ? {
            source: props.source,
            fullName: String(formData.get("fullName") ?? ""),
            email: String(formData.get("email") ?? ""),
            phoneOrWhatsApp: String(formData.get("phoneOrWhatsApp") ?? ""),
            organization: String(formData.get("organization") ?? ""),
            message: String(formData.get("message") ?? ""),
          }
        : {
            source: props.source,
            fullName: String(formData.get("fullName") ?? ""),
            whatsapp: String(formData.get("whatsapp") ?? ""),
            district: String(formData.get("district") ?? ""),
            audience,
          };

    setIsSubmitting(true);
    try {
      if (!leadsEndpoint) {
        form.reset();
        setStatus({
          type: "success",
          message:
            props.mode === "investor"
              ? "Investor interest captured for this static demo. Connect a lead endpoint before launch."
              : "Your request is captured for this static demo. Connect a lead endpoint before launch.",
        });
        return;
      }

      const response = await fetch(leadsEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as {
        ok?: boolean;
        message?: string;
        errors?: Record<string, string>;
      };

      if (!response.ok || !data.ok) {
        setErrors(data.errors ?? {});
        setStatus({
          type: "error",
          message:
            data.message ??
            "We could not submit this yet. Please check the fields and try again.",
        });
        return;
      }

      form.reset();
      setStatus({
        type: "success",
        message:
          props.mode === "investor"
            ? "Investor brief request received. We will follow up with the pitch materials."
            : "Your request is recorded. A PlotCare advisor will review your land details next.",
      });
    } catch {
      setStatus({
        type: "error",
        message:
          "The network did not cooperate. Please try again in a moment.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className={formClass} onSubmit={handleSubmit} noValidate>
      <h2 className="form-title">{props.title}</h2>
      <p className="form-copy">{props.copy}</p>

      <div className="form-grid">
        <div className="field">
          <label htmlFor={`${props.source}-fullName`}>Full name</label>
          <input
            id={`${props.source}-fullName`}
            name="fullName"
            autoComplete="name"
            placeholder="Your full name"
          />
          {errors.fullName ? <span className="error-text">{errors.fullName}</span> : null}
        </div>

        {props.mode === "investor" ? (
          <>
            <div className="field">
              <label htmlFor="investor-email">Email</label>
              <input
                id="investor-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@company.com"
              />
              {errors.email ? <span className="error-text">{errors.email}</span> : null}
            </div>
            <div className="field">
              <label htmlFor="investor-phone">Phone or WhatsApp</label>
              <input
                id="investor-phone"
                name="phoneOrWhatsApp"
                type="tel"
                autoComplete="tel"
                placeholder="+91 98765 43210"
              />
            </div>
            <div className="field">
              <label htmlFor="investor-org">Organization</label>
              <input
                id="investor-org"
                name="organization"
                autoComplete="organization"
                placeholder="Fund, angel group, or company"
              />
            </div>
            <div className="field">
              <label htmlFor="investor-message">Message</label>
              <textarea
                id="investor-message"
                name="message"
                placeholder="Tell us what you would like to see in the investor brief."
              />
            </div>
          </>
        ) : (
          <>
            <div className="field">
              <label htmlFor={`${props.source}-whatsapp`}>WhatsApp number</label>
              <input
                id={`${props.source}-whatsapp`}
                name="whatsapp"
                type="tel"
                autoComplete="tel"
                placeholder="+91 98765 43210"
              />
              {errors.whatsapp ? <span className="error-text">{errors.whatsapp}</span> : null}
            </div>
            <div className="field">
              <label htmlFor={`${props.source}-district`}>Land district</label>
              <select id={`${props.source}-district`} name="district" defaultValue="">
                <option value="" disabled>
                  Select district
                </option>
                {districts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
              {errors.district ? <span className="error-text">{errors.district}</span> : null}
            </div>
            <div className="field">
              <label>I am a</label>
              <div className="segmented" role="group" aria-label="Lead type">
                <button
                  type="button"
                  aria-pressed={audience === "landowner"}
                  onClick={() => setAudience("landowner")}
                >
                  Landowner
                </button>
                <button
                  type="button"
                  aria-pressed={audience === "farmer"}
                  onClick={() => setAudience("farmer")}
                >
                  Farmer
                </button>
              </div>
            </div>
          </>
        )}

        {status.type !== "idle" ? (
          <div className={`status ${status.type}`} role="status">
            {status.message}
          </div>
        ) : null}

        <button className="button button-primary" type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? "Submitting..."
            : props.mode === "investor"
              ? "Request investor brief"
              : "Request land report"}
          <ArrowIcon />
        </button>
      </div>
    </form>
  );
}
