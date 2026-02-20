export function buildAuditPrompt(prompt: string, strict = false): string {
  const strictClause = strict
    ? "Strict mode: aggressively flag uncertainty, missing limits, and weak safety assumptions."
    : "";

  return `You are a strict AI prompt auditor for software engineering prompts.

Analyze the following prompt and return structured JSON with:

{
"ambiguities": [],
"missing_constraints": [],
"security_risks": [],
"nondeterminism_risks": [],
"clarity_score": 0-100,
"improved_prompt": "rewritten version"
}

Evaluation criteria:

Ambiguity: unclear scope, vague requirements, undefined inputs/outputs.

Missing constraints: no performance limits, no error handling expectations, no edge cases, no formatting constraints.

Security risks: injection vectors, unsafe code generation patterns, secrets exposure, production misuse.

Non-determinism: open-ended instructions without boundaries.

Clarity score: strict scoring. 90+ only for production-grade prompts.

Output only valid JSON.

${strictClause}

Prompt to audit:
<<<PROMPT>>>
${prompt}
<<<END_PROMPT>>>`;
}
