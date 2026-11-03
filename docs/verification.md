# Verification in the correct repository

Verified on 3 November 2026 (New Zealand time).

## Repository and change scope

- Destination: **`MoltenDevStudio/andrewmolten-app`**, repository ID **`831894710`**.
- Both checkout remotes point to `https://github.com/MoltenDevStudio/andrewmolten-app.git`.
- GitHub resolves `andrew-molten/andrewmolten-app` to the same canonical repository. A Git query of that older URL returned `main` at `0602c42c76d76c9739996365734a05ce82381c8c`, matching the destination base.
- Source: completed profile-repository implementation at `fc53c44630a7ecdc435dcf94813859cbbd94c57c`.
- All 23 original application/test/configuration files match that source byte-for-byte. Direct runtime dependency versions match the source lockfile. The added `/projects` route only redirects the old Vite URL to the unchanged selected work section.
- The destination's Language Buddy screenshot remains at its original path with identical bytes; its project text is preserved separately. Existing editor settings and package identity/version/license are retained.
- No source Git history was imported. The destination's 11 existing commits are retained as ancestors.

## Checks performed

| Check                     | Result                                                                                                                                                                          |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Production build          | `npm run build` passed with Next.js 16.4.4. The homepage, sitemap, robots, icon, social image, and compatibility redirect are statically rendered.                              |
| TypeScript                | `npm run typecheck` passed.                                                                                                                                                     |
| Lint                      | `npm run lint` passed without lint warnings or errors.                                                                                                                          |
| Tests                     | `TEST_BASE_URL=http://localhost:3000 npm test` passed all 10 tests with no failures or skips.                                                                                   |
| Homepage metadata         | Browser assertions verified title, canonical domain, description, public indexability, Open Graph image/locale, and Twitter card.                                               |
| Sitemap and robots        | Only the public homepage is listed; preview URLs remain excluded and crawlable so their noindex directives can be read.                                                         |
| Preview behavior          | Unknown `/previews/not-a-client` returns 404 with noindex metadata and `X-Robots-Tag: noindex, nofollow, noarchive`.                                                            |
| Enquiry behavior          | The unconfigured form is disabled with direct email fallback and no simulated success. Same-origin API requests return 503 when unconfigured; cross-origin requests return 403. |
| Previous portfolio route  | `/projects` returns 308 and points to `/#work`.                                                                                                                                 |
| Social image              | The endpoint returns a genuine PNG.                                                                                                                                             |
| Responsive browser layout | No horizontal overflow at 320, 375, 768, 1024, and 1440px; navigation anchors and contact CTA work.                                                                             |
| Source design comparison  | Desktop and mobile full-page screenshots are pixel-identical to the source captures.                                                                                            |
| Browser errors            | No JavaScript errors observed.                                                                                                                                                  |
| Accessibility automation  | Axe scans found no WCAG 2 A/AA or 2.1 A/AA violations at desktop and mobile widths. Automated scans do not replace manual review.                                               |

Detailed browser results and screenshots are in ignored `work/`. The source's original verification record is retained in `docs/source-verification.md`.

## Remaining manual setup

- Vercel dashboard configuration must be reviewed for the correct canonical Git link, `main`, Next.js preset, Node 22.18+ (preferably 24), default output handling, and removal of Vite/`dist` overrides. A previous attempt to inspect the visible Vercel project's settings/environment metadata returned a team-access error. Its current live configuration remains unverified, and no production settings or credentials were changed.
- The repository's Vite catch-all rewrite to `index.html` is removed. The replacement Vercel configuration disables automatic deployments only for this PR's branch, `codex/transfer-nextjs-andrewmolten-app`.
- Real enquiry delivery remains unconfigured and untested; supply a trusted server-only webhook and optional token before building if enabling the form. No email was sent during verification.
- Portrait, project screenshots, and verified URLs remain pending as in the completed design. The older Language Buddy screenshot is not presented as a verified Journalingo image.
- Dockerfile and Procfile syntax/startup commands were adapted and inspected, but no Docker image build or deployment was run.
- No merge or deployment was performed. The profile repository, original source PR, and earlier PR in the hyphenated repository remain untouched.
