import { ImageResponse } from "next/og";
import { brand } from "@/config/brand";
import { MARK_PATH } from "@/components/brand/mark-path";

export const alt = brand.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0B2A1E",
          color: "#F3ECD9",
        }}
      >
        <svg width="420" height="289" viewBox="0 0 3150 2166">
          <path fill="#F3ECD9" fillRule="evenodd" d={MARK_PATH} />
        </svg>
        <div style={{ marginTop: 40, fontSize: 56, letterSpacing: "-0.01em", fontFamily: "serif" }}>{brand.name}</div>
      </div>
    ),
    size,
  );
}
