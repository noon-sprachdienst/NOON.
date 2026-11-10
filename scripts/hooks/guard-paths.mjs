// Paths that AI agents must not change on their own (shared by the Claude Code hook and
// the git pre-commit hook). Paths are relative to the repository root, with "/" separators.

// Generated or build output: change the generator instead.
export const GENERATED = [
  /^src\/data\/seoIndex\.generated\.js$/,
  /^dist\//,
];

// Checks and guards: changing them can hide a failure, so a person has to approve.
export const GUARDS = [
  /^scripts\/audit-[^/]+\.mjs$/,
  /^scripts\/review-built-site\.mjs$/,
  /^scripts\/smoke-services\.mjs$/,
  /^scripts\/hooks\//,
  /^scripts\/git-hooks\//,
  /^\.claude\/settings\.json$/,
];

export const matches = (patterns, path) => patterns.some((pattern) => pattern.test(path));

// Paths whose change can affect the built site and therefore needs the SEO checks.
export const SITE_PATHS = [/^src\//, /^scripts\//, /^api\//, /^public\//, /^vercel\.json$/, /^package(-lock)?\.json$/, /^index\.html$/, /^vite\.config\.js$/];
