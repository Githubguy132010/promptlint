import type { AnalysisResult } from "../types.js";
import { extractJsonObject } from "../utils/json.js";

function asStringArray(value: unknown, key: string): string[] {
  if (!Array.isArray(value) || value.some((item) => typeof item !== "string")) {
    throw new Error(`Invalid or missing \"${key}\". Expected string[].`);
  }
  return value;
}

export function parseAnalysisResponse(rawText: string): AnalysisResult {
  const jsonText = extractJsonObject(rawText);
  const parsed = JSON.parse(jsonText) as Partial<AnalysisResult>;

  const clarityScore = parsed.clarity_score;
  if (typeof clarityScore !== "number" || Number.isNaN(clarityScore)) {
    throw new Error('Invalid or missing "clarity_score". Expected number.');
  }

  if (typeof parsed.improved_prompt !== "string") {
    throw new Error('Invalid or missing "improved_prompt". Expected string.');
  }

  return {
    ambiguities: asStringArray(parsed.ambiguities, "ambiguities"),
    missing_constraints: asStringArray(parsed.missing_constraints, "missing_constraints"),
    security_risks: asStringArray(parsed.security_risks, "security_risks"),
    nondeterminism_risks: asStringArray(parsed.nondeterminism_risks, "nondeterminism_risks"),
    clarity_score: Math.max(0, Math.min(100, Math.round(clarityScore))),
    improved_prompt: parsed.improved_prompt,
  };
}
