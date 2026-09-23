import { ImageResponse } from "next/og";

export const alt = "KRONVS | Engenharia, Consultoria e Tecnologia";
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
          justifyContent: "space-between",
          padding: 80,
          background: "#050805",
          color: "#fff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", fontSize: 44, letterSpacing: 4 }}>
          KRONVS
          <div style={{ width: 14, height: 14, borderRadius: 14, background: "#7dd3c8", marginLeft: 8, marginBottom: 22 }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 76, lineHeight: 1.1 }}>
          <span>Projetos de engenharia.</span>
          <span style={{ color: "#7dd3c8" }}>Sistemas para sua empresa.</span>
        </div>
        <div style={{ fontSize: 30, color: "#9aa5a0" }}>Engenharia, Consultoria e Tecnologia</div>
      </div>
    ),
    size,
  );
}
