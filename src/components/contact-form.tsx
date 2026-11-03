"use client";

import { useState } from "react";
import { Arrow } from "./arrow";
import { site } from "@/lib/site";

export function ContactForm({ enabled }: { enabled: boolean }) {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [error, setError] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!enabled || status === "sending") return;
    const form = event.currentTarget;
    const fields = Object.fromEntries(new FormData(form));
    setStatus("sending");
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
        signal: AbortSignal.timeout(15000),
      });
      if (!response.ok)
        throw new Error(
          "Your message couldn’t be sent. Please try again or email me directly.",
        );
      setStatus("success");
      form.reset();
    } catch (cause) {
      setError(
        cause instanceof Error && cause.name !== "TimeoutError"
          ? cause.message
          : "The connection timed out. Please email me directly.",
      );
      setStatus("error");
    }
  }

  return (
    <form
      className="contact-form"
      onSubmit={submit}
      aria-describedby={!enabled ? "form-note" : undefined}
    >
      <div className="form-row">
        <label>
          Your name
          <input
            name="name"
            autoComplete="name"
            placeholder="Alex Smith"
            required
            maxLength={100}
          />
        </label>
        <label>
          Email address
          <input
            name="email"
            type="email"
            autoComplete="email"
            placeholder="alex@yourbusiness.co.nz"
            required
            maxLength={254}
          />
        </label>
      </div>
      <label>
        Existing website <span className="optional">(optional)</span>
        <input
          name="website"
          type="url"
          autoComplete="url"
          placeholder="https://yourbusiness.co.nz"
          maxLength={500}
        />
      </label>
      <label>
        A little about your project
        <textarea
          name="message"
          placeholder="Tell me about your business and what you have in mind…"
          rows={4}
          minLength={10}
          maxLength={5000}
          required
        />
      </label>
      <div className="honeypot" aria-hidden="true">
        <label>
          Leave this field empty
          <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      {!enabled && (
        <p id="form-note" className="form-note">
          The enquiry form isn’t connected yet. For now, please{" "}
          <a href={`mailto:${site.email}`}>email me directly</a>.
        </p>
      )}
      <div className="form-bottom">
        <button
          className="button"
          disabled={!enabled || status === "sending"}
          type="submit"
        >
          {status === "sending" ? "Sending…" : "Send enquiry"}
          <Arrow />
        </button>
        <span>No obligation. Just a conversation.</span>
      </div>
      <div role="status" aria-live="polite">
        {status === "success" && (
          <p className="form-feedback">
            Thanks for getting in touch. Your message has been sent.
          </p>
        )}
        {status === "error" && (
          <p className="form-feedback">
            {error} <a href={`mailto:${site.email}`}>Email Andrew</a>
          </p>
        )}
      </div>
    </form>
  );
}
