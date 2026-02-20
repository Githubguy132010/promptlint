import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";
import { buildAuditPrompt } from "../core/auditPrompt.js";
import { parseAnalysisResponse } from "../core/parseAnalysis.js";
import type { AnalyzeOptions, AnalysisResult, LLMProvider } from "../types.js";

const DEFAULT_MODEL = "anthropic/claude-opus-4.6";
const DEFAULT_BASE_URL = "https://api.kilo.ai/api/gateway";

export interface KiloProviderOptions {
  apiKey?: string;
  model?: string;
  baseURL?: string;
}

export class KiloProvider implements LLMProvider {
  private readonly model: string;
  private readonly client;

  constructor(options: KiloProviderOptions = {}) {
    if (!options.apiKey) {
      throw new Error("Missing API key. Set KILO_API_KEY.");
    }

    this.model = options.model ?? DEFAULT_MODEL;
    this.client = createOpenAI({
      baseURL: options.baseURL ?? DEFAULT_BASE_URL,
      apiKey: options.apiKey,
    });
  }

  async analyze(prompt: string, options: AnalyzeOptions = {}): Promise<AnalysisResult> {
    const { text } = await generateText({
      model: this.client(options.model ?? this.model),
      prompt: buildAuditPrompt(prompt, options.strict),
      temperature: options.strict ? 0 : 0.1,
    });

    return parseAnalysisResponse(text);
  }
}
