import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "TaskFlow - Organize the chaos. Craft your focus.";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#FAF8F3", // TaskFlow Light Theme Background
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {/* Subtle Background Pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.2,
            backgroundImage: "radial-gradient(circle at 25px 25px, #0F766E 2%, transparent 0%), radial-gradient(circle at 75px 75px, #C2410C 2%, transparent 0%)",
            backgroundSize: "100px 100px",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "32px",
            marginBottom: "32px",
          }}
        >
          {/* Logo SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="120"
            height="120"
            viewBox="14 14 36 36"
          >
            <rect x="14" y="14" width="16" height="16" rx="4" fill="#0F766E" />
            <rect x="34" y="14" width="16" height="16" rx="4" fill="#0F766E" />
            <rect x="14" y="34" width="16" height="16" rx="4" fill="#C2410C" />
            <rect x="34" y="34" width="16" height="16" rx="4" fill="#0F766E" />
          </svg>

          {/* Title */}
          <div
            style={{
              fontSize: 110,
              fontFamily: "sans-serif",
              fontWeight: 800,
              color: "#1C1A17",
              letterSpacing: "-0.04em",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "16px",
            }}
          >
            TaskFlow
          </div>
        </div>
        
        {/* Subtitle */}
        <div
          style={{
            fontSize: 42,
            fontFamily: "sans-serif",
            color: "#6B6459",
            fontWeight: 500,
            letterSpacing: "-0.01em",
            textAlign: "center",
            padding: "0 40px",
          }}
        >
          Organize the chaos. Craft your focus.
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
