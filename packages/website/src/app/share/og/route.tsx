/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";

import { PERFECT_SCORE } from "@/constants/score";
import getScoreHexColor from "@/utils/get-score-hex-color";
import getScoreLabel from "@/utils/get-score-label";

const IMAGE_WIDTH_PX = 1200;
const IMAGE_HEIGHT_PX = 630;
const OG_ICON_SIZE_PX = 48;
const OG_LOGO_PATH = "/icon-light.svg";

export const GET = (request: Request): ImageResponse => {
  const { searchParams } = new URL(request.url);

  const projectName = searchParams.get("p") ?? null;
  const score = Math.max(
    0,
    Math.min(PERFECT_SCORE, Number(searchParams.get("s")) || 0),
  );
  const errorCount = Math.max(0, Number(searchParams.get("e")) || 0);
  const warningCount = Math.max(0, Number(searchParams.get("w")) || 0);
  const fileCount = Math.max(0, Number(searchParams.get("f")) || 0);
  const scoreColor = getScoreHexColor(score);
  const logoUrl = new URL(OG_LOGO_PATH, request.url).toString();
  const scoreBarPercent = (score / PERFECT_SCORE) * 100;

  return new ImageResponse(
    <div
      style={{
        backgroundColor: "#0a0a0a",
        display: "flex",
        flexDirection: "column",
        fontFamily: "monospace",
        height: "100%",
        justifyContent: "center",
        padding: "60px 80px",
        width: "100%",
      }}
    >
      <div style={{ alignItems: "center", display: "flex", gap: "24px" }}>
        <div style={{ alignItems: "center", display: "flex", gap: "12px" }}>
          <img
            src={logoUrl}
            width={OG_ICON_SIZE_PX}
            height={OG_ICON_SIZE_PX}
            alt=""
          />
          <span
            style={{
              color: "#fafafa",
              fontSize: "28px",
              fontWeight: 700,
            }}
          >
            Vercel Doctor
          </span>
        </div>
        {projectName && (
          <div
            style={{
              color: "#a3a3a3",
              display: "flex",
              fontSize: "36px",
              marginLeft: "auto",
            }}
          >
            {projectName}
          </div>
        )}
      </div>

      <div
        style={{
          alignItems: "baseline",
          display: "flex",
          gap: "16px",
          marginTop: "48px",
        }}
      >
        <span
          style={{
            color: scoreColor,
            fontSize: "120px",
            fontWeight: 700,
            lineHeight: 1,
          }}
        >
          {score}
        </span>
        <span style={{ color: "#525252", fontSize: "40px", lineHeight: 1 }}>
          / {PERFECT_SCORE}
        </span>
        <span
          style={{
            color: scoreColor,
            fontSize: "40px",
            lineHeight: 1,
            marginLeft: "8px",
          }}
        >
          {getScoreLabel(score)}
        </span>
      </div>

      <div
        style={{
          backgroundColor: "#1a1a1a",
          borderRadius: "8px",
          display: "flex",
          height: "16px",
          marginTop: "32px",
          overflow: "hidden",
          width: "100%",
        }}
      >
        <div
          style={{
            backgroundColor: scoreColor,
            borderRadius: "8px",
            height: "100%",
            width: `${scoreBarPercent}%`,
          }}
        />
      </div>

      {(errorCount > 0 || warningCount > 0 || fileCount > 0) && (
        <div
          style={{
            display: "flex",
            fontSize: "24px",
            gap: "24px",
            marginTop: "36px",
          }}
        >
          {errorCount > 0 && (
            <span style={{ color: "#f87171" }}>
              {errorCount} error{errorCount === 1 ? "" : "s"}
            </span>
          )}
          {warningCount > 0 && (
            <span style={{ color: "#eab308" }}>
              {warningCount} warning{warningCount === 1 ? "" : "s"}
            </span>
          )}
          {fileCount > 0 && (
            <span style={{ color: "#737373" }}>
              across {fileCount} file{fileCount === 1 ? "" : "s"}
            </span>
          )}
        </div>
      )}
    </div>,
    { height: IMAGE_HEIGHT_PX, width: IMAGE_WIDTH_PX },
  );
};
