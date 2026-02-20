import { describe, expect, test } from "bun:test";
import { formatHumanReadable } from "../src/cli/format";
import type { AnalysisResult } from "../src/types";

const sample: AnalysisResult = {
  ambiguities: ["Unclear API output schema"],
  missing_constraints: ["No timeout requirement"],
  security_risks: [],
  nondeterminism_risks: ["No deterministic formatting"],
  clarity_score: 72,
  improved_prompt: "Produce JSON with explicit schema.",
};

describe("formatHumanReadable", () => {
  test("renders key sections", () => {
    const output = formatHumanReadable(sample, { status: "warning", exitCode: 1 }, false);

    expect(output).toContain("Promptlint");
    expect(output).toContain("Clarity Score: 72/100");
    expect(output).toContain("Ambiguities");
    expect(output).toContain("Suggested Improved Prompt");
  });
});
