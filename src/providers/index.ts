import { KiloProvider } from "./kilo.js";
import type { LLMProvider } from "../types.js";

export interface ProviderConfig {
  apiKey?: string;
  model?: string;
}

export function createDefaultProvider(config: ProviderConfig = {}): LLMProvider {
  return new KiloProvider({
    apiKey: config.apiKey ?? process.env.KILO_API_KEY,
    model: config.model,
  });
}

export { KiloProvider };
