import { Copy } from "./Copy";

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="border-t border-cream-300">
      {items.map((item) => (
        <details key={item.q} name="faq" className="group border-b border-cream-300">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-8 py-6 text-lead text-green-900 [&::-webkit-details-marker]:hidden">
            <span className="font-display text-[1.35rem] leading-snug">{item.q}</span>
            <span aria-hidden="true" className="acc-icon relative block h-4 w-4 shrink-0" />
          </summary>
          <p className="max-w-[44rem] pb-7 text-ink-muted">
            <Copy text={item.a} />
          </p>
        </details>
      ))}
    </div>
  );
}
