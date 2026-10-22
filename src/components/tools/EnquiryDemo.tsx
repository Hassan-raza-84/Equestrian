"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/cn";

type Msg = { id: number; from: "buyer" | "yard"; text: string };
type Step = "start" | "level" | "interest" | "distance" | "slot" | "done";
type Answers = { level?: string; interest?: string; distance?: string; slot?: string };

const HORSE = "Daisy";

const openers: { label: string; replies: string[] }[] = [
  {
    label: `Is ${HORSE} still available?`,
    replies: [
      `Hello, and thank you for asking about ${HORSE}. Yes, she is still available. She is a seven-year-old, 16.1hh bay mare, schooled to novice level and good to hack, load and travel.`,
    ],
  },
  {
    label: "Can I see videos?",
    replies: [
      `Of course. Here are ${HORSE}’s walk, trot and canter videos, and a short jumping clip from last month (demonstration link).`,
      `She is a seven-year-old, 16.1hh bay mare, and she is still available.`,
    ],
  },
  {
    label: "Can I arrange a viewing?",
    replies: [
      `Yes, we would love to show you ${HORSE}. She is a seven-year-old, 16.1hh bay mare and is still available.`,
    ],
  },
];

const interestReplies: Record<string, string> = {
  Jumping: `${HORSE} loves her jumping, so that sounds like a good fit.`,
  Eventing: `She has a sensible head and plenty of scope, so eventing at novice level suits her well.`,
  "Hacking and fun": `She is a pleasure to hack out, so that suits her very well.`,
};

const chipsFor: Record<Exclude<Step, "start" | "done">, string[]> = {
  level: ["Novice", "Intermediate", "Experienced"],
  interest: ["Jumping", "Eventing", "Hacking and fun"],
  distance: ["Under 50 miles", "50 to 150 miles", "Further away"],
  slot: ["Saturday, 10:30", "Saturday, 14:00", "Tuesday, 17:30"],
};

