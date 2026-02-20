# promptlint

`promptlint` is a production-ready CLI that audits AI coding prompts for ambiguity, missing constraints, security risks, and non-determinism.

## Features

- Analyze prompts from file or stdin.
- Structured LLM auditing with provider abstraction.
- Kilo provider implementation (`KILO_API_KEY`).
- Human-friendly colorized output.
- `--json` for raw machine output.
- `--strict` for higher lint severity.
- `--fix` to print only the improved prompt.
- Exit codes for CI usage.

## Install

### Global

```bash
bun install
bun run build
bun link
```

### Local dev (bun)

```bash
bun install
bun run build
```

## Usage

```bash
promptlint prompt.txt
cat prompt.txt | promptlint
promptlint prompt.txt --json
promptlint prompt.txt --strict
promptlint prompt.txt --fix
```

## Exit codes

- `0`: good prompt
- `1`: warnings
- `2`: critical issues or runtime failure

## Environment

Set your Kilo API key:

```bash
export KILO_API_KEY=your_key_here
```

Optional:

- `--model` to override default model (`anthropic/claude-opus-4.6`).

## LLM Provider abstraction

`src/types.ts` defines:

```ts
interface LLMProvider {
  analyze(prompt: string): Promise<AnalysisResult>
}
```

Current provider:

- `KiloProvider` in `src/providers/kilo.ts`

## JSON schema returned internally

```json
{
  "ambiguities": [],
  "missing_constraints": [],
  "security_risks": [],
  "nondeterminism_risks": [],
  "clarity_score": 0,
  "improved_prompt": ""
}
```

## Development

```bash
bun test
bun run check
bun run build
```

## Optional pre-commit hook

Install:

```bash
npm run setup-hooks
```

This installs `.git/hooks/pre-commit` that runs `promptlint prompt.txt --strict` if `prompt.txt` exists.

## Project structure

```txt
src/
  cli/
    index.ts
    input.ts
    format.ts
  core/
    auditPrompt.ts
    parseAnalysis.ts
    evaluate.ts
  providers/
    index.ts
    kilo.ts
  utils/
    json.ts
  index.ts
tests/
  parseAnalysis.test.ts
  format.test.ts
scripts/
  install-precommit-hook.mjs
```

## License

MIT
