import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const hookDir = path.join(process.cwd(), ".git", "hooks");
const hookPath = path.join(hookDir, "pre-commit");

const script = `#!/usr/bin/env sh
set -e

if [ -f prompt.txt ]; then
  npx promptlint prompt.txt --strict
else
  echo "promptlint: skipping pre-commit check (prompt.txt not found)"
fi
`;

await mkdir(hookDir, { recursive: true });
await writeFile(hookPath, script, { mode: 0o755 });

console.log("Installed .git/hooks/pre-commit");
