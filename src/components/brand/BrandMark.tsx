import { MARK_PATH, MARK_VIEWBOX } from "./mark-path";

type Props = {
  className?: string;
  /** Pass a label only when the mark is the sole content of a link or button. */
  title?: string;
};

/**
 * Defines the mark once per page. Every <BrandMark /> references it, which keeps
 * the HTML small instead of repeating a long path in each place the mark appears.
 */
export function MarkSprite() {
  return (
    <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: "absolute" }}>
      <symbol id="brand-mark" viewBox={MARK_VIEWBOX}>
        <path fill="currentColor" fillRule="evenodd" d={MARK_PATH} />
      </symbol>
    </svg>
  );
}

/** The horse-and-rider mark. Colour comes from `currentColor`. */
export function BrandMark({ className, title }: Props) {
  return (
    <svg
      viewBox={MARK_VIEWBOX}
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <use href="#brand-mark" />
    </svg>
  );
}
