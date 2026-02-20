export interface AnalysisResult {
  ambiguities: string[];
  missing_constraints: string[];
  security_risks: string[];
  nondeterminism_risks: string[];
  clarity_score: number;
  improved_prompt: string;
}

export interface AnalyzeOptions {
  strict?: boolean;
  model?: string;
}

export interface LLMProvider {
  analyze(prompt: string, options?: AnalyzeOptions): Promise<AnalysisResult>;
}

export type LintStatus = "good" | "warning" | "critical";

export interface LintEvaluation {
  status: LintStatus;
  exitCode: 0 | 1 | 2;
}
