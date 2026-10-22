export type ContactPayload = {
  type: "contact" | "audit" | "calculator";
  name: string;
  email: string;
  phone?: string;
  role?: string;
  message: string;
  consent: boolean;
  /** Honeypot: real people leave this empty. */
  website?: string;
};

export type SubmitResult = { ok: true } | { ok: false; reason: "invalid" | "unavailable" | "network" };

export async function postContact(payload: ContactPayload): Promise<SubmitResult> {
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (response.ok) return { ok: true };
    if (response.status === 400) return { ok: false, reason: "invalid" };
    return { ok: false, reason: "unavailable" };
  } catch {
    return { ok: false, reason: "network" };
  }
}
