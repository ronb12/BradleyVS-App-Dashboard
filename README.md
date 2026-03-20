# BradleyVS App Dashboard

**Live on Vercel (dashboard + API):** [https://bradleyvs-app-dashboard.vercel.app/](https://bradleyvs-app-dashboard.vercel.app/) → opens `BVS_Dashboard_v2_1.html` via `index.html` redirect.

**GitHub Pages (optional mirror):** [https://ronb12.github.io/BradleyVS-App-Dashboard/](https://ronb12.github.io/BradleyVS-App-Dashboard/)

Main file: `BVS_Dashboard_v2_1.html` (root `index.html` redirects here).  
`cloud-config.js` is generated on Vercel build so `window.BVS_CLOUD_API_BASE` points at the same deployment for cloud sync.

## Admin password

The **Admin** tab requires a password (stored as a **SHA-256 hash** in `BVS_Dashboard_v2_1.html`: `ADMIN_PASS_HASH_HEX`).

- **Default password (change immediately):** `BVS-ChangeMe!2026`
- **Change password:** pick a new password, compute SHA-256 hex of the UTF-8 string, replace `ADMIN_PASS_HASH_HEX`, commit, push.

Generate hash (macOS / Linux):

```bash
echo -n 'YourNewPassword' | shasum -a 256
```

Or Node: `node -e "console.log(require('crypto').createHash('sha256').update('YourNewPassword','utf8').digest('hex'))"`

**Security note:** This is a static site — the hash is in the source, so a determined visitor could brute-force a weak password. Use a **long random password** and treat this as access control for casual users, not high-security data.

**View-only guests:** Until someone signs in on the **Admin** tab, the rest of the dashboard is **read-only** (no status/subs/rating edits, notes are view-only, goal/expenses/marketing/versions/export CSV are disabled).

**Auto-save (this browser):** After admin sign-in, edits (status, priority, subs, notes, ratings, goal, expenses, marketing, versions, new apps, etc.) are written to **`localStorage`** under key `bvs_dashboard_persist_v1`, so they **survive refresh** on the same device/browser. Use **Export Full JSON Backup** for a portable file or clear site data to reset toward HTML defaults (new seed rows merge by `id` when possible).

## Vercel backend (cloud sync)

Deploy this repo to **[Vercel New Project](https://vercel.com/new?teamSlug=ronell-bradleys-projects)** (Import Git Repository). The **static dashboard** and **serverless API** can live on the same project.

### 1. Storage (Upstash Redis)

Legacy **Vercel KV** is deprecated; use **Upstash Redis** from the [Vercel Marketplace](https://vercel.com/marketplace?category=storage&search=redis):

1. Create / link an **Upstash Redis** database to this Vercel project.
2. Vercel injects **`UPSTASH_REDIS_REST_URL`** and **`UPSTASH_REDIS_REST_TOKEN`** (Production + Preview as needed).

### 2. Environment variable

In **Vercel → Project → Settings → Environment Variables**, add:

| Name | Value |
|------|--------|
| `BVS_ADMIN_PASS_HASH_HEX` | Same **lowercase hex** as `ADMIN_PASS_HASH_HEX` in `BVS_Dashboard_v2_1.html` (alias: `ADMIN_PASS_HASH_HEX` also accepted by `/api/bvs-auth`) |

### 3. API routes

| Method | Path | Purpose |
|--------|------|---------|
| `POST` | `/api/bvs-auth` | Body `{ "password": "…" }` → `{ ok, token }` (12h session) |
| `GET` | `/api/portfolio` | `Authorization: Bearer <token>` → last saved portfolio JSON |
| `POST` | `/api/portfolio` | Same auth → save portfolio JSON (replaces previous server copy) |
| `GET` | `/api/manifests` | **Public** — Firebase / Vercel / runtime-check JSON for the **Maintenance** tab (serverless; no secrets) |

CORS is open so **GitHub Pages** can call your Vercel API.

**Dynamic manifests:** With `cloud-config.js` setting `window.BVS_CLOUD_API_BASE`, the dashboard loads these files via `/api/manifests` instead of static `./data/*.json`. You can optionally set **full JSON strings** in Vercel env to override without redeploying: `BVS_VERCEL_MANIFEST_JSON`, `BVS_FIREBASE_MANIFEST_JSON`, `BVS_RUNTIME_CHECK_JSON`. If unset, the API serves the same `data/*.json` shipped with the repo.

### 4. Point the dashboard at Vercel

In **`BVS_Dashboard_v2_1.html`**, set the deployment origin (no trailing slash):

```html
<script>
window.BVS_CLOUD_API_BASE = 'https://YOUR-PROJECT.vercel.app';
</script>
```

(There is already a short script block before the main dashboard script—edit `window.BVS_CLOUD_API_BASE` there.)

After you **Admin** sign in, the app exchanges your password for a **short-lived server session** and then **uploads** each auto-save to Redis. On page load, if the cloud copy is **newer** than `localStorage`, it is merged in.

**Note:** Root `package.json` lists **`@upstash/redis`** for Vercel’s build. Static assets (`*.html`, `data/`) are still served as files; only `/api/*` runs Node.

## Firebase & Vercel 100% manifests

**Firebase** — all `*.web.app` / `*.firebaseapp.com` URLs in `APPS` must match **`data/firebase-hosting-manifest.json`** (`hostingUrls`, URL-normalized).

**Vercel** — all `*.vercel.app` URLs in `APPS` must match **`data/vercel-deployment-manifest.json`** (`deploymentUrls`, URL-normalized). Include the full path if the app lives under a path (e.g. `https://aba-mastery.vercel.app/app`).

When you add or change an app:

1. Update the `url` in `APPS` inside `BVS_Dashboard_v2_1.html`.
2. Update the right manifest (`hostingUrls` and/or `deploymentUrls`).
3. Run **Admin → Run Checks** — summary should show **Firebase: 100% ✓** and **Vercel: 100% ✓**.

**Repo matching:** maintenance checks also infer a GitHub repo name from the **Vercel project slug** (subdomain before `.vercel.app`), same as for `github.io` paths.

Opening the HTML as `file://` may block `fetch()` for the JSON files; use a local server (e.g. `npx serve .`) or GitHub Pages.

## Full maintenance checks (what runs)

### Admin tab → **Run Checks** (browser)

- **Firebase & Vercel:** `data/firebase-hosting-manifest.json` and `data/vercel-deployment-manifest.json` must each match every corresponding URL in `APPS` (100%).
- **GitHub API:** repos for `ronb12` — match dashboard apps to repo names; **last push** age; **archived** / **disabled**; **open issue** count (flags **Needs action** if issues &gt; 15).
- **Deployment:** `HEAD` reachability (and Firebase `__/firebase/init.json` when applicable).
- **CI runtime JSON:** loads `data/latest-runtime-check.json` and joins rows to apps by normalized URL.

### GitHub Actions — Playwright (`monitor/smoke.spec.ts`)

On every extracted HTTPS URL:

- **TLS:** invalid/untrusted certs fail the scan (`ignoreHTTPSErrors: false`).
- **HTTP status** for the navigation response (≥ 400 fails).
- **Load time** — `domcontentloaded` must finish within **15s**.
- **Page title** must be non-empty after load.
- **Console:** `error` messages fail (benign Next.js “RSC payload … Falling back to browser navigation” lines are filtered); **warnings** fail if count &gt; **40** (ad/script noise cap).
- **Uncaught page errors** (ignoring messages under **4** characters as minification noise) and **failed requests** (excluding `ERR_ABORTED`) fail.

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

- `api/bvs-auth.js`, `api/portfolio.js` — Vercel serverless API (Redis-backed portfolio + session).  
- `lib/redis.js` — Upstash Redis client helper (not a public HTTP route).  
- `vercel.json` — Vercel project hints.  
- `package.json` — dependency for API routes (`@upstash/redis`).  
- `data/firebase-hosting-manifest.json` — canonical Firebase Hosting URLs (100% match source of truth).  
- `data/vercel-deployment-manifest.json` — canonical Vercel `*.vercel.app` URLs (100% match).  
- `data/latest-runtime-check.json` — last automated runtime scan results.  
- `monitor/` — Playwright project and URL extractor.
- `BarberBook_Pro.html`, `NailGlow_Studio.html` — full single-file app UIs (same as `~/Desktop/…/index.html`); useful when opening the dashboard locally or shipping them on the same Vercel project.
