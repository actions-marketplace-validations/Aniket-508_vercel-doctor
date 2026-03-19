import type { ReactNode } from "react";

import { LogoMark } from "@/components/logo";

interface DocsOgImageProps {
  title: ReactNode;
  description?: ReactNode;
}

const DocsOgImage = ({ title, description }: DocsOgImageProps) => (
  <div
    style={{
      backgroundColor: "black",
      color: "white",
      display: "flex",
      flexDirection: "column",
      height: "100%",
      overflow: "hidden",
      position: "relative",
      width: "100%",
    }}
  >
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-between",
        padding: "60px",
        position: "relative",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "32px",
          marginBottom: "40px",
          textWrap: "pretty",
        }}
      >
        <span
          style={{
            color: "white",
            fontSize: 72,
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1.1,
          }}
        >
          {title}
        </span>
        <span
          style={{
            color: "#a1a1aa",
            fontSize: 36,
            fontWeight: 400,
            letterSpacing: "-0.01em",
            lineClamp: 2,
            lineHeight: 1.4,
            maxWidth: "95%",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {description}
        </span>
      </div>

      <div
        style={{
          alignItems: "center",
          display: "flex",
          gap: "20px",
        }}
      >
        <LogoMark width={36} height={36} />
        <span
          style={{
            color: "white",
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            opacity: 0.9,
          }}
        >
          Vercel Doctor
        </span>
        <div style={{ flexGrow: 1 }} />
        <div
          style={{
            backgroundColor: "grey",
            borderRadius: 2,
            height: 4,
            opacity: 0.9,
            width: 60,
          }}
        />
        <span
          style={{
            color: "grey",
            fontSize: 20,
            fontWeight: 700,
            letterSpacing: "0.2em",
            opacity: 0.9,
            textTransform: "uppercase",
          }}
        >
          Documentation
        </span>
      </div>
    </div>
  </div>
);

export default DocsOgImage;
