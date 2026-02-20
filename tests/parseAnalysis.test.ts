import { describe, expect, test } from "bun:test";
import { parseAnalysisResponse } from "../src/core/parseAnalysis";

describe("parseAnalysisResponse", () => {
  test("parses valid JSON payload", () => {
    const result = parseAnalysisResponse(`
{
  "ambiguities": ["Ambiguous scope"],
  "missing_constraints": ["No runtime constraint"],
  "security_risks": [],
  "nondeterminism_risks": ["No output format"],
  "clarity_score": 77,
  "improved_prompt": "Write deterministic code"
}`);

    expect(result.clarity_score).toBe(77);
    expect(result.ambiguities).toEqual(["Ambiguous scope"]);
    expect(result.security_risks).toEqual([]);
  });

  test("extracts JSON from wrapped text", () => {
    const result = parseAnalysisResponse(`Here is the result:\n{\n"ambiguities":[],"missing_constraints":[],"security_risks":[],"nondeterminism_risks":[],"clarity_score":100,"improved_prompt":"ok"\n}`);

    expect(result.clarity_score).toBe(100);
    expect(result.improved_prompt).toBe("ok");
  });

  test("throws for invalid shape", () => {
    expect(() => parseAnalysisResponse('{"ambiguities": []}')).toThrow();
  });
});
