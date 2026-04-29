"use client";

import { FormEvent, useState } from "react";
import { ArrowIcon } from "./ArrowIcon";

type AiAdvisorProps = {
  source: string;
  placeholder: string;
};

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
      const res = await fetch("/api/ai", {
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
