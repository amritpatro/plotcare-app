import { NextRequest, NextResponse } from "next/server";
import { validateAiPayload } from "@/lib/validation";

export const runtime = "nodejs";

const SYSTEM_PROMPT = `You are PlotCare's land intelligence advisor for a pre-launch land activation platform in Andhra Pradesh. Give a specific, grounded response in 3 to 4 sentences. Reference the user's stated land context, suggest one or two realistic activation routes, avoid pretending that PlotCare has live pilots or verified partners, and end with one concrete next step. Do not provide legal, financial, or guaranteed-income advice.`;

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Send the advisor question as JSON." },
      { status: 400 },
    );
  }

  const validation = validateAiPayload(body);
  if (!validation.ok) {
    return NextResponse.json(
      { ok: false, message: validation.message },
      { status: 400 },
    );
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "The AI advisor is not configured yet. Add ANTHROPIC_API_KEY before launch.",
      },
      { status: 503 },
    );
  }

  const model = process.env.ANTHROPIC_MODEL ?? "claude-sonnet-4-20250514";

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model,
        max_tokens: 420,
        system: SYSTEM_PROMPT,
        messages: [{ role: "user", content: validation.message }],
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { ok: false, message: "The AI advisor is unavailable right now." },
        { status: 502 },
      );
    }

    const data = await response.json() as {
      content?: Array<{ type?: string; text?: string }>;
    };
    const text =
      data.content?.find((item) => item.type === "text" && item.text)?.text ??
      "PlotCare can review this land context and suggest the next validation step.";

    return NextResponse.json({ ok: true, text });
  } catch {
    return NextResponse.json(
      { ok: false, message: "The AI advisor could not be reached." },
      { status: 502 },
    );
  }
}
