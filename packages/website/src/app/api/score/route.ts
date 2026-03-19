import { API_CORS_HEADERS } from "@/constants/api";
import { calculateScore } from "@/utils/calculate-score";
import getScoreLabel from "@/utils/get-score-label";
import { isValidDiagnostic } from "@/utils/validate-diagnostic";

export const OPTIONS = (): Response =>
  new Response(null, { headers: API_CORS_HEADERS, status: 204 });

export const POST = async (request: Request): Promise<Response> => {
  const body = await request.json().catch(() => null);

  if (!body || !Array.isArray(body.diagnostics)) {
    return Response.json(
      { error: "Request body must contain a 'diagnostics' array" },
      { headers: API_CORS_HEADERS, status: 400 },
    );
  }

  const isValidPayload = body.diagnostics.every((entry: unknown) =>
    isValidDiagnostic(entry),
  );

  if (!isValidPayload) {
    return Response.json(
      {
        error:
          "Each diagnostic must have 'filePath', 'plugin', 'rule', 'severity', 'message', 'help', 'line', 'column', and 'category'",
      },
      { headers: API_CORS_HEADERS, status: 400 },
    );
  }

  const score = calculateScore(body.diagnostics);

  return Response.json(
    { label: getScoreLabel(score), score },
    { headers: API_CORS_HEADERS },
  );
};