export function EnquiryDemo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [step, setStep] = useState<Step>("start");
  const [answers, setAnswers] = useState<Answers>({});
  const [typing, setTyping] = useState(false);
  const idRef = useRef(0);
  const timers = useRef<number[]>([]);
  const logRef = useRef<HTMLDivElement>(null);

  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };
  useEffect(() => clearTimers, []);

  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [messages, typing]);

  const add = useCallback((from: Msg["from"], text: string) => {
    idRef.current += 1;
    setMessages((m) => [...m, { id: idRef.current, from, text }]);
  }, []);

  const say = useCallback(
    (texts: string[], after: () => void) => {
      const delay = prefersReducedMotion() ? 150 : 950;
      let i = 0;
      const next = () => {
        if (i >= texts.length) {
          setTyping(false);
          after();
          return;
        }
        setTyping(true);
        timers.current.push(
          window.setTimeout(() => {
            add("yard", texts[i]);
            i += 1;
            next();
          }, delay),
        );
      };
      next();
    },
    [add],
  );

  const choose = (label: string) => {
    if (typing) return;
    add("buyer", label);

    if (step === "start") {
      const opener = openers.find((o) => o.label === label);
      say([...(opener?.replies ?? []), "To make a viewing worthwhile for you, may I ask what level of rider she would be for?"], () =>
        setStep("level"),
      );
      setStep("level");
      return;
    }
    if (step === "level") {
      setAnswers((a) => ({ ...a, level: label }));
      setStep("interest");
      say(["Thank you.", "And what would you like to do with her?"], () => undefined);
      return;
    }
    if (step === "interest") {
      setAnswers((a) => ({ ...a, interest: label }));
      setStep("distance");
      say([interestReplies[label] ?? "Lovely.", "Roughly how far are you from the yard?"], () => undefined);
      return;
    }
    if (step === "distance") {
      setAnswers((a) => ({ ...a, distance: label }));
      setStep("slot");
      say(["Thank you, that helps.", "I can offer these viewing times. Which suits you best?"], () => undefined);
      return;
    }
    if (step === "slot") {
      setAnswers((a) => ({ ...a, slot: label }));
      setStep("done");
      say(
        [`Booked: ${label}. A confirmation with directions has been sent to you, and the yard has been notified. If anything changes, just reply here.`],
        () => undefined,
      );
    }
  };

  const reset = () => {
    clearTimers();
    setMessages([]);
    setStep("start");
    setAnswers({});
    setTyping(false);
  };

  const chips = step === "start" ? openers.map((o) => o.label) : step === "done" ? [] : chipsFor[step];
  const dark = tone === "dark";

  const rows: [string, string | undefined][] = [
    ["Status", step === "done" ? "Viewing booked" : messages.length ? "Qualifying" : "Waiting for an enquiry"],
    ["First reply", messages.length ? "Instant" : undefined],
    ["Rider level", answers.level],
    ["Interest", answers.interest],
    ["Distance", answers.distance],
    ["Viewing", answers.slot],
  ];

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
      <div className="lg:col-span-5">
        <div className="mx-auto w-full max-w-[24rem] rounded-[2.6rem] bg-green-700 p-2.5 shadow-[0_2.5rem_5rem_-2.5rem_rgb(0_0_0/0.6)] lg:mx-0">
          <div className="flex h-[34rem] flex-col overflow-hidden rounded-[2.1rem] bg-cream-50 text-ink">
            <div className="border-b border-cream-300 px-5 pt-7 pb-3">
              <p className="font-medium">Willowbrook Yard (demo)</p>
              <p className="text-small text-ink-muted">Sales enquiries</p>
            </div>

            <div
              ref={logRef}
              role="log"
              aria-live="polite"
              aria-label="Demonstration conversation"
              className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-5"
            >
              {messages.length === 0 && (
                <p className="m-auto max-w-[14rem] text-center text-small text-ink-muted">
                  Choose a message below to play the buyer.
                </p>
              )}
              {messages.map((m) => (
                <p
                  key={m.id}
                  className={cn(
                    "max-w-[85%] px-4 py-3 text-[0.92rem] leading-snug",
                    m.from === "buyer"
                      ? "self-end rounded-[1.2rem_1.2rem_0.3rem_1.2rem] bg-green-700 text-cream-100"
                      : "self-start rounded-[1.2rem_1.2rem_1.2rem_0.3rem] bg-cream-300",
                  )}
                >
                  {m.text}
                </p>
              ))}
              {typing && (
                <p aria-label="The yard is typing" className="typing self-start rounded-[1.2rem] bg-cream-300 px-4 py-3">
                  <span />
                  <span />
                  <span />
                </p>
              )}
            </div>

            <div className="min-h-[7.5rem] border-t border-cream-300 px-4 py-3">
              {step === "done" && !typing ? (
                <button type="button" onClick={reset} className="link-underline py-2 text-small text-green-900">
                  Play it again
                </button>
              ) : (
                <div className="flex flex-wrap gap-2" aria-label="Choose a reply">
                  {!typing &&
                    chips.map((chip) => (
                      <button
                        key={chip}
                        type="button"
                        onClick={() => choose(chip)}
                        className="min-h-10 rounded-full border border-green-700 px-4 py-2 text-[0.85rem] text-green-700 transition-colors duration-300 hover:bg-green-700 hover:text-cream-100"
                      >
                        {chip}
                      </button>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-6 lg:col-start-7">
        <h3 className={cn("font-display text-display-md", dark ? "text-cream-100" : "text-green-900")}>
          What the yard sees
        </h3>
        <p className={cn("mt-3 max-w-md", dark ? "text-cream-300" : "text-ink-muted")}>
          While the buyer chats, a clear summary builds itself. By the time you pick up the phone, you know who is
          calling and why.
        </p>
        <dl className={cn("mt-8 border-t", dark ? "border-cream-300/25" : "border-cream-300")}>
          {rows.map(([label, value]) => (
            <div
              key={label}
              className={cn(
                "flex items-baseline justify-between gap-6 border-b py-4",
                dark ? "border-cream-300/25" : "border-cream-300",
              )}
            >
              <dt className={cn("text-small", dark ? "text-cream-300" : "text-ink-muted")}>{label}</dt>
              <dd className={cn("text-right", dark ? "text-cream-100" : "text-green-900", !value && "italic")}>
                {value ?? "Waiting"}
              </dd>
            </div>
          ))}
        </dl>
        <p className={cn("mt-8 max-w-md text-small", dark ? "text-cream-300" : "text-ink-muted")}>
          A scripted demonstration with a fictional yard and horse. A live system answers about your real horses, in
          your voice.
        </p>
      </div>
    </div>
  );
}
