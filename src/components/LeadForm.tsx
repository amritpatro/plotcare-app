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
const airtableEndpoint = process.env.NEXT_PUBLIC_AIRTABLE_ENDPOINT ?? "";
const airtableToken = process.env.NEXT_PUBLIC_AIRTABLE_TOKEN ?? "";

type AirtablePayload =
  | {
      source: CustomerSource;
      fullName: string;
      whatsapp: string;
      district: string;
      audience: Audience;
    }
  | {
      source: InvestorSource;
      fullName: string;
      email: string;
      phoneOrWhatsApp: string;
      organization: string;
      message: string;
    };

function airtableFieldsFor(payload: AirtablePayload) {
  if (payload.source === "investor") {
    return {
      Source: payload.source,
      "Lead type": "investor",
      "Full name": payload.fullName,
      Email: payload.email,
      "Phone or WhatsApp": payload.phoneOrWhatsApp,
      Organization: payload.organization,
      Message: payload.message,
      "Submitted at": new Date().toISOString(),
    };
  }

  return {
    Source: payload.source,
    "Lead type": payload.audience,
    "Full name": payload.fullName,
    WhatsApp: payload.whatsapp,
    District: payload.district,
    "Submitted at": new Date().toISOString(),
  };
}

function logLeadFallback(payload: AirtablePayload, reason: unknown) {
  console.warn("PlotCare lead fallback. Save this lead manually:", {
    payload,
    reason,
  });
}

export function LeadForm(props: LeadFormProps) {
  const [audience, setAudience] = useState<Audience>(
    props.mode === "customer" ? props.defaultAudience ?? "landowner" : "landowner",
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>({ type: "idle", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successButtonLabel, setSuccessButtonLabel] = useState("");

  const formClass = useMemo(
    () => `form-panel${props.light ? " light" : ""}`,
    [props.light],
  );

  function runSuccessAnimation(label = "Captured") {
    setSuccessButtonLabel(label);
    window.setTimeout(() => setSuccessButtonLabel(""), 2400);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ type: "idle", message: "" });
    setErrors({});

    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

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
      if (staticExport && (!airtableEndpoint || !airtableToken)) {
        logLeadFallback(payload, "Airtable is not configured for static export.");
        form.reset();
        runSuccessAnimation();
        setStatus({
          type: "success",
          message:
            props.mode === "investor"
              ? "Investor interest is captured in the browser fallback. Connect Airtable before launch."
              : "Your request is captured in the browser fallback. Connect Airtable before launch.",
        });
        return;
      }

      if (!airtableEndpoint || !airtableToken) {
        throw new Error("Airtable endpoint or token is missing.");
      }

      // WARNING: This Airtable token is visible in the browser network tab.
      // Move this request behind a server proxy before going live.
      const response = await fetch(airtableEndpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${airtableToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          records: [{ fields: airtableFieldsFor(payload) }],
        }),
      });

      if (!response.ok) {
        throw new Error(`Airtable rejected the lead with status ${response.status}.`);
      }

      form.reset();
      runSuccessAnimation();
      setStatus({
        type: "success",
        message:
          props.mode === "investor"
            ? "Investor brief request received. We will follow up with the pitch materials."
            : "Your request is recorded. A PlotCare advisor will review your land details next.",
      });
    } catch (error) {
      logLeadFallback(payload, error);
      runSuccessAnimation("Logged");
      setStatus({
        type: "success",
        message:
          "Thanks. Airtable did not confirm the save, so we logged this lead for manual follow-up.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className={formClass} onSubmit={handleSubmit}>
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
            required
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
                required
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
                inputMode="numeric"
                pattern="[0-9+ ()-]{8,20}"
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
                inputMode="numeric"
                pattern="[0-9+ ()-]{8,20}"
                placeholder="+91 98765 43210"
                required
              />
              {errors.whatsapp ? <span className="error-text">{errors.whatsapp}</span> : null}
            </div>
            <div className="field">
              <label htmlFor={`${props.source}-district`}>Land district</label>
              <select id={`${props.source}-district`} name="district" defaultValue="" required>
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
                  className={audience === "landowner" ? "active" : ""}
                  aria-pressed={audience === "landowner"}
                  onClick={() => setAudience("landowner")}
                >
                  Landowner
                </button>
                <button
                  type="button"
                  className={audience === "farmer" ? "active" : ""}
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
          {successButtonLabel
            ? successButtonLabel
            : isSubmitting
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
