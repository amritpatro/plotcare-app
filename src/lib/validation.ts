export const leadSources = [
  "hero",
  "final_cta",
  "farmer_partner",
  "investor",
] as const;

export type LeadSource = (typeof leadSources)[number];
export type Audience = "landowner" | "farmer";

export type CustomerLead = {
  kind: "customer";
  source: Exclude<LeadSource, "investor">;
  fullName: string;
  whatsapp: string;
  district: string;
  audience: Audience;
};

export type InvestorLead = {
  kind: "investor";
  source: "investor";
  fullName: string;
  email: string;
  phoneOrWhatsApp: string;
  organization: string;
  message: string;
};

export type LeadPayload = CustomerLead | InvestorLead;

type ValidationResult =
  | { ok: true; value: LeadPayload }
  | { ok: false; errors: Record<string, string> };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isLeadSource(value: string): value is LeadSource {
  return leadSources.includes(value as LeadSource);
}

function validatePhone(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
}

export function validateLeadPayload(input: unknown): ValidationResult {
  const raw = input && typeof input === "object" ? input as Record<string, unknown> : {};
  const source = clean(raw.source);
  const errors: Record<string, string> = {};

  if (!isLeadSource(source)) {
    errors.source = "Choose a valid submission source.";
  }

  const fullName = clean(raw.fullName);
  if (fullName.length < 2) {
    errors.fullName = "Enter your full name.";
  }

  if (source === "investor") {
    const email = clean(raw.email).toLowerCase();
    if (!emailPattern.test(email)) {
      errors.email = "Enter a valid email address.";
    }

    if (Object.keys(errors).length > 0) {
      return { ok: false, errors };
    }

    return {
      ok: true,
      value: {
        kind: "investor",
        source,
        fullName,
        email,
        phoneOrWhatsApp: clean(raw.phoneOrWhatsApp),
        organization: clean(raw.organization),
        message: clean(raw.message),
      },
    };
  }

  const whatsapp = clean(raw.whatsapp);
  if (!validatePhone(whatsapp)) {
    errors.whatsapp = "Enter a valid WhatsApp number.";
  }

  const district = clean(raw.district);
  if (!district) {
    errors.district = "Select the land district.";
  }

  const audienceInput = clean(raw.audience);
  if (audienceInput !== "landowner" && audienceInput !== "farmer") {
    errors.audience = "Choose landowner or farmer.";
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  const audience = audienceInput as Audience;

  return {
    ok: true,
    value: {
      kind: "customer",
      source: source as Exclude<LeadSource, "investor">,
      fullName,
      whatsapp,
      district,
      audience,
    },
  };
}

export function validateAiPayload(input: unknown) {
  const raw = input && typeof input === "object" ? input as Record<string, unknown> : {};
  const message = clean(raw.message);
  const source = clean(raw.source) || "general";

  if (message.length < 3) {
    return { ok: false as const, message: "Ask a little more about the land first." };
  }

  if (message.length > 1200) {
    return { ok: false as const, message: "Keep the land question under 1,200 characters." };
  }

  return { ok: true as const, message, source };
}
