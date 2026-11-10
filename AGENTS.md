# AGENTS.md

Guidance for AI coding agents (Claude Code and others) working on the Noon website
(noon-sprachdienst.de). Vite + React SPA with prerendered static HTML for SEO, deployed on
Vercel. The checked-in scripts and configuration are authoritative; this file only says
what they cannot.

## Start here

- Use npm (`package-lock.json`). Run commands from the repository root.
- Production is `main` on the remote `noon-client`; Vercel deploys from it. Work on a
  feature branch. Never push or merge to `main` until Assem says "publish".
- Never edit deployed servers. Diagnose there read-only; fix locally.
- Do not edit generated files: `src/data/seoIndex.generated.js` (made by
  `scripts/build-seo-index.mjs`, runs in `dev` and `build`; commit the regenerated file)
  and `dist/`. Ignore `_unused-assets/`.

## Commands

- `npm run dev`: dev server.
- `npm run build`: SEO index, Vite build and prerender into `dist/`.
- `npm run test:seo`: build plus the three SEO audits. This is the main check.
- `npm run smoke:services`: smoke test for the service pages.
- `npm run lint`: ESLint (bugs, not style). Errors block commits; warnings don't.
- `npm run check:dupes`: duplicate-code check. Fails if duplication rises above 2 %.
- `npm run check`: lint plus duplicate check.
- Preview servers (`.claude/launch.json`): `noon-preview` (port 4173, serves `dist/`, so
  build first) and `noon-dev` (port 5173).

`test:seo` takes one to two minutes. Run it once, save the output to a file and read
from that. Always check its exit code: never pipe it through `tail`/`grep` in a way that
hides a failure.

## Repository map

| Task | Location | Notes |
| --- | --- | --- |
| City landing pages | `src/data/landing/<city>.js` | Register in `landing/index.js` (`LANDING_PAGES`, `CITY_HUBS`). |
| Shared page helpers | `src/data/landing/shared.js` | `CITY`, `digitalSection`, `withMore`, `translationPriceSection`, `interpretingPriceSection`, `officeSection`, `ORDER_STEPS`, link constants. |
| Language pages | `src/data/languagePages.js` | Extra sections in `landing/extras2.js` (`LANGUAGE_EXTRA`); add new paths to `NEW_LANGUAGE_PATHS`. |
| Document pages / guides | `landing/documents.js`, `landing/ratgeber.js` | Guides need an entry in `RATGEBER_LINKS`. |
| More content for existing pages | `landing/phase1.js` (`PHASE1`) | Applied in `seoPages.js` (`withPhase1`). |
| Page pipeline, meta | `src/data/seoPages.js`, `src/data/pageTitles.js` | |
| Light route index | `src/data/seoRoutes.js` | App, Nav and Footer must import this, never `seoPages.js` (keeps the main JS small). |
| Homepage sections | `src/components/*`, order in `src/App.jsx` | Homepage link block: `src/data/homeLinks.js`. |
| Static HTML / prerender | `scripts/prerender-seo.mjs`, `scripts/staticMain.mjs` | |
| Redirects, headers | `vercel.json` | |
| UI texts (de, en, ar, tr, ru, fr, uk) | `src/data/translations.js`, `src/hooks/useI18n.jsx` | Arabic is RTL. |
| Serverless API (forms, admin, analytics) | `api/` | Mind Vercel function limits. |
| Styles | `src/styles/global.css` | |
| Contact data | `src/config/contact.js` | |

## Reuse before you write

- Before adding a function, component, constant or CSS class, search for one that already
  does the job and use or extend it. Do not add a near-duplicate under a new name.
- When the same logic is needed in a second place, move it to a shared module (as
  `digitalSection` and `withMore` live in `landing/shared.js`).
- Make the smallest change that solves the task. Add a new dependency or abstraction only
  when needed, and say why.
- Comments explain why, not what the code says.

## SEO content rules

- Use confirmed facts only: certified translation from 39 € per document, interpreting
  from 85 € per hour, specialist translation from 0.12 € per word, delivery in 2–3 working
  days, express the same day in about 4–5 hours, fixed price up front. Describe laws and
  authorities in general terms and say that the responsible authority decides.
- Never claim an office that does not exist. Offices: Osnabrück, Stuttgart, Berlin,
  Bielefeld, Mainz, Kiel.
- Bavaria: translators are "öffentlich bestellt und beeidigt".
- No pages or keywords for interest-based loans, gambling or alcohol.
- New German landing pages must pass the audit: at least 400 words, no near-duplicates,
  meta title of 65 characters or fewer, description of 80–160 characters, valid internal
  links, at least one inbound link.
- Never change an audit's thresholds or logic to make a page pass; fix the content. If an
  audit itself looks wrong, explain why before changing it.

## Design rules

- Keep the existing design and reuse existing classes (`.section-head`, `.seo-link-list`, …).
- No colored side borders or accent stripes on cards.
- Check changed pages in the preview on desktop and at phone width (375 px): no
  horizontal scroll, and Arabic must render right to left.

## Testing and "done"

- Done means: `npm run test:seo` exits with 0, the changed pages were checked in the
  preview, and `npm run smoke:services` passes after API changes.
- Report evidence: the command you ran and its result lines. "Tests pass" without output
  does not count.
- Never edit, delete or skip a test or audit to make it pass.
- For a bug: reproduce it first with a failing check, then fix it.
- A test written by the same agent can share its blind spots. For logic changes, also
  check what must not happen.
- Do not swallow errors: no empty `catch`, no silent fallback that hides a failure.

## Checks that run automatically

- Claude Code hooks (`.claude/settings.json`, scripts in `scripts/hooks/`). They load when
  a Claude Code session starts in this folder.
  - Before an edit: generated files are blocked. Changes to checks and guards (audit
    scripts, hooks, `.claude/settings.json`) need the user's approval.
  - Before Claude finishes: if site files changed, ESLint errors on the changed files and
    the landing-page audit must pass, or Claude is sent back to fix them.
- Git pre-commit hook (`scripts/git-hooks/`). Enable it once per clone with
  `git config core.hooksPath scripts/git-hooks`. On commits that touch site files it runs
  `lint`, `check:dupes` and `test:seo`. Commits that change checks or guards are blocked
  unless `NOON_ALLOW_GUARD_CHANGE=1` is set after the user approved the change.

## Git

- Small, focused commits whose message explains why.
- No `Co-Authored-By` or other AI attribution in commits or pull requests.
- Never commit or print secrets (Firebase service account, SMTP, API keys); use
  environment variables and placeholder examples.

## Keep this file current

When a change makes this file inaccurate, update it in the same commit. Keep it short and
project-wide.
