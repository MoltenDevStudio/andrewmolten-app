# Verification in the correct repository

Verified on 3 November 2026 (New Zealand time).

## Repository and change scope

- Destination: **`MoltenDevStudio/andrewmolten-app`**, repository ID **`831894710`**.
- Both checkout remotes point to `https://github.com/MoltenDevStudio/andrewmolten-app.git`.
- GitHub resolves `andrew-molten/andrewmolten-app` to the same canonical repository. A Git query of that older URL returned `main` at `0602c42c76d76c9739996365734a05ce82381c8c`, matching the destination base.
- Source: completed profile-repository implementation at `fc53c44630a7ecdc435dcf94813859cbbd94c57c`.
- At transfer time, all 23 original application/test/configuration files matched that source byte-for-byte. The runtime enquiry availability fix below subsequently updates the homepage, contact component, and tests. Direct runtime dependency versions still match the source lockfile. The added `/projects` route only redirects the old Vite URL to the unchanged selected work section.
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

## P2 runtime enquiry availability fix (3 November 2026 UTC)

- Added dynamic `GET /api/enquiry/config` with `Cache-Control: no-store` and an exact `{ "enabled": boolean }` response. The static homepage no longer reads enquiry configuration. The client starts disabled and checks availability after hydration, retaining email fallback on failure or a five-second timeout. The existing POST handler is unchanged.
- `npm run lint`, `npm run build`, and `npm run typecheck` passed. Next.js reports `/` as static and `/api/enquiry/config` as dynamic.
- Built a Node 24 Alpine Docker image with no `CONTACT_FORM_ENDPOINT` or token. For this environment only, a temporary Dockerfile mounted the proxy CA for `npm ci`; no certificate or delivery configuration was added to image layers or the repository Dockerfile.
- Started that image without configuration: all **11 HTTP tests** and **9 browser tests** passed, including the disabled email fallback and POST refusal.
- Started the **same image** (`sha256:594fec204f050885c8fa7583fe89e0eed8bdf35f002631e42c955fd640b7db8a`) with `CONTACT_FORM_ENDPOINT` pointing at a local HTTPS mock and a dummy token supplied only at container startup. All **11 HTTP tests** and **9 browser tests** passed. The form enabled without rebuilding.
- Submitted a browser enquiry through `/api/enquiry` to that mock. Verified trimmed/validated JSON, server-side bearer authentication, mock acceptance, HTTP 200, visible success message, and cleared fields. Checked loaded HTML, JSON and JavaScript responses for the dummy webhook URL/token; neither appeared. No browser errors were observed. No real delivery service was contacted.
- Browser regression coverage includes a delayed response, false configuration, non-2xx response, invalid JSON, non-boolean value, network failure, timeout, and the deployed runtime's actual availability. Install/run instructions are in README.
- Docker tests ran sequentially because this environment's Docker storage driver exhausted disk space with multiple image copies. Test containers and network were removed afterwards. Vercel compatibility is covered by the dynamic Next.js route/build configuration; a live Vercel deployment was not performed.

## Remaining manual setup

- Vercel dashboard configuration must be reviewed for the correct canonical Git link, `main`, Next.js preset, Node 22.18+ (preferably 24), default output handling, and removal of Vite/`dist` overrides. A previous attempt to inspect the visible Vercel project's settings/environment metadata returned a team-access error. Its current live configuration remains unverified, and no production settings or credentials were changed.
- The repository's Vite catch-all rewrite to `index.html` is removed. The replacement Vercel configuration disables automatic deployments only for this PR's branch, `codex/transfer-nextjs-andrewmolten-app`.
- Real enquiry delivery remains unconfigured and untested; supply a trusted server-only webhook and optional token at server/container startup to enable the form. Vercel environment changes require redeployment. No email was sent during verification.
- Portrait, project screenshots, and verified URLs remain pending as in the completed design. The older Language Buddy screenshot is not presented as a verified Journalingo image.
- Docker build and runtime configuration were verified locally as described above; no hosted Docker or Procfile deployment was performed.
- No merge or deployment was performed. The profile repository, original source PR, and earlier PR in the hyphenated repository remain untouched.
