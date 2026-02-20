import { readFile } from "node:fs/promises";

async function readStdin(): Promise<string> {
  if (process.stdin.isTTY) {
    return "";
  }

  const chunks: Buffer[] = [];

  for await (const chunk of process.stdin) {
    chunks.push(Buffer.from(chunk));
  }

  return Buffer.concat(chunks).toString("utf8");
}

export async function readPromptInput(filePath?: string): Promise<string> {
  if (filePath) {
    return readFile(filePath, "utf8");
  }

  const stdin = await readStdin();
  if (!stdin.trim()) {
    throw new Error("No prompt input provided. Pass a file path or pipe stdin.");
  }

  return stdin;
}
