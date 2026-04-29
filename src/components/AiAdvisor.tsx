"use client";

import { FormEvent, useState } from "react";
import { ArrowIcon } from "./ArrowIcon";

type AiAdvisorProps = {
  source: string;
  placeholder: string;
};

const staticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";
const advisorEndpoint = process.env.NEXT_PUBLIC_AI_ENDPOINT ?? (staticExport ? "" : "/api/ai");

export function AiAdvisor({ source, placeholder }: AiAdvisorProps) {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = message.trim();
    if (!trimmed) return;

    setIsLoading(true);
    setError("");
    setResponse("");

    try {
      if (!advisorEndpoint) {
        setResponse(
          "For this static GitHub Pages demo, PlotCare would treat your note as a report request and validate plot size, water access, shade, road access, and partner availability before suggesting an activation route.",
        );
        setMessage("");
        return;
      }

      const res = await fetch(advisorEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, source }),
      });
      const data = (await res.json()) as { ok?: boolean; text?: string; message?: string };
      if (!res.ok || !data.ok) {
        setError(data.message ?? "The advisor is unavailable right now.");
        return;
      }
      setResponse(data.text ?? "");
      setMessage("");
    } catch {
      setError("The advisor could not be reached. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="ai-box">
      <form className="ai-input-row" onSubmit={handleSubmit}>
        <input
          aria-label="Ask PlotCare AI advisor"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder={placeholder}
        />
        <button type="submit" aria-label="Send question" disabled={isLoading}>
          <ArrowIcon />
        </button>
      </form>
      {isLoading ? <div className="ai-response">Reading your land context...</div> : null}
      {error ? <div className="ai-response" role="status">{error}</div> : null}
      {response ? <div className="ai-response">{response}</div> : null}
    </div>
  );
}
