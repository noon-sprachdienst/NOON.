// Git pre-commit hook (enabled with: git config core.hooksPath scripts/git-hooks).
// 1. Blocks commits that change a check or guard unless NOON_ALLOW_GUARD_CHANGE=1 is set,
//    so such a change is always a deliberate, visible decision.
// 2. When site files are staged: lint (errors only), duplicate-code ceiling, then the full
//    SEO check (build + all audits).
import { execFileSync, spawnSync } from 'node:child_process';
import { GUARDS, SITE_PATHS, matches } from '../hooks/guard-paths.mjs';

const staged = execFileSync('git', ['diff', '--cached', '--name-only', '--diff-filter=ACMRD'], { encoding: 'utf8' })
  .split('\n').map((line) => line.trim()).filter(Boolean);

const guards = staged.filter((path) => matches(GUARDS, path));
if (guards.length && process.env.NOON_ALLOW_GUARD_CHANGE !== '1') {
  console.error(`\nCommit blocked: it changes checks or guards:\n  ${guards.join('\n  ')}\n`);
  console.error('If Assem approved this change, commit again with NOON_ALLOW_GUARD_CHANGE=1.\n');
  process.exit(1);
}

if (!staged.some((path) => matches(SITE_PATHS, path))) process.exit(0);

const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
for (const script of ['lint', 'check:dupes', 'test:seo']) {
  console.log(`pre-commit: npm run ${script}${script === 'test:seo' ? ' (build + SEO audits, about 1-2 minutes)' : ''}...`);
  const result = spawnSync(npm, ['run', script], { stdio: 'inherit', shell: process.platform === 'win32' });
  if (result.status !== 0) {
    console.error(`\nCommit blocked: npm run ${script} failed. Fix the cause, not the check.\n`);
    process.exit(1);
  }
}
