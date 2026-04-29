import { NextRequest, NextResponse } from "next/server";
import { appendLeadToSheet } from "@/lib/sheets";
import { validateLeadPayload } from "@/lib/validation";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Send lead details as JSON." },
      { status: 400 },
    );
  }

  const validation = validateLeadPayload(body);
  if (!validation.ok) {
    return NextResponse.json(
      {
        ok: false,
        message: "Please fix the highlighted fields.",
        errors: validation.errors,
      },
      { status: 400 },
    );
  }

  const result = await appendLeadToSheet(
    validation.value,
    request.headers.get("user-agent"),
  );

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, message: result.message },
      { status: result.status },
    );
  }

  return NextResponse.json({ ok: true });
}
