import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";

import {
  BACKGROUND_COLOR,
  BOX_BOTTOM,
  BOX_TOP,
  MUTED_COLOR,
  PERFECT_SCORE,
  SCORE_BAR_WIDTH,
} from "../constants";
import { fontFamily } from "../utils/font";
import {
  getDoctorFace,
  getScoreColor,
  getScoreLabel,
} from "../utils/score-display";

const SCORE_ANIMATION_FRAMES = 25;
const SCORE_FONT_SIZE_PX = 96;
const SCORE_FACE_FONT_SIZE_PX = 72;
const SCORE_LABEL_FONT_SIZE_PX = 56;
const SCORE_BAR_FONT_SIZE_PX = 44;

export const ScoreReveal = () => {
  const frame = useCurrentFrame();

  const scoreProgress = interpolate(
    frame,
    [0, SCORE_ANIMATION_FRAMES],
    [0, 1],
    {
      easing: Easing.linear,
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const currentScore = Math.round(scoreProgress * PERFECT_SCORE);
  const scoreColor = getScoreColor(currentScore);
  const [eyes, mouth] = getDoctorFace(currentScore);
  const filledBarCount = Math.round(
    (currentScore / PERFECT_SCORE) * SCORE_BAR_WIDTH,
  );
  const emptyBarCount = SCORE_BAR_WIDTH - filledBarCount;

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        backgroundColor: BACKGROUND_COLOR,
        justifyContent: "center",
      }}
    >
      <div
        style={{
          alignItems: "flex-start",
          display: "flex",
          gap: 48,
        }}
      >
        <pre
          style={{
            color: scoreColor,
            fontFamily,
            fontSize: SCORE_FACE_FONT_SIZE_PX,
            lineHeight: 1.2,
            margin: 0,
          }}
        >
          {`${BOX_TOP}\n│ ${eyes} │\n│ ${mouth} │\n${BOX_BOTTOM}`}
        </pre>

        <div>
          <div>
            <span
              style={{
                color: scoreColor,
                fontFamily,
                fontSize: SCORE_FONT_SIZE_PX,
                fontWeight: 500,
              }}
            >
              {currentScore}
            </span>
            <span
              style={{
                color: MUTED_COLOR,
                fontFamily,
                fontSize: SCORE_LABEL_FONT_SIZE_PX,
              }}
            >
              {` / ${PERFECT_SCORE}  `}
            </span>
            <span
              style={{
                color: scoreColor,
                fontFamily,
                fontSize: SCORE_LABEL_FONT_SIZE_PX,
              }}
            >
              {getScoreLabel(currentScore)}
            </span>
          </div>
          <div
            style={{
              fontFamily,
              fontSize: SCORE_BAR_FONT_SIZE_PX,
              letterSpacing: 2,
              marginTop: 8,
            }}
          >
            <span style={{ color: scoreColor }}>
              {"█".repeat(filledBarCount)}
            </span>
            <span style={{ color: "#525252" }}>
              {"░".repeat(emptyBarCount)}
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
