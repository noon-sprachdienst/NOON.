// Claude Code Stop hook: before the agent reports "done", run the fast checks (a few
// seconds, no build) if site files changed and are not committed yet: ESLint errors on the
// changed files and the landing-page audit. Exit 2 sends the agent back to work with the
// failures. The full build and all SEO audits run in the git pre-commit hook.
import { execFileSync, spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { SITE_PATHS, matches } from './guard-paths.mjs';

let raw = '';
for await (const chunk of process.stdin) raw += chunk;
let input = {};
try { input = JSON.parse(raw); } catch { /* run the check anyway */ }

const root = process.env.CLAUDE_PROJECT_DIR || process.cwd();

let changed = [];
try {
  changed = execFileSync('git', ['status', '--porcelain', '-uall'], { cwd: root, encoding: 'utf8' })
    .split('\n').map((line) => line.slice(3).trim().replace(/^"|"$/g, '')).filter(Boolean);
} catch {
  process.exit(0); // Not a git checkout: nothing to compare against.
}
if (!changed.some((path) => matches(SITE_PATHS, path))) process.exit(0);

const failures = [];

// 1. ESLint (errors only) on the changed JavaScript files that still exist.
const changedCode = changed.filter((path) => /\.(js|jsx|mjs)$/.test(path) && existsSync(join(root, path)));
if (changedCode.length) {
  const eslint = join(root, 'node_modules', 'eslint', 'bin', 'eslint.js');
  const lint = spawnSync(process.execPath, [eslint, '--quiet', ...changedCode], { cwd: root, encoding: 'utf8', timeout: 60000 });
  if (lint.status !== 0) failures.push(`ESLint errors:\n${(lint.stdout || lint.stderr || '').trim()}`);
}

// 2. Landing-page audit. It prints failures on stderr and per-page stats on stdout.
const audit = spawnSync(process.execPath, ['scripts/audit-landing-pages.mjs'], { cwd: root, encoding: 'utf8', timeout: 60000 });
if (audit.status !== 0) {
  failures.push((audit.stderr?.trim() || audit.stdout?.trim() || `audit exited with ${audit.status}`).split('\n').slice(-30).join('\n'));
}

if (!failures.length) process.exit(0);
const output = failures.join('\n\n');

// Second failure in a row: let the turn end, but tell the user instead of looping.
if (input.stop_hook_active) {
  process.stdout.write(JSON.stringify({ systemMessage: `Checks still fail after a retry:\n${output}` }));
  process.exit(0);
}

process.stderr.write(`Checks fail on uncommitted changes. Fix the cause (not the check), then finish:\n${output}\n`);
process.exit(2);
