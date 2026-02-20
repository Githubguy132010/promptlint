#!/usr/bin/env node
import { Command } from "commander";
import chalk from "chalk";
import { readPromptInput } from "./input.js";
import { formatHumanReadable } from "./format.js";
import { createDefaultProvider } from "../providers/index.js";
import { evaluateResult } from "../core/evaluate.js";

const program = new Command();

program
  .name("promptlint")
  .description("Analyze AI coding prompts for ambiguity, safety, and completeness")
  .argument("[file]", "Prompt file path. If omitted, reads from stdin.")
  .option("--json", "Output raw JSON")
  .option("--strict", "Increase lint severity")
  .option("--fix", "Print only improved prompt")
  .option("--model <model>", "Override Kilo model")
  .option("--no-color", "Disable colorized output")
  .action(async (file: string | undefined, options: Record<string, unknown>) => {
    try {
      if (options.color === false) {
        chalk.level = 0;
      }

      const prompt = await readPromptInput(file);
      const provider = createDefaultProvider({ model: options.model as string | undefined });
      const result = await provider.analyze(prompt, {
        strict: Boolean(options.strict),
        model: options.model as string | undefined,
      });

      const evaluation = evaluateResult(result, Boolean(options.strict));

      if (options.fix) {
        process.stdout.write(`${result.improved_prompt}\n`);
      } else if (options.json) {
        process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
      } else {
        process.stdout.write(`${formatHumanReadable(result, evaluation, Boolean(options.strict))}\n`);
      }

      process.exitCode = evaluation.exitCode;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      process.stderr.write(`promptlint error: ${message}\n`);
      process.exitCode = 2;
    }
  });

await program.parseAsync(process.argv);
