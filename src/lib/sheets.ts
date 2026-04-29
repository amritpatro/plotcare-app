import { createSign } from "node:crypto";
import type { LeadPayload } from "./validation";

type SheetsConfig = {
  sheetId: string;
  clientEmail: string;
  privateKey: string;
  tab: string;
  investorTab: string;
};

type AppendResult =
  | { ok: true }
  | { ok: false; status: number; message: string };

function getSheetsConfig(): SheetsConfig | null {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const tab = process.env.GOOGLE_SHEET_TAB ?? "Leads";
  const investorTab = process.env.GOOGLE_INVESTOR_SHEET_TAB ?? tab;

  if (!sheetId || !clientEmail || !privateKey) {
    return null;
  }

  return { sheetId, clientEmail, privateKey, tab, investorTab };
}

function base64Url(value: string | Buffer) {
  return Buffer.from(value)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

async function getAccessToken(config: SheetsConfig) {
  const now = Math.floor(Date.now() / 1000);
  const header = base64Url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = base64Url(
    JSON.stringify({
      iss: config.clientEmail,
      scope: "https://www.googleapis.com/auth/spreadsheets",
      aud: "https://oauth2.googleapis.com/token",
      exp: now + 3600,
      iat: now,
    }),
  );
  const unsigned = `${header}.${claim}`;
  const signature = createSign("RSA-SHA256")
    .update(unsigned)
    .end()
    .sign(config.privateKey);
  const jwt = `${unsigned}.${base64Url(signature)}`;

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  if (!response.ok) {
    throw new Error("Google authentication failed.");
  }

  const data = await response.json() as { access_token?: string };
  if (!data.access_token) {
    throw new Error("Google authentication returned no token.");
  }

  return data.access_token;
}

function rowForLead(lead: LeadPayload, userAgent: string | null) {
  const submittedAt = new Date().toISOString();
  if (lead.kind === "investor") {
    return [
      submittedAt,
      lead.source,
      "",
      lead.fullName,
      "",
      lead.email,
      lead.phoneOrWhatsApp,
      lead.organization,
      "",
      lead.message,
      userAgent ?? "",
    ];
  }

  return [
    submittedAt,
    lead.source,
    lead.audience,
    lead.fullName,
    lead.whatsapp,
    "",
    "",
    "",
    lead.district,
    "",
    userAgent ?? "",
  ];
}

export async function appendLeadToSheet(
  lead: LeadPayload,
  userAgent: string | null,
): Promise<AppendResult> {
  const config = getSheetsConfig();

  if (!config) {
    return {
      ok: false,
      status: 503,
      message:
        "Lead capture is not configured yet. Add Google Sheets environment variables before launch.",
    };
  }

  try {
    const token = await getAccessToken(config);
    const tab = lead.kind === "investor" ? config.investorTab : config.tab;
    const range = encodeURIComponent(`${tab}!A:K`);
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${config.sheetId}/values/${range}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ values: [rowForLead(lead, userAgent)] }),
    });

    if (!response.ok) {
      return {
        ok: false,
        status: 502,
        message: "Google Sheets rejected the lead. Check sheet sharing and tab names.",
      };
    }

    return { ok: true };
  } catch {
    return {
      ok: false,
      status: 502,
      message: "Lead capture failed while contacting Google Sheets.",
    };
  }
}
