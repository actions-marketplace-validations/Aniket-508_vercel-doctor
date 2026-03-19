import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";

import {
  AFFECTED_FILE_COUNT,
  BACKGROUND_COLOR,
  BOX_BOTTOM,
  BOX_TOP,
  DIAGNOSTICS,
  ELAPSED_TIME,
  FRAMES_PER_DIAGNOSTIC,
  MUTED_COLOR,
  OVERLAY_GRADIENT_BOTTOM_PADDING_PX,
  OVERLAY_GRADIENT_HEIGHT_PX,
  OVERLAY_GRADIENT_HORIZONTAL_PADDING_PX,
  PERFECT_SCORE,
  RED_COLOR,
  SCORE_ANIMATION_FRAMES,
  SCORE_BAR_WIDTH,
  SCENE_DIAGNOSTICS_DURATION_FRAMES,
  TARGET_SCORE,
  TEXT_COLOR,
  TOTAL_ERROR_COUNT,
} from "../constants";
import { fontFamily } from "../utils/font";
import { getBottomOverlayGradient } from "../utils/get-bottom-overlay-gradient";
import {
  getDoctorFace,
  getScoreColor,
  getScoreLabel,
} from "../utils/score-display";

const HERO_FACE_FONT_SIZE_PX = 80;
const HERO_NUMBER_FONT_SIZE_PX = 96;
const HERO_LABEL_FONT_SIZE_PX = 56;
const HERO_BAR_FONT_SIZE_PX = 48;

const SMALL_FACE_FONT_SIZE_PX = 40;
const SMALL_NUMBER_FONT_SIZE_PX = 44;
const SMALL_LABEL_FONT_SIZE_PX = 32;
const SMALL_BAR_FONT_SIZE_PX = 28;

const SUMMARY_FONT_SIZE_PX = 34;
const DIAGNOSTIC_FONT_SIZE_PX = 34;

const SCORE_FADE_IN_FRAMES = 10;
const SHRINK_START_FRAME = 30;
const SHRINK_DURATION_FRAMES = 20;
const SHRINK_END_FRAME = SHRINK_START_FRAME + SHRINK_DURATION_FRAMES;
const DIAGNOSTIC_FADE_IN_FRAMES = 6;
const ERRORS_START_DELAY_FRAMES = 58;

const OVERLAY_START_FRAME = Math.floor(SCENE_DIAGNOSTICS_DURATION_FRAMES * 0.5);
const OVERLAY_FADE_IN_FRAMES = 15;
const OVERLAY_HOLD_FRAMES = 35;
const OVERLAY_FADE_OUT_FRAMES = 15;
const OVERLAY_END_FRAME =
  OVERLAY_START_FRAME +
  OVERLAY_FADE_IN_FRAMES +
  OVERLAY_HOLD_FRAMES +
  OVERLAY_FADE_OUT_FRAMES;
const OVERLAY_TITLE_FONT_SIZE_PX = 88;

const lerpSize = (heroSize: number, smallSize: number, progress: number) =>
  heroSize + (smallSize - heroSize) * progress;

