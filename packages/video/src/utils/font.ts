import { loadFont } from "@remotion/google-fonts/IBMPlexMono";

export const { fontFamily } = loadFont("normal", {
  subsets: ["latin"],
  weights: ["400", "500", "700"],
});
