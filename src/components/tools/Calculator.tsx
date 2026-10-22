"use client";

import { useId, useState } from "react";
import { TransitionLink } from "@/components/motion/TransitionLink";

const gbp = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 });
const num = new Intl.NumberFormat("en-GB", { maximumFractionDigits: 1 });

function Slider({
  label,
  hint,
  value,
  min,
  max,
  step,
  display,
  onChange,
}: {
  label: string;
  hint: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (v: number) => void;
}) {
  const id = useId();
  return (
    <div className="border-b border-cream-300 pb-6">
      <div className="flex items-baseline justify-between gap-6">
        <label htmlFor={id} className="text-green-900">
          {label}
        </label>
        <output htmlFor={id} className="font-display text-[1.6rem] text-green-900">
          {display}
        </output>
      </div>
      <input
        id={id}
        type="range"
        className="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-valuetext={display}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <p className="text-small text-ink-muted">{hint}</p>
    </div>
  );
}

export function Calculator() {
  const [enquiries, setEnquiries] = useState(30);
  const [value, setValue] = useState(5000);
  const [conversion, setConversion] = useState(5);
  const [cold, setCold] = useState(20);

  const goneCold = (enquiries * cold) / 100;
  const salesYear = ((goneCold * conversion) / 100) * 12;
  const revenueYear = salesYear * value;

  const summary = `Calculator: ${enquiries} enquiries a month, ${gbp.format(value)} average sale, ${conversion}% become sales, ${cold}% go cold when replies are slow. That suggests about ${gbp.format(Math.round(revenueYear / 100) * 100)} a year at risk.`;

  return (
    <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
      <div className="grid gap-8 lg:col-span-6">
        <Slider
          label="Enquiries a month"
          hint="All the messages, calls and forms from people asking about your horses."
          value={enquiries}
          min={5}
          max={300}
          step={5}
          display={String(enquiries)}
          onChange={setEnquiries}
        />
        <Slider
          label="Average sale price"
          hint="A typical figure for the horses you sell."
          value={value}
          min={1000}
          max={50000}
          step={500}
          display={gbp.format(value)}
          onChange={setValue}
        />
        <Slider
          label="Enquiries that become sales"
          hint="Roughly how many out of every hundred enquiries end in a sale."
          value={conversion}
          min={1}
          max={30}
          step={1}
          display={`${conversion}%`}
          onChange={setConversion}
        />
        <Slider
          label="Buyers who go cold when replies are slow"
          hint="Your own best estimate. It is the number that matters most, so be honest with yourself."
          value={cold}
          min={5}
          max={60}
          step={5}
          display={`${cold}%`}
          onChange={setCold}
        />
      </div>

      <div className="lg:col-span-5 lg:col-start-8">
        <div className="bg-green-900 p-8 text-cream-100 sm:p-10" role="region" aria-label="Result" aria-live="polite">
          <p className="text-small text-cream-300">Revenue that may be slipping away each year</p>
          <p className="mt-3 font-display text-display-lg">{gbp.format(Math.round(revenueYear / 100) * 100)}</p>
          <dl className="mt-8 border-t border-cream-300/25">
            <div className="flex items-baseline justify-between gap-6 border-b border-cream-300/25 py-4">
              <dt className="text-cream-300">Enquiries going cold each month</dt>
              <dd>{num.format(goneCold)}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-6 border-b border-cream-300/25 py-4">
              <dt className="text-cream-300">Sales at risk each year</dt>
              <dd>{num.format(salesYear)}</dd>
            </div>
          </dl>
          <p className="mt-6 text-small text-cream-300">
            An illustration built only from the figures you entered. It is not a prediction or an industry statistic.
          </p>
        </div>
        <div className="mt-8">
          <TransitionLink
            href={`/contact?source=calculator&note=${encodeURIComponent(summary)}`}
            className="link-underline py-1 text-[0.72rem] uppercase tracking-[0.2em] text-green-900"
          >
            Talk through these numbers with us
          </TransitionLink>
        </div>
      </div>
    </div>
  );
}