export const Diagnostics = () => {
  const frame = useCurrentFrame();

  const scoreBlockOpacity = interpolate(
    frame,
    [0, SCORE_FADE_IN_FRAMES],
    [0, 1],
    {
      easing: Easing.out(Easing.cubic),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const scoreProgress = interpolate(
    frame,
    [0, SCORE_ANIMATION_FRAMES],
    [0, 1],
    {
      easing: Easing.out(Easing.cubic),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );
  const currentScore = Math.round(scoreProgress * TARGET_SCORE);
  const scoreColor = getScoreColor(currentScore);
  const [eyes, mouth] = getDoctorFace(currentScore);
  const filledBarCount = Math.round(
    (currentScore / PERFECT_SCORE) * SCORE_BAR_WIDTH,
  );
  const emptyBarCount = SCORE_BAR_WIDTH - filledBarCount;

  const shrinkProgress = interpolate(
    frame,
    [SHRINK_START_FRAME, SHRINK_END_FRAME],
    [0, 1],
    {
      easing: Easing.inOut(Easing.quad),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const faceFontSize = lerpSize(
    HERO_FACE_FONT_SIZE_PX,
    SMALL_FACE_FONT_SIZE_PX,
    shrinkProgress,
  );
  const numberFontSize = lerpSize(
    HERO_NUMBER_FONT_SIZE_PX,
    SMALL_NUMBER_FONT_SIZE_PX,
    shrinkProgress,
  );
  const labelFontSize = lerpSize(
    HERO_LABEL_FONT_SIZE_PX,
    SMALL_LABEL_FONT_SIZE_PX,
    shrinkProgress,
  );
  const barFontSize = lerpSize(
    HERO_BAR_FONT_SIZE_PX,
    SMALL_BAR_FONT_SIZE_PX,
    shrinkProgress,
  );

  const summaryOpacity = interpolate(
    frame,
    [SHRINK_END_FRAME, SHRINK_END_FRAME + 10],
    [0, 1],
    {
      easing: Easing.out(Easing.cubic),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const diagnosticsStartFrame = ERRORS_START_DELAY_FRAMES;

  const overlayOpacity = interpolate(
    frame,
    [
      OVERLAY_START_FRAME,
      OVERLAY_START_FRAME + OVERLAY_FADE_IN_FRAMES,
      OVERLAY_END_FRAME - OVERLAY_FADE_OUT_FRAMES,
      OVERLAY_END_FRAME,
    ],
    [0, 1, 1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const overlayTitleOpacity = interpolate(
    frame,
    [
      OVERLAY_START_FRAME + 5,
      OVERLAY_START_FRAME + OVERLAY_FADE_IN_FRAMES + 5,
      OVERLAY_END_FRAME - OVERLAY_FADE_OUT_FRAMES - 5,
      OVERLAY_END_FRAME - 5,
    ],
    [0, 1, 1, 0],
    {
      easing: Easing.out(Easing.cubic),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BACKGROUND_COLOR,
      }}
    >
      <div
        style={{
          padding: "60px 80px",
          transform: `translateY(${interpolate(shrinkProgress, [0, 1], [340, 0])}px)`,
        }}
      >
        <div
          style={{
            alignItems: "flex-start",
            display: "flex",
            gap: interpolate(shrinkProgress, [0, 1], [48, 32]),
            marginBottom: 32,
            opacity: scoreBlockOpacity,
          }}
        >
          <pre
            style={{
              color: scoreColor,
              fontFamily,
              fontSize: faceFontSize,
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
                  fontSize: numberFontSize,
                  fontWeight: 500,
                }}
              >
                {currentScore}
              </span>
              <span
                style={{
                  color: MUTED_COLOR,
                  fontFamily,
                  fontSize: labelFontSize,
                }}
              >
                {` / ${PERFECT_SCORE}  `}
              </span>
              <span
                style={{
                  color: scoreColor,
                  fontFamily,
                  fontSize: labelFontSize,
                }}
              >
                {getScoreLabel(currentScore)}
              </span>
            </div>
            <div
              style={{
                fontFamily,
                fontSize: barFontSize,
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

        <div
          style={{
            color: TEXT_COLOR,
            fontFamily,
            fontSize: SUMMARY_FONT_SIZE_PX,
            lineHeight: 1.7,
            marginBottom: 24,
            opacity: summaryOpacity,
          }}
        >
          <span style={{ color: RED_COLOR }}>{TOTAL_ERROR_COUNT} errors</span>
          <span style={{ color: MUTED_COLOR }}>
            {`  across ${AFFECTED_FILE_COUNT} files  in ${ELAPSED_TIME}`}
          </span>
        </div>

        {DIAGNOSTICS.map((diagnostic, index) => {
          const diagnosticStartFrame =
            diagnosticsStartFrame + index * FRAMES_PER_DIAGNOSTIC;
          const localFrame = frame - diagnosticStartFrame;
          const diagnosticOpacity = interpolate(
            localFrame,
            [0, DIAGNOSTIC_FADE_IN_FRAMES],
            [0, 1],
            {
              easing: Easing.out(Easing.cubic),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            },
          );

          return (
            <div
              key={diagnostic.message}
              style={{
                color: TEXT_COLOR,
                fontFamily,
                fontSize: DIAGNOSTIC_FONT_SIZE_PX,
                lineHeight: 1.7,
                marginBottom: 2,
                opacity: diagnosticOpacity,
                whiteSpace: "pre-wrap",
              }}
            >
              <span style={{ color: RED_COLOR }}> ✗</span>
              {` ${diagnostic.message} `}
              <span style={{ color: MUTED_COLOR }}>({diagnostic.count})</span>
            </div>
          );
        })}
      </div>

      <AbsoluteFill
        style={{
          justifyContent: "flex-end",
        }}
      >
        <div
          style={{
            alignItems: "flex-end",
            background: getBottomOverlayGradient(overlayOpacity),
            display: "flex",
            height: OVERLAY_GRADIENT_HEIGHT_PX,
            justifyContent: "center",
            padding: `0 ${OVERLAY_GRADIENT_HORIZONTAL_PADDING_PX}px ${OVERLAY_GRADIENT_BOTTOM_PADDING_PX}px`,
            width: "100%",
          }}
        >
          <div
            style={{
              color: "white",
              fontFamily,
              fontSize: OVERLAY_TITLE_FONT_SIZE_PX,
              lineHeight: 1.4,
              opacity: overlayTitleOpacity,
              textAlign: "center",
            }}
          >
            Send to coding agent
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
