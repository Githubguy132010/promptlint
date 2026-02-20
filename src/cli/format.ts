import chalk from "chalk";
import type { AnalysisResult, LintEvaluation } from "../types.js";

function formatSection(title: string, items: string[]): string {
  if (items.length === 0) {
    return `${chalk.green(title)}\n  ${chalk.dim("None")}`;
  }

  const lines = items.map((item) => `  - ${item}`).join("\n");
  return `${chalk.yellow(title)}\n${lines}`;
}

export function formatHumanReadable(
  result: AnalysisResult,
  evaluation: LintEvaluation,
  strict = false,
): string {
  const statusColor =
    evaluation.status === "critical"
      ? chalk.red
      : evaluation.status === "warning"
        ? chalk.yellow
        : chalk.green;

  const header = `${statusColor.bold("Promptlint")}: ${statusColor(evaluation.status.toUpperCase())}`;
  const scoreLine = `Clarity Score: ${result.clarity_score}/100${strict ? " (strict mode)" : ""}`;

  return [
    header,
    scoreLine,
    "",
    formatSection("Ambiguities", result.ambiguities),
    "",
    formatSection("Missing Constraints", result.missing_constraints),
    "",
    formatSection("Security Risks", result.security_risks),
    "",
    formatSection("Non-determinism Risks", result.nondeterminism_risks),
    "",
    chalk.cyan("Suggested Improved Prompt"),
    result.improved_prompt,
  ].join("\n");
}
