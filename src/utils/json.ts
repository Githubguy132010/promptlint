export function extractJsonObject(text: string): string {
  const firstBrace = text.indexOf("{");
  const lastBrace = text.lastIndexOf("}");

  if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
    throw new Error("Provider response did not contain a JSON object.");
  }

  return text.slice(firstBrace, lastBrace + 1);
}
