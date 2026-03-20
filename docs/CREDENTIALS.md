# Credentials in source code

**NailGlow Studio** and **BarberBook Pro** do **not** ship hardcoded passwords in JavaScript/HTML.

- New installs show a **first-run owner password** screen.
- Passwords live in **`localStorage`** after the user chooses them (per browser).
- Older commits may have contained demo passwords; **rotate** any password you ever committed, and use GitHub’s guidance if secret scanning still references historical revisions.

For production / SaaS, replace this with server-side auth (see `SAAS_ARCHITECTURE.md`).

## Other hosted apps (Firebase / Vercel)

These are **not** in this repo but have had **plaintext test or demo accounts visible on public login pages** (as of the portfolio audit):

| App        | Host                     | Action |
|-----------|--------------------------|--------|
| TaskPilot | taskpilot-ronb12.web.app | Remove test credentials from HTML; use first-run owner setup or internal docs only. **Rotate** any password that was ever public. |
| ParentLink| parentlink-2024-app.web.app | Same — no shared parent/teacher passwords in client-rendered pages. |
| HomeFlow Pro | homeflow-pro-*.web.app | Same — no “load test credentials” or passwords in source. |

Match the pattern used for **BarberBook Pro** and **NailGlow Studio** in this monorepo: setup screen + `localStorage`, no default passwords in Git or static HTML.
