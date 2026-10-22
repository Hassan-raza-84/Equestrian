"use client";

import { useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { brand } from "@/config/brand";
import { Button } from "@/components/ui/Button";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { postContact } from "@/lib/contact-client";

const roles = ["Horse seller", "Breeder", "Yard or livery", "Trainer", "Another equestrian business"];
type Status = "idle" | "sending" | "sent" | "error";
type Errors = Partial<Record<"name" | "email" | "message" | "consent", string>>;

export function ContactForm() {
  const params = useSearchParams();
  const note = params.get("note") ?? "";
  const source = params.get("source");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [failure, setFailure] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const get = (key: string) => String(form.get(key) ?? "").trim();
    const next: Errors = {};
    if (!get("name")) next.name = "Please tell us your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(get("email"))) next.email = "Please enter a valid email address.";
    if (get("message").length < 5) next.message = "Please tell us a little about what you need.";
    if (form.get("consent") !== "on") next.consent = "Please confirm you are happy for us to contact you.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("sending");
    const result = await postContact({
      type: source === "calculator" ? "calculator" : "contact",
      name: get("name"),
      email: get("email"),
      phone: get("phone"),
      role: get("role"),
      message: get("message"),
      consent: true,
      website: get("website"),
    });
    if (result.ok) {
      setStatus("sent");
      return;
    }
    setFailure(
      result.reason === "invalid"
        ? "Something in the form needs another look. Please check it and try again."
        : `We could not send that just now. Please email ${brand.email} and we will reply ${brand.responseTime}.`,
    );
    setStatus("error");
  }

  if (status === "sent") {
    return (
      <div role="status" className="border-t border-cream-300 pt-10">
        <h2 className="font-display text-display-md text-green-900">Thank you.</h2>
        <p className="mt-4 max-w-md text-lead text-ink-muted">
          We have your message and will reply {brand.responseTime}.
        </p>
      </div>
    );
  }

  const sending = status === "sending";
  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-8">
      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="label">
            Name
          </label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            className="field"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <p id="name-error" className="mt-2 text-small text-green-700">
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className="field"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p id="email-error" className="mt-2 text-small text-green-700">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="label">
            Phone (optional)
          </label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" className="field" />
        </div>
        <div>
          <label htmlFor="role" className="label">
            I am a
          </label>
          <select id="role" name="role" className="field" defaultValue={roles[0]}>
            {roles.map((role) => (
              <option key={role}>{role}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="label">
          How can we help?
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          defaultValue={note}
          className="field resize-y"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <p id="message-error" className="mt-2 text-small text-green-700">
            {errors.message}
          </p>
        )}
      </div>

      {/* Honeypot. Hidden from people; bots fill it in. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label className="flex items-start gap-3 text-small text-ink-muted">
          <input
            type="checkbox"
            name="consent"
            className="mt-1 h-4 w-4 accent-green-900"
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? "consent-error" : undefined}
          />
          <span>
            I am happy for {brand.name} to use these details to reply to me. See our{" "}
            <TransitionLink href="/privacy" className="link-underline text-green-900">
              privacy policy
            </TransitionLink>
            .
          </span>
        </label>
        {errors.consent && (
          <p id="consent-error" className="mt-2 text-small text-green-700">
            {errors.consent}
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <Button type="submit" disabled={sending}>
          {sending ? "Sending" : "Send message"}
        </Button>
        <p role="status" className="text-small text-ink-muted">
          {status === "error" ? failure : ""}
        </p>
      </div>
    </form>
  );
}
