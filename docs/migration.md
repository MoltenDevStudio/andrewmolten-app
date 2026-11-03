# Transfer to the verified andrewmolten-app repository

## Repository identity

This change targets **`MoltenDevStudio/andrewmolten-app`**, GitHub repository ID **`831894710`**, with default branch **`main`**. The older URL `andrew-molten/andrewmolten-app` resolves to this repository on GitHub. The checkout's fetch and push remote is `https://github.com/MoltenDevStudio/andrewmolten-app.git`.

This is distinct from `andrew-molten/andrew-molten-app` (ID `727025709`, default branch `master`), where an earlier transfer PR was opened. That repository and PR are not modified by this change. The running workspace initially contained those earlier checkouts; this change uses a fresh checkout of the canonical repository above and does not claim to modify the environment selector in the Codex UI.

The destination base is `0602c42c76d76c9739996365734a05ce82381c8c` (“remove backend”), which contains the frontend-only Vite app. Its 11 existing commits remain ancestors of the migration commit. No `.git` directory, Git remote, or commit history from the source was imported.

## Source implementation and fidelity

The actual files were exported from [andrew-molten/andrew-molten PR #1](https://github.com/andrew-molten/andrew-molten/pull/1), branch `codex/rebuild-andrew-molten-nextjs`, pinned commit `fc53c44630a7ecdc435dcf94813859cbbd94c57c`.

All 23 source application, test, and configuration files across `src/`, `tests/`, `next.config.ts`, `postcss.config.mjs`, `tsconfig.json`, and `.env.example` match that commit byte-for-byte. This retains the finished homepage, design, fonts, styling, responsive layouts, components, SEO and social metadata, generated social image, sitemap, robots configuration, enquiry form/API, and `/previews/[slug]` noindex architecture. Source files were transferred rather than regenerated.

The only added application route is `/projects`, which permanently redirects the previous Vite portfolio URL to `/#work`. An integration test covers that compatibility behavior. The source homepage and its visual design remain unchanged.

Repository-specific work adapts package identity, existing deployment files, ignore rules, documentation, and Next.js lint tooling. The destination's package name `andrewmolten-app`, version `2.0.0`, MIT license declaration, and package keywords are retained. Direct runtime dependency versions remain locked to the completed source implementation.

## Inspected and preserved

- `images/languageBuddyStory.png` is kept at its original path with identical bytes. It is an actual Language Buddy screenshot, not a portrait or verified Journalingo screenshot. It stays outside the served homepage until its relationship to Journalingo is confirmed.
- The original Language Buddy project introduction, description, and conclusion are retained in `docs/legacy-content.md`.
- Existing `.vscode/settings.json` editor preferences are unchanged.
- The Git history and canonical origin remain those of the destination repository.
- `Dockerfile` and `Procfile` are retained and adapted as described below.

The previous Home and Blog pages were headings-only placeholders. Projects rendered two copies of the same Language Buddy card. There were no verified project live URLs, portrait, additional contact details, `.env` files, custom CI workflows, or tracked tests. The old unused server referenced only `NODE_ENV` and `PORT`; Auth0 domain/audience were empty placeholders. No production database or secrets were accessed.

## Removed legacy application

- Vite entry HTML, Vite configuration, React Router routes, the old client components/pages/styles, and project-specific legacy interfaces.
- React Query/devtools and the commented-out fruit API/hooks, which were unused by the public website.
- The disconnected Express/Knex/SQLite/Auth0 fruit-demo backend, migration/seed files, and obsolete model references.
- Old Tailwind 3 and Sass/PostCSS configuration, remote font import, Vite/Vitest/React Query tooling, and the legacy ESLint/Prettier presets. The completed implementation uses Tailwind 4, local font packages, Next.js, and TypeScript; ESLint now uses the Next.js Core Web Vitals and TypeScript flat presets.
- The catch-all Vercel rewrite to `/index.html`, which would otherwise intercept Next.js pages, API routes, and preview URLs.

There were no tracked existing tests to port. The completed source's nine tests are retained unchanged, with one additional test for `/projects` redirection.

## Deployment configuration and manual review

`vercel.json` no longer contains the SPA catch-all rewrite. Its only rule disables Git-triggered deployments for **`codex/transfer-nextjs-andrewmolten-app`**, so opening the PR does not request an automatic Vercel preview. Other branches, including `main`, retain Vercel's default behavior. This branch-specific rule does not overwrite project dashboard settings, environment values, domains, or credentials. See [Vercel's documented branch deployment configuration](https://vercel.com/docs/project-configuration/git-configuration).

Before an approved deployment, manually confirm:

1. The Vercel Git link is **`MoltenDevStudio/andrewmolten-app`**, with production branch **`main`**.
2. The framework preset is **Next.js**, with Node **22.18+** (24 LTS recommended), install command `npm ci`, and build command `npm run build`.
3. Remove any Vite/`dist` output override, Vite dev command, or old dashboard SPA rewrite. Use Next.js's default output and routing. Do not use static-only export because the enquiry API needs a server runtime.
4. Preserve current domain assignments and secrets. A prior read of the visible Vercel project `andrewmolten-app` returned HTTP 403 for team `andrew-moltens-projects`; its current Git linkage, overrides, and environment metadata remain unverified. No project settings or credential values were changed or retrieved.
5. Optional `CONTACT_FORM_ENDPOINT` and `CONTACT_FORM_TOKEN` are server-only and documented in the README. Leave them unset until a trusted delivery receiver exists. To enable the form, configure the receiver before building because the homepage is statically rendered. Real delivery remains untested.

The existing Docker deployment intent is retained: `Dockerfile` now uses Node 24, builds Next.js, and supplies an explicit web startup command. `.dockerignore` prevents local dependencies, build output, Git metadata, and environment files from entering the build context. Dependencies are retained for the straightforward container runtime; this is not a standalone-output optimization. `Procfile` keeps `web: npm start` and removes the stale Knex release migration, since the old backend is not part of the new website. No Docker build, release migration, or deployment was executed.

Merging into a linked production branch may trigger its existing deployment integration. Merge only when ready to release. No merge or deployment is performed by this transfer. The profile repository and original source PR remain untouched.
