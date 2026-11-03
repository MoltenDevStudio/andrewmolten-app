import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Andrew Molten — Better websites. A personal approach.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const font = await readFile(
    join(
      process.cwd(),
      "node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff",
    ),
  );
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        padding: "62px 78px",
        background: "#f7f5ef",
        color: "#292d27",
      }}
    >
      <div style={{ display: "flex", fontSize: 29, fontFamily: "serif" }}>
        andrew molten<span style={{ color: "#98523c" }}>.</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: 66,
          fontSize: 100,
          lineHeight: 1,
          fontFamily: "Instrument",
        }}
      >
        <span>Better websites.</span>
        <span style={{ color: "#98523c" }}>A personal approach.</span>
      </div>
      <div
        style={{
          display: "flex",
          marginTop: "auto",
          paddingTop: 36,
          borderTop: "1px solid #d9d9cf",
          justifyContent: "space-between",
          fontSize: 19,
        }}
      >
        <span>Web design & development</span>
        <span>Christchurch, New Zealand</span>
      </div>
    </div>,
    { ...size, fonts: [{ name: "Instrument", data: font, weight: 400 }] },
  );
}
