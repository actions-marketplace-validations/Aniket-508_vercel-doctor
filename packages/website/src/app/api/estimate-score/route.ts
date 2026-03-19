import { API_CORS_HEADERS } from "@/constants/api";
import { countUniqueRules, scoreFromRuleCounts } from "@/utils/calculate-score";
import getScoreLabel from "@/utils/get-score-label";
import { isValidDiagnostic } from "@/utils/validate-diagnostic";

const ERROR_ESTIMATED_FIX_RATE = 0.85;
const WARNING_ESTIMATED_FIX_RATE = 0.8;

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

  const { errorRuleCount, warningRuleCount } = countUniqueRules(
    body.diagnostics,
  );

  const currentScore = scoreFromRuleCounts(errorRuleCount, warningRuleCount);

  const estimatedUnfixedErrorRuleCount = Math.round(
    errorRuleCount * (1 - ERROR_ESTIMATED_FIX_RATE),
  );
  const estimatedUnfixedWarningRuleCount = Math.round(
    warningRuleCount * (1 - WARNING_ESTIMATED_FIX_RATE),
  );
  const estimatedScore = scoreFromRuleCounts(
    estimatedUnfixedErrorRuleCount,
    estimatedUnfixedWarningRuleCount,
  );

  return Response.json(
    {
      currentLabel: getScoreLabel(currentScore),
      currentScore,
      estimatedLabel: getScoreLabel(estimatedScore),
      estimatedScore,
    },
    { headers: API_CORS_HEADERS },
  );
};
