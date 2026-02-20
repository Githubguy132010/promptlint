import type { AnalysisResult, LintEvaluation } from "../types.js";

export function evaluateResult(result: AnalysisResult, strict = false): LintEvaluation {
  const issueCount =
    result.ambiguities.length +
    result.missing_constraints.length +
    result.security_risks.length +
    result.nondeterminism_risks.length;

  const hasCriticalSecurityRisk = result.security_risks.length > 0;
  const criticalScoreThreshold = strict ? 55 : 45;
  const warningScoreThreshold = strict ? 90 : 80;

  if (hasCriticalSecurityRisk || result.clarity_score < criticalScoreThreshold) {
    return { status: "critical", exitCode: 2 };
  }

  if (issueCount > 0 || result.clarity_score < warningScoreThreshold) {
    return { status: "warning", exitCode: 1 };
  }

  return { status: "good", exitCode: 0 };
}
