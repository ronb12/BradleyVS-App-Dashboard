# BradleyVS App Dashboard

**Live site (GitHub Pages):** [https://ronb12.github.io/BradleyVS-App-Dashboard/](https://ronb12.github.io/BradleyVS-App-Dashboard/)

Main file: `BVS_Dashboard_v2_1.html` (root `index.html` redirects here).

## Firebase 100% manifest

All Firebase Hosting URLs (`*.web.app` / `*.firebaseapp.com`) in the dashboard must match **`data/firebase-hosting-manifest.json`** exactly (URL-normalized). If you add or change a Firebase app:

1. Update the `url` in `APPS` inside `BVS_Dashboard_v2_1.html`.
2. Update `hostingUrls` in `data/firebase-hosting-manifest.json`.
3. Run **Admin → Run Checks** — you should see **Firebase manifest: 100% ✓**.

Opening the HTML as `file://` may block `fetch()` for the JSON files; use a local server (e.g. `npx serve .`) or GitHub Pages.

## Automated runtime checks (errors)

GitHub Actions runs headless **Playwright** smoke tests on every HTTPS URL extracted from the dashboard:

- **Console** `error` messages  
- **Uncaught page errors**  
- **Failed network requests**  
- **HTTP status** ≥ 400 fails the check  

Workflow: `.github/workflows/web-runtime-check.yml`  
Report written to: **`data/latest-runtime-check.json`** (committed by the workflow).

Local run:

```bash
cd monitor
npm install
npm run extract
npx playwright install chromium
npm test
```

## Repo contents

- `data/firebase-hosting-manifest.json` — canonical Firebase Hosting URLs (100% match source of truth).  
- `data/latest-runtime-check.json` — last automated runtime scan results.  
- `monitor/` — Playwright project and URL extractor.
