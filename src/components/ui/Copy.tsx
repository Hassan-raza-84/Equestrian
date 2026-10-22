import { Fragment } from "react";

/**
 * Renders copy and highlights any [VERIFY: ...] placeholder so it cannot be missed.
 * `npm run prelaunch` fails while any placeholder remains in the source.
 */
export function Copy({ text }: { text: string }) {
  const parts = text.split(/(\[VERIFY:[^\]]*\])/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("[VERIFY:") ? (
          <mark key={i} className="verify">
            {part}
          </mark>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}
