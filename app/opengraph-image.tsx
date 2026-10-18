import { ImageResponse } from "next/og";
import { profile } from "@/lib/data";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#f6f3ec",
          color: "#0e2c24",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 26, color: "#5b6a63" }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 28,
              background: "#0e2c24",
              color: "#f6f3ec",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
            }}
          >
            {profile.initials}
          </div>
          Portfolio
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 96, lineHeight: 1, letterSpacing: -2 }}>
          <span>Shaik Nafees Ahammed</span>
          <span style={{ color: "#1d5c49", fontStyle: "italic" }}>Full-Stack Developer</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#5b6a63" }}>
          <span>React · Next.js · Node.js · Express</span>
          <span>{profile.location}</span>
        </div>
      </div>
    ),
    size,
  );
}
