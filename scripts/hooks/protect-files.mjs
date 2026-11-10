// Claude Code PreToolUse hook (Edit|Write): blocks edits to generated files and asks the user
// before an agent changes a check or guard (rule: never weaken a test to make it pass).
// Input: hook JSON on stdin. Output: a permission decision as JSON, or nothing to allow.
import { relative, resolve } from 'node:path';
import { GENERATED, GUARDS, matches } from './guard-paths.mjs';

let raw = '';
for await (const chunk of process.stdin) raw += chunk;

let input;
try {
  input = JSON.parse(raw);
} catch {
  process.exit(0); // Not our input format: let the normal permission flow decide.
}

const filePath = input?.tool_input?.file_path;
if (!filePath) process.exit(0);

const root = process.env.CLAUDE_PROJECT_DIR || input.cwd || process.cwd();
const path = relative(resolve(root), resolve(filePath)).split('\\').join('/');
if (path.startsWith('..')) process.exit(0); // Outside this repository.

const decide = (permissionDecision, permissionDecisionReason) => {
  process.stdout.write(JSON.stringify({ hookSpecificOutput: { hookEventName: 'PreToolUse', permissionDecision, permissionDecisionReason } }));
  process.exit(0);
};

if (matches(GENERATED, path)) {
  decide('deny', `${path} is generated. Change its generator (scripts/build-seo-index.mjs or the build) and regenerate instead.`);
}
if (matches(GUARDS, path)) {
  decide('ask', `${path} is a check or guard. Changing it can hide a failure: explain to Assem why it must change before approving.`);
}
process.exit(0);
