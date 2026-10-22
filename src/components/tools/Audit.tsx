"use client";

import { useState, type FormEvent } from "react";
import { brand } from "@/config/brand";
import { Button } from "@/components/ui/Button";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { postContact } from "@/lib/contact-client";
import { cn } from "@/lib/cn";

type Question = {
  id: string;
  text: string;
  options: [string, string, string]; // best to weakest, scored 2, 1, 0
  advice: string;
};

const questions: Question[] = [
  {
    id: "site",
    text: "Do your horses have a website of their own?",
    options: ["Yes, our own site", "Only social media or sales platforms", "No"],
    advice:
      "Give every horse one page of its own that you control, with the facts, the photographs and the video together.",
  },
  {
    id: "speed",
    text: "How quickly do you usually reply to a new enquiry?",
    options: ["Within minutes", "Within a few hours", "The next day or later"],
    advice:
      "Aim to send a useful first reply within minutes. Automating the first response is the single biggest change most sellers can make.",
  },
  {
    id: "repeat",
    text: "How often do you answer the same questions?",
    options: ["Rarely", "Sometimes", "Constantly"],
    advice:
      "Write your answers to the common questions down once, per horse. They can then be sent in seconds, or automatically.",
  },
  {
    id: "media",
    text: "How do buyers see photographs and video of a horse?",
    options: ["One clear page per horse", "Spread across several places", "Only on request"],
    advice:
      "Bring the media together. A buyer who has seen the horse walk, trot and canter before they message you asks better questions.",
  },
  {
    id: "viewing",
    text: "How do you arrange viewings?",
    options: ["Online booking or a set process", "Back-and-forth messages", "It depends each time"],
    advice:
      "Offer two or three fixed viewing slots in your first reply. It removes the back-and-forth and turns interest into a date.",
  },
  {
    id: "track",
    text: "Do you keep track of where each enquiry came from and what happened?",
    options: ["A simple log", "Partly, in notes or memory", "No"],
    advice:
      "Keep a plain log of every enquiry, its source and its outcome. After a few months you will see which routes actually sell horses.",
  },
];

const band = (score: number) =>
  score >= 10
    ? { title: "Strong foundations", text: "You are already doing most things well. A few refinements could make it faster and calmer." }
    : score >= 6
      ? { title: "Room to improve", text: "The basics are in place, but some enquiries are probably waiting longer than they need to." }
      : { title: "Enquiries are likely slipping away", text: "The good news is that a few clear changes can make a large difference." };

export function Audit() {
  const [answers, setAnswers] = useState<(number | null)[]>(questions.map(() => null));
  const [done, setDone] = useState(false);
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const answered = answers.filter((a) => a !== null).length;
  const score = answers.reduce<number>((sum, a) => sum + (a === null ? 0 : 2 - a), 0);
  const weakest = questions
    .map((q, i) => ({ q, points: answers[i] === null ? 2 : 2 - (answers[i] as number) }))
    .filter((x) => x.points < 2)
    .sort((a, b) => a.points - b.points)
    .slice(0, 3);

  const summary = questions
    .map((q, i) => `${q.text} ${answers[i] === null ? "(skipped)" : q.options[answers[i] as number]}`)
    .join("\n");

  async function send(event: FormEvent) {
    event.preventDefault();
    if (!consent || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setState("error");
      return;
    }
    setState("sending");
    const result = await postContact({
      type: "audit",
      name: "",
      email,
      message: `Seller readiness audit. Score ${score} of 12.\n\n${summary}`,
      consent: true,
    });
    setState(result.ok ? "sent" : "error");
  }

  if (done) {
    const result = band(score);
    return (
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16" role="region" aria-label="Your result">
        <div className="lg:col-span-6">
          <p className="text-small text-ink-muted">
            Your result: {score} out of 12
          </p>
          <h3 className="mt-3 font-display text-display-lg text-green-900">{result.title}</h3>
          <p className="mt-5 max-w-md text-lead text-ink-muted">{result.text}</p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <Button href={brand.cta.href}>{brand.cta.label}</Button>
            <button
              type="button"
              onClick={() => {
                setAnswers(questions.map(() => null));
                setDone(false);
                setState("idle");
              }}
              className="link-underline py-1 text-[0.72rem] uppercase tracking-[0.2em] text-green-900"
            >
              Start again
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <h4 className="font-display text-display-md text-green-900">
            {weakest.length ? "Where to start" : "Nothing urgent"}
          </h4>
          <ol className="mt-6 border-t border-cream-300">
            {weakest.map(({ q }, i) => (
              <li key={q.id} className="border-b border-cream-300 py-5">
                <span className="mr-3 font-display text-green-700">{i + 1}.</span>
                {q.advice}
              </li>
            ))}
          </ol>

          {state === "sent" ? (
            <p role="status" className="mt-8 text-green-900">
              Thank you. We have your result and will be in touch {brand.responseTime}.
            </p>
          ) : (
            <form onSubmit={send} className="mt-10 grid gap-5" noValidate>
              <p className="text-small text-ink-muted">
                Want us to look at your result with you? Leave your email and we will reply with a few specific ideas.
                Optional.
              </p>
              <div>
                <label htmlFor="audit-email" className="label">
                  Email
                </label>
                <input
                  id="audit-email"
                  type="email"
                  autoComplete="email"
                  className="field"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <label className="flex items-start gap-3 text-small text-ink-muted">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 accent-green-900"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                />
                <span>
                  I am happy for {brand.name} to use this to reply to me. See our{" "}
                  <TransitionLink href="/privacy" className="link-underline text-green-900">
                    privacy policy
                  </TransitionLink>
                  .
                </span>
              </label>
              <div className="flex flex-wrap items-center gap-5">
                <Button type="submit" variant="secondary" disabled={state === "sending"}>
                  {state === "sending" ? "Sending" : "Send my result"}
                </Button>
                <p role="status" className="text-small text-ink-muted">
                  {state === "error" ? "Please check your email address and tick the box, then try again." : ""}
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (answered === questions.length) setDone(true);
      }}
      className="grid gap-0"
    >
      <p className="mb-8 text-small text-ink-muted" aria-live="polite">
        {answered} of {questions.length} answered
      </p>
      {questions.map((q, qi) => (
        <fieldset key={q.id} className="border-t border-cream-300 py-8">
          <legend className="float-left w-full font-display text-display-md text-green-900">{q.text}</legend>
          <div className="clear-both grid gap-3 pt-6 sm:grid-cols-3">
            {q.options.map((option, oi) => {
              const selected = answers[qi] === oi;
              return (
                <label
                  key={option}
                  className={cn(
                    "flex min-h-14 cursor-pointer items-center border px-5 py-4 transition-colors duration-300 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-3 has-[:focus-visible]:outline-brass",
                    selected
                      ? "border-green-900 bg-green-900 text-cream-100"
                      : "border-green-900/30 text-ink hover:border-green-900",
                  )}
                >
                  <input
                    type="radio"
                    name={q.id}
                    value={oi}
                    checked={selected}
                    onChange={() => setAnswers((a) => a.map((v, i) => (i === qi ? oi : v)))}
                    className="sr-only"
                  />
                  {option}
                </label>
              );
            })}
          </div>
        </fieldset>
      ))}
      <div className="border-t border-cream-300 pt-8">
        <Button type="submit" disabled={answered < questions.length}>
          See my result
        </Button>
      </div>
    </form>
  );
}
