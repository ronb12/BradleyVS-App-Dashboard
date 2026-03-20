// ── DATA ──────────────────────────────────────────────────────────────────────
const APPS = [
  {id:1, name:"Holliday's Lawn & Garden",desc:"Services-led landscaping · marketing, pay bill, client login (GitHub Pages). Row price N/A — not SaaS MRR; optional future booking tier", url:"https://ronb12.github.io/Holliday-Lawn-Garden/index.html",status:"live", cat:"Business",    price:null, pri:"High",    maintOffset:30},
  {id:2, name:"Bradley Health",          desc:"Medical Health Tracking · Firebase — Stripe / App Store subscription billing on product roadmap", url:"https://bradley-health.web.app/",                         status:"live", cat:"Health",      price:19.99,pri:"High",    maintOffset:31},
  {id:3, name:"Kaden & Adelynn Space Adventures", desc:"iOS App Store (live) · space shooter — App Store title ‘Kaden & Adelynn Adventures’ · no IAP/ads modeled in dashboard yet", url:"https://apps.apple.com/us/app/kaden-adelynn-adventures/id6749645849", repo:"ronb12/Kaden-Adelynn-Adventures", status:"live", cat:"Gaming", price:null, pri:"Medium", maintOffset:32},
  {id:4, name:"Faith Journal",           desc:"iOS App Store (live) · AdMob · App Store listing ‘My Faith Journal’ · list $/mo optional roadmap, not current MRR", url:"https://apps.apple.com/us/app/my-faith-journal/id6746383133", status:"live", cat:"Lifestyle", price:null, pri:"High", maintOffset:33},
  {id:5, name:"Amplifi",                 desc:"Social / creator platform · AdSense live; premium upsell on roadmap", url:"https://amplifi-a54d9.web.app/index.html",                status:"live", cat:"Social",      price:9.99, pri:"High",    maintOffset:34},
  {id:6, name:"Adelynn's Jungle Dash",   desc:"Kids Memory Card Game",          url:"https://ronb12.github.io/Adelynn-Jungle-Dash/",           status:"live", cat:"Kids/Gaming", price:1.99, pri:"Low",     maintOffset:35},
  {id:7, name:"Bradley's Finance Hub",   desc:"Budget & finance app — in-app subscription / Stripe billing on roadmap", url:"https://mobile-debt-tracker.web.app/index.html",          status:"live", cat:"Finance",     price:12.99,pri:"High",    maintOffset:36},
  {id:8, name:"Bradley Travel Planner",  desc:"Travel planner — subscription / Stripe billing on roadmap", url:"https://bradleys-travel-planner.web.app/",                status:"live", cat:"Travel",      price:8.99, pri:"Medium",  maintOffset:37},
  {id:9, name:"DreamBuild",              desc:"AI app & website builder — relaunched Mar 2026 · $49.99 positioning", url:"https://dreambuild-2024-app.web.app/",                    status:"live", cat:"Dev Tools",   price:49.99,pri:"High",    maintOffset:52},
  {id:10,name:"FitFlow Pro",             desc:"AI-Powered Fitness App",         url:"https://fitflow-pro-dreambuild.web.app/",                 status:"live", cat:"Health",      price:9.99, pri:"Medium",  maintOffset:39},
  {id:11,name:"Bradley Gig-Runner",      desc:"Food Delivery App",              url:"https://bradley-gigrunner.web.app/",                      status:"maint",cat:"Delivery",    price:null, pri:"High",    maintOffset:null},
  {id:12,name:"ProcureFlow",             desc:"DoD MWR purchasing · demo only — $149.99 row = SMB/demo reference tier for collateral (not Gov production pricing)", url:"https://procureflow-demo.web.app/login/",                 status:"live", cat:"Enterprise",  price:149.99,pri:"Critical",maintOffset:41},
  {id:13,name:"MindGlow",                desc:"Wellness & meditation · web/PWA + iOS in Apple TestFlight (beta)", url:"https://mindglow-wellness.web.app/", testflightUrl:"https://testflight.apple.com/join/yMWPUxaZ", status:"live", cat:"Wellness", price:14.99, pri:"Medium", maintOffset:42},
  {id:14,name:"TaskPilot",               desc:"Project & Production Manager",   url:"https://taskpilot-ronb12.web.app/",                      status:"live", cat:"Productivity",price:30.00,pri:"High",    maintOffset:43},
  {id:15,name:"HomeFlow Pro",            desc:"Home Management Dashboard",      url:"https://homeflow-pro-1760475179.web.app/",                status:"live", cat:"Home",        price:30.00,pri:"Medium",  maintOffset:44},
  {id:16,name:"ParentLink",              desc:"Education Communication App",    url:"https://parentlink-2024-app.web.app/",                    status:"live", cat:"Education",   price:30.00,pri:"High",    maintOffset:45},
  {id:17,name:"ABA Mastery",             desc:"ABA Therapist Study App",        url:"https://aba-mastery.vercel.app/app",                      status:"live", cat:"Education",   price:30.00,pri:"Critical",maintOffset:46},
  {id:18,name:"EchoDynamo",              desc:"Secure messaging · E2EE, Firebase, Stripe, PWA · Vercel · Mar 2026: deps hardened (npm audit 0)", url:"https://echodynamo.vercel.app/login", repo:"ronb12/EchoDynamo", status:"live", cat:"Social",      price:39.00,pri:"High",    maintOffset:120},
  {id:19,name:"RentFlow",                desc:"Property management · Vercel — cold start / timeouts monitored; email pipeline verified per repo", url:"https://rentflow-property.vercel.app/",                   status:"live", cat:"Real Estate", price:30.00,pri:"High",    maintOffset:48},
  {id:20,name:"BradleyVS",               desc:"App Portfolio Dashboard (this site)", url:"https://bradleyvs-app-dashboard.vercel.app/",         status:"maint",cat:"Productivity",price:9.99, pri:"Medium",  maintOffset:null},
  {id:21,name:"NurseMaster",             desc:"Nursing Study App",              url:null,                                                      status:"maint",cat:"Education",   price:24.99,pri:"High",    maintOffset:null},
  {id:22,name:"Bradley Digital Mktg Hub",desc:"Digital Marketing App",          url:null,                                                      status:"maint",cat:"Marketing",   price:39.99,pri:"High",    maintOffset:null},
  {id:23,name:"K.A.S Roblox",            desc:"Roblox Game",                    url:null,                                                      status:"maint",cat:"Gaming",      price:null, pri:"Low",     maintOffset:null},
  {id:25,name:"80's Jitterbug",          desc:"Retro 360 photo booth · marketing site + iOS in Apple TestFlight (beta)", url:"https://jitterbug80s.web.app/", testflightUrl:"https://testflight.apple.com/join/6vnnNhuM", status:"live", cat:"Events", price:null, pri:"High", maintOffset:49},
  {id:26,name:"Guilty Pleasure Treats",  desc:"Bakery D2C · Vercel site + iOS in Apple TestFlight (beta); App Store release pending", url:"https://guilty-pleasure-treats.vercel.app/", storeUrl:"https://apps.apple.com/app/guilty-pleasure-treats", testflightUrl:"https://testflight.apple.com/join/T7MdqxPa", status:"maint", cat:"E-Commerce", price:14.99, pri:"Medium", maintOffset:null},
  {id:27,name:"BarberBook Pro",              desc:"Complete Barber Shop Management · standalone repo + Vercel", url:"https://bradleyvs-app-dashboard.vercel.app/BarberBook_Pro", repo:"ronb12/BarberBook-Pro", status:"live", cat:"Business",    price:49.99,pri:"High",    maintOffset:50},
  {id:28,name:"NailGlow Studio",             desc:"Nail Shop Business Management · standalone repo + Vercel",   url:"https://bradleyvs-app-dashboard.vercel.app/NailGlow_Studio", repo:"ronb12/NailGlow-Studio", status:"live", cat:"Business",    price:49.99,pri:"High",    maintOffset:51},
];

/** Feature bullets per app id for the Features catalog (print / PDF / Markdown). Update when shipping major features. */
const APP_FEATURE_CATALOG = {
  1: { features: ['Public marketing site: services (lawn, landscape design, pressure washing)', 'Quote & contact flows', 'Pay bill page', 'Customer login area', 'GitHub Pages hosting', 'Revenue model: services-led — portfolio row price N/A; future optional booking/SaaS tier'] },
  2: { features: ['Auth: login, register, password reset', 'Blood pressure logging, trends, history', 'Medications list, adherence, reminders', 'Mood tracking + trends + journal', 'Women’s health: cycle, fertility, screenings, STI, PCOS, thyroid logs', 'Limb / prosthetic care, pain tracking, equipment & maintenance queue', 'Nutrition & meals with cholesterol estimation', 'Weight-loss goals with AI meal & exercise plans', 'Health insights / scoring, data export, printable medical reports', 'Profile, emergency contact, dark mode, PWA install', 'Monetization: Stripe / App Store subscription — on roadmap in app repo'] },
  3: { features: ['App Store: apps.apple.com/us/app/kaden-adelynn-adventures/id6749645849', 'Space shooter; Game Center; iPhone/iPad/Mac (Apple Silicon) / visionOS', 'Monetization: none in portfolio row yet', 'Developer site: kaden---adelynn-adventures.web.app · Repo: Kaden-Adelynn-Adventures'] },
  4: { features: ['App Store listing “My Faith Journal”: apps.apple.com/us/app/my-faith-journal/id6746383133', 'Monetization: Google AdMob (primary)', 'Optional paid tier / IAP — future; current model ads-led', 'Faith-based digital journaling · also on Mac App Store (same id)', 'Developer page (all apps): apps.apple.com/us/developer/ronell-bradley/id1816566952'] },
  5: { features: ['Creator landing: video, live, short-form positioning', 'Information architecture: feed, trending, search, upload, editor, schedule', 'Library & profile routes', 'Legal pages: about, privacy, terms', 'Monetization: Google AdSense enabled; premium paths on roadmap'] },
  6: { features: ['Kid-friendly memory safari theme', 'Multiple difficulty presets', 'Local stats: games played, win rate, streaks, achievements'] },
  7: { features: ['Debt tracker', 'Budget tracker', 'Debt velocity / payoff calculator', 'Net worth tracker', '1099 / W-2 style tax calculator', 'Savings goals', 'Firebase-hosted; sign-in + dashboard routes', 'Billing: in-app subscription / Stripe — roadmap'] },
  8: { features: ['Trip creation, upcoming trips, templates', 'Budget totals, spend vs remaining, analytics charts', 'Travel calendar view', 'Packing lists', 'Travel document vault', 'Multi-currency settings (large currency list)', 'Data export & offline/PWA messaging', 'Billing: subscription / Stripe — roadmap'] },
  9: { features: ['AI-assisted dev positioning: code generation, templates', 'Collaboration, integrated terminal, Git/GitHub story', 'Desktop app download CTA', 'Tech stack / analytics messaging', 'Mar 2026: relaunch — production positioning restored; $49.99/mo tier in portfolio'] },
  10: { features: ['AI-powered fitness branding', 'PWA install prompts', 'Offline messaging — expand in app repo'] },
  11: { features: ['Three-sided marketplace positioning: customers, drivers, restaurants', 'Order & delivery story', 'Auth entry (login / signup)', 'Status: maintenance'] },
  12: { features: ['MWR purchase-card workflow positioning (requester role)', 'Demo disclaimer on login', 'OAuth placeholders (Google/Microsoft)', 'Not for production — portfolio $149.99 = SMB/demo reference for collateral; DoD deals priced separately'] },
  13: { features: ['iOS: TestFlight public link testflight.apple.com/join/yMWPUxaZ (MindGlow beta)', 'Meditation sessions, custom timer, ambient soundscapes', 'Breathing exercises (box, 4-7-8, calm)', 'Mood, stress, habits, water, sleep, screen time', 'Gratitude, affirmations, personal notes', 'Community: friends, challenges, group sessions', 'Wellness library + mindful eating guide', 'Optional commerce: products, cart, checkout tax, orders, inventory (owner tools)', 'Google auth, data export, reminders, offline mode · Web: mindglow-wellness.web.app'] },
  14: { features: ['Project / production management (TaskPilot)', 'Email + password auth', 'Auth hygiene: next deploy — no plaintext demo accounts in static HTML (see docs/CREDENTIALS.md)', 'Roadmap: expand task/kanban docs in repo'] },
  15: { features: ['Home management dashboard', 'Auth + first-run or demo flow', 'Auth hygiene: next deploy — BarberBook-style owner setup; no default passwords in source (docs/CREDENTIALS.md)', 'Feature depth documented in HomeFlow repo'] },
  16: { features: ['Parent ↔ teacher communication', 'Role-based sign-in', 'Auth hygiene: next deploy — invite-only or admin seed; no shared test passwords in client HTML (docs/CREDENTIALS.md)', 'Messaging & announcements — align with ParentLink repo'] },
  17: { features: ['BCBA / BCaBA exam modes & timers', 'Topic study, practice exams, flashcards', 'Clinical scenario quizzes (large scenario bank)', 'Published case-studies module', 'AI study coach & readiness metrics', 'Achievements, XP, streaks', 'Study groups, bookmarks, progress export', 'PWA install'] },
  18: { features: ['Rich messaging (media, voice, GIFs, polls, reactions)', 'Voice/video (WebRTC) & screen share', 'Stripe Connect payments & subscriptions story', 'Family safety: parent/child linking & controls', 'E2EE & 2FA messaging on positioning', 'PWA / offline story', 'Mar 2026 maint.: GitHub ronb12/EchoDynamo — npm audit 0 (root, functions, server); unused jspdf removed; firebase-admin dev-only in SPA; Functions on firebase-admin 12.x + overrides; Vite build + lint OK'] },
  19: { features: ['Property management positioning', 'Tenants, leases, maintenance — RentFlow repo', 'Vercel: monitor cold start / timeout patterns', 'Email pipeline: verify in repo; GitHub issues for mail failures'] },
  20: { features: ['Portfolio KPIs & app table (status, category, price, subs, revenue)', 'Revenue goal, scenarios, expenses, marketing trackers', 'Version history, roadmap, maintenance automation UI', 'Admin auth (local + optional cloud API)', 'Per-app per-day work log (plain English) in Admin', 'CSV / JSON export, cloud portfolio sync hooks', 'Feature catalog with print & Markdown export (this tab)', 'Policy: external Firebase apps should follow docs/CREDENTIALS.md (no hardcoded demo passwords)'] },
  21: { features: ['Nursing exam / study companion (NurseMaster)', 'Detailed modules in app repo — link when URL live'] },
  22: { features: ['Digital marketing hub: campaigns, assets, analytics (per product intent)', 'URL TBD — update catalog when deployed'] },
  23: { features: ['Roblox game (K.A.S)', 'Live Roblox experience — pricing varies / not SaaS monthly'] },
  25: { features: ['iOS: TestFlight public link testflight.apple.com/join/6vnnNhuM (80’s Jitterbug beta)', 'Event photo booth marketing site (jitterbug80s.web.app)', 'Packages (basic / standard / VIP)', 'Booking & quote requests', 'Gallery & testimonials block', 'Pricing: typically event-based (Varies in portfolio)'] },
  26: { features: ['iOS: TestFlight public link testflight.apple.com/join/T7MdqxPa (Guilty Pleasure Treats beta)', 'Bakery menu storytelling (cupcakes, cookies, cakes, brownies)', 'Custom cakes + AI-assist positioning', 'Vercel marketing: guilty-pleasure-treats.vercel.app · ordering / pickup & delivery copy', 'Social & email contact'] },
  27: { features: ['Owner login + first-run password setup (localStorage)', 'Dashboard: today’s revenue, appts, walk-ins, barber stats', 'Booking & walk-in queue, client CRM', 'Barber team, services & categories, retail inventory', 'Business reports, transactions, tax rate, payment methods', 'Stripe-ready checkout story, JSON backup import/export', 'PWA / shop settings'] },
  28: { features: ['Owner login + first-run password setup (localStorage)', 'Studio dashboard: appointments, walk-ins, technicians, nail-inspo gallery', 'Client profiles with allergies & style notes', 'Services with descriptions; retail / polish inventory', 'Staff accounts (owner/manager/tech), reports & tips', 'Stripe + Twilio fields, cancellation policy, tax', 'JSON backup import/export, SaaS migration notes in docs'] },
};

/** `?view=public` / `?public=1` — shareable read-only portfolio (Apps + Features only). */
function isPublicPortfolioView() {
  try {
    const q = new URLSearchParams(window.location.search);
    return q.get('view') === 'public' || q.get('public') === '1';
  } catch {
    return false;
  }
}

function isAppStoreUrl(u) {
  return typeof u === 'string' && /apps\.apple\.com\//i.test(u);
}

/** Primary web / marketing / PWA URL (`prodUrl` optional override; otherwise `url` unless App Store). */
function getAppProdUrl(a) {
  if (!a) return null;
  const p = a.prodUrl != null && String(a.prodUrl).trim() ? String(a.prodUrl).trim() : null;
  if (p) return p;
  if (a.url && typeof a.url === 'string' && a.url.trim() && !isAppStoreUrl(a.url)) return a.url.trim();
  return null;
}

/** App Store product page (`storeUrl` or legacy `url` when App Store). */
function getAppStoreUrl(a) {
  if (!a) return null;
  const s = a.storeUrl != null && String(a.storeUrl).trim() ? String(a.storeUrl).trim() : null;
  if (s) return s;
  if (a.url && isAppStoreUrl(a.url)) return a.url.trim();
  return null;
}

/** URL used for hosting / deploy checks (excludes App Store links). */
function appHostingProbeUrl(a) {
  if (!a) return null;
  return getAppProdUrl(a) || (a.url && !isAppStoreUrl(a.url) ? String(a.url).trim() : null);
}

/** `owner/repo` or full GitHub URL → https link for the Link column. */
function githubRepoHref(repo) {
  if (!repo || typeof repo !== 'string') return null;
  const r = repo.trim();
  if (!r) return null;
  if (/^https:\/\/github\.com\//i.test(r)) return r.replace(/\/$/, '');
  if (/^[\w.-]+\/[\w.-]+$/i.test(r)) return `https://github.com/${r}`;
  return null;
}

const APPS_TABLE_HEAD_FULL = `<th onclick="sortTable(0)"># ↕</th><th onclick="sortTable(1)">App Name ↕</th><th>Status</th><th>Category</th><th onclick="sortTable(4)">Price ↕</th><th>Subs</th><th>Revenue</th><th>Rating ⭐</th><th>Priority</th><th>Notes</th><th>Link</th><th>Next Maint.</th>`;
const APPS_TABLE_HEAD_PUBLIC = `<th onclick="sortTable(0)"># ↕</th><th onclick="sortTable(1)">App Name ↕</th><th>Status</th><th>Category</th><th>Links</th>`;

// State stored in memory
const state = {
  subs: {}, notes: {}, ratings: {}, expenses: {}, marketing: {}, versions: [],
  /** Per-day per-app plain-English blurbs: { 'YYYY-MM-DD': { [appId]: 'text' } } */
  dailyBlurbs: {},
  goalAmount: 5000
};
// Pre-set ABA Mastery with 1 subscriber (overridden if localStorage has saved data)
state.subs[17] = 1;

/** Auto-save portfolio (apps + trackers) to this browser for admins. Schema bump = new key if format changes. */
const BVS_LOCAL_STORAGE_KEY = 'bvs_dashboard_persist_v1';
const BVS_PERSIST_SCHEMA = 1;
/** sessionStorage key for Vercel /api/bvs-auth session JWT replacement (opaque token). */
const BVS_CLOUD_TOKEN_KEY = 'bvs_cloud_api_token';

function getCloudApiBase() {
  if (typeof window === 'undefined') return '';
  return String(window.BVS_CLOUD_API_BASE || '').trim().replace(/\/$/, '');
}

/** barberbook-pro.vercel.app still serves an unrelated Lovable shell — rewrite to the real app on the main dashboard. */
function rewriteLegacyStandaloneAppUrls(url) {
  if (url == null || typeof url !== 'string') return url;
  const s = url.trim();
  if (!/^https:\/\/barberbook-pro\.vercel\.app\b/i.test(s)) return url;
  if (typeof window !== 'undefined') {
    const host = window.location.hostname || '';
    const onMainDash = host === 'bradleyvs-app-dashboard.vercel.app';
    const onLocal = host === 'localhost' || host === '127.0.0.1';
    if (onMainDash || onLocal) return `${window.location.origin}/BarberBook_Pro`;
  }
  return 'https://bradleyvs-app-dashboard.vercel.app/BarberBook_Pro';
}

function sanitizePortfolioAppUrlsInPlace() {
  let changed = false;
  for (const a of APPS) {
    const next = rewriteLegacyStandaloneAppUrls(a.url);
    if (next !== a.url) {
      a.url = next;
      changed = true;
    }
  }
  if (changed) {
    try {
      const payload = buildPortfolioPayload();
      localStorage.setItem(BVS_LOCAL_STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {
      console.warn('BVS: could not persist URL fixes', e);
    }
  }
}

function mergeAppsFromSeedAndSaved(seedApps, savedApps) {
  if (!Array.isArray(savedApps) || savedApps.length === 0) return seedApps.map(s => ({ ...s }));
  const savedById = new Map(savedApps.map(a => [a.id, a]));
  const seedIds = new Set(seedApps.map(a => a.id));
  const merged = seedApps.map(s => {
    const o = savedById.get(s.id);
    return o ? { ...s, ...o } : { ...s };
  });
  for (const a of savedApps) {
    if (!seedIds.has(a.id)) merged.push({ ...a });
  }
  merged.sort((x, y) => x.id - y.id);
  return merged;
}

/** Apply saved payload over current APPS (merge by id). Returns true if applied. */
function applyPersistedPayload(data) {
  try {
    if (!data || data.schema !== BVS_PERSIST_SCHEMA || !Array.isArray(data.apps)) return false;
    const seedSnapshot = APPS.map(a => ({ ...a }));
    const merged = mergeAppsFromSeedAndSaved(seedSnapshot, data.apps);
    APPS.splice(0, APPS.length, ...merged);
    sanitizePortfolioAppUrlsInPlace();
    if (data.state && typeof data.state === 'object') {
      state.subs = { ...(data.state.subs || {}) };
      state.notes = { ...(data.state.notes || {}) };
      state.ratings = { ...(data.state.ratings || {}) };
      state.expenses = data.state.expenses && typeof data.state.expenses === 'object'
        ? JSON.parse(JSON.stringify(data.state.expenses)) : {};
      state.marketing = data.state.marketing && typeof data.state.marketing === 'object'
        ? JSON.parse(JSON.stringify(data.state.marketing)) : {};
      state.versions = Array.isArray(data.state.versions) ? data.state.versions.slice() : [];
      state.dailyBlurbs = data.state.dailyBlurbs && typeof data.state.dailyBlurbs === 'object'
        ? JSON.parse(JSON.stringify(data.state.dailyBlurbs)) : {};
      if (typeof data.state.goalAmount === 'number' && Number.isFinite(data.state.goalAmount)) {
        state.goalAmount = data.state.goalAmount;
      }
    }
    return true;
  } catch (e) {
    console.warn('BVS: apply payload failed', e);
    return false;
  }
}

function hydratePortfolioFromStorage() {
  try {
    const raw = localStorage.getItem(BVS_LOCAL_STORAGE_KEY);
    if (!raw) return;
    const data = JSON.parse(raw);
    applyPersistedPayload(data);
  } catch (e) {
    console.warn('BVS: could not load saved portfolio', e);
  }
}

function buildPortfolioPayload() {
  const goalEl = typeof $ === 'function' ? $('goalInput') : null;
  const goalVal = goalEl ? parseFloat(goalEl.value) : NaN;
  const goalAmount = Number.isFinite(goalVal) ? goalVal : (state.goalAmount || 5000);
  state.goalAmount = goalAmount;
  return {
    schema: BVS_PERSIST_SCHEMA,
    savedAt: new Date().toISOString(),
    apps: APPS.map(a => ({ ...a })),
    state: {
      subs: { ...state.subs },
      notes: { ...state.notes },
      ratings: { ...state.ratings },
      expenses: JSON.parse(JSON.stringify(state.expenses)),
      marketing: JSON.parse(JSON.stringify(state.marketing)),
      versions: state.versions.slice(),
      dailyBlurbs: JSON.parse(JSON.stringify(state.dailyBlurbs || {})),
      goalAmount
    }
  };
}

async function cloudExchangeToken(password) {
  const base = getCloudApiBase();
  if (!base || !password) return;
  try {
    const r = await fetch(`${base}/api/bvs-auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    const j = await r.json().catch(() => ({}));
    if (j.ok && j.token) sessionStorage.setItem(BVS_CLOUD_TOKEN_KEY, j.token);
    else console.warn('BVS cloud session:', j.error || r.status);
  } catch (e) {
    console.warn('BVS cloud auth failed', e);
  }
}

async function syncPortfolioToCloud(payload) {
  const base = getCloudApiBase();
  if (!base || !payload) return;
  const token = sessionStorage.getItem(BVS_CLOUD_TOKEN_KEY);
  if (!token) return;
  try {
    const r = await fetch(`${base}/api/portfolio`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    if (r.status === 401) {
      try { sessionStorage.removeItem(BVS_CLOUD_TOKEN_KEY); } catch {}
    }
    const j = await r.json().catch(() => ({}));
    if (!r.ok || !j.ok) console.warn('BVS cloud save:', j.error || r.status);
  } catch (e) {
    console.warn('BVS cloud save failed', e);
  }
}

/** If user has a cloud session token, pull newer data than localStorage. Call on load. */
/**
 * Merge ./data/work-log-seed.json into state.dailyBlurbs for empty cells only
 * (won’t overwrite typing you already saved).
 */
async function mergeWorkLogSeedFromFile() {
  try {
    const res = await fetch('./data/work-log-seed.json', { cache: 'no-store' });
    if (!res.ok) return;
    const seed = await res.json();
    if (!seed || !seed.dates || typeof seed.dates !== 'object') return;
    let changed = false;
    for (const [dateKey, entries] of Object.entries(seed.dates)) {
      if (!entries || typeof entries !== 'object' || !/^\d{4}-\d{2}-\d{2}$/.test(dateKey)) continue;
      if (!state.dailyBlurbs[dateKey]) state.dailyBlurbs[dateKey] = {};
      for (const [appIdStr, text] of Object.entries(entries)) {
        const appId = parseInt(appIdStr, 10);
        if (!Number.isFinite(appId) || typeof text !== 'string') continue;
        const t = text.trim();
        if (!t) continue;
        const existing = state.dailyBlurbs[dateKey][appId];
        if (existing != null && String(existing).trim() !== '') continue;
        state.dailyBlurbs[dateKey][appId] = t;
        changed = true;
      }
      if (Object.keys(state.dailyBlurbs[dateKey]).length === 0) delete state.dailyBlurbs[dateKey];
    }
    if (changed) persistPortfolioToStorage();
  } catch (e) {
    console.warn('BVS: work-log-seed merge', e);
  }
}

async function tryMergeFromCloudOnLoad() {
  const base = getCloudApiBase();
  if (!base) return;
  const token = sessionStorage.getItem(BVS_CLOUD_TOKEN_KEY);
  if (!token) return;
  try {
    const r = await fetch(`${base}/api/portfolio`, { headers: { Authorization: `Bearer ${token}` } });
    if (r.status === 401) {
      try { sessionStorage.removeItem(BVS_CLOUD_TOKEN_KEY); } catch {}
      return;
    }
    const j = await r.json().catch(() => ({}));
    if (!j.ok || j.data == null) return;
    let payload = j.data;
    if (typeof payload === 'string') {
      try { payload = JSON.parse(payload); } catch { return; }
    }
    const localRaw = localStorage.getItem(BVS_LOCAL_STORAGE_KEY);
    const local = localRaw ? JSON.parse(localRaw) : null;
    const cT = payload.savedAt ? +new Date(payload.savedAt) : 0;
    const lT = local?.savedAt ? +new Date(local.savedAt) : 0;
    if (cT > lT && applyPersistedPayload(payload)) {
      localStorage.setItem(BVS_LOCAL_STORAGE_KEY, JSON.stringify(payload));
    }
  } catch (e) {
    console.warn('BVS cloud load merge', e);
  }
}

function persistPortfolioToStorage() {
  try {
    const payload = buildPortfolioPayload();
    localStorage.setItem(BVS_LOCAL_STORAGE_KEY, JSON.stringify(payload));
    syncPortfolioToCloud(payload).catch(() => {});
  } catch (e) {
    console.warn('BVS: could not save portfolio', e);
  }
}

hydratePortfolioFromStorage();

let currentFilter = 'all', sortCol = 0, sortAsc = true, modalAppId = null;
const maintenanceState = {
  running:false,
  lastRunAt:null,
  results:[],
  firebaseMeta:{ match100:null, onlyInApps:[], onlyInManifest:[], manifestLoaded:false, manifestError:null },
  vercelMeta:{ match100:null, onlyInApps:[], onlyInManifest:[], manifestLoaded:false, manifestError:null },
  runtimeMeta:{ loaded:false, generatedAt:null, error:null },
};

// ── ADMIN AUTH (sessionStorage; hash is visible in source — use for casual access only) ──
const ADMIN_SESSION_KEY = 'bvs_admin_auth_v1';
const ADMIN_SESSION_MAX_MS = 12 * 60 * 60 * 1000;
/** SHA-256 (UTF-8) of password, lowercase hex. Default password: BVS-ChangeMe!2026 — change and push your own hash. */
const ADMIN_PASS_HASH_HEX = '491971133b8a31a4c6aae678bd5d47941c7d0251258a92893c29d57098ffd762';

async function sha256HexUtf8(text) {
  const enc = new TextEncoder().encode(text);
  const buf = await crypto.subtle.digest('SHA-256', enc);
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
}

function getAdminSessionPayload() {
  try {
    const raw = sessionStorage.getItem(ADMIN_SESSION_KEY);
    if (!raw) return null;
    const o = JSON.parse(raw);
    if (o.exp && Date.now() > o.exp) {
      sessionStorage.removeItem(ADMIN_SESSION_KEY);
      return null;
    }
    return o;
  } catch {
    return null;
  }
}

function isAdminAuthenticated() {
  return getAdminSessionPayload() != null;
}

/** All portfolio mutations (main tabs + overview) require the same Admin session as the Admin panel. */
function canEditPortfolio() {
  if (isPublicPortfolioView()) return false;
  return isAdminAuthenticated();
}

function syncPortfolioEditMode() {
  const ed = canEditPortfolio();
  const goal = $('goalInput');
  if (goal) {
    goal.disabled = !ed;
    goal.title = ed ? '' : 'Sign in via 🔐 Admin tab to change revenue goal';
  }
  const ex = $('toolbarExportCsv');
  if (ex) {
    ex.disabled = !ed;
    ex.title = ed ? '' : 'Admin sign-in required — use 🔐 Admin tab';
  }
  ['verNum', 'verNotes'].forEach(id => {
    const el = $(id);
    if (el) {
      el.disabled = !ed;
      el.title = ed ? '' : 'Admin sign-in required';
    }
  });
  const vbtn = $('addVersionBtn');
  if (vbtn) {
    vbtn.disabled = !ed;
    vbtn.title = ed ? '' : 'Admin sign-in required';
  }
  const hint = $('appsEditHint');
  if (hint) {
    if (isPublicPortfolioView()) {
      hint.textContent = '🌐 Public portfolio — link-focused table · Revenue, notes, and admin are hidden. Open the full dashboard for editing.';
    } else {
      hint.textContent = ed
        ? '💡 Edit price, subscribers & ratings inline (empty price = Varies) · Click 📝 for notes · Red rows = overdue maintenance'
        : '👁️ View-only — Open 🔐 Admin and sign in to edit status, price, subs, ratings, notes, exports, revenue goal, expenses, marketing, and versions.';
    }
  }
}

function onAdminSessionChanged() {
  syncPortfolioEditMode();
  renderApps();
  renderRevenue();
  renderExpenses();
  renderMarketing();
  renderVersionsPanel();
  renderRoadmap();
  if (isAdminAuthenticated()) renderAdminPanel();
  updateAll();
}

function setAdminSession() {
  sessionStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify({ ok: true, exp: Date.now() + ADMIN_SESSION_MAX_MS }));
}

function clearAdminSession() {
  sessionStorage.removeItem(ADMIN_SESSION_KEY);
}

function syncAdminGate() {
  const gate = $('admin-login-gate');
  const prot = $('admin-protected');
  if (!gate || !prot) return;
  if (isAdminAuthenticated()) {
    gate.style.display = 'none';
    prot.style.display = 'block';
  } else {
    gate.style.display = 'block';
    prot.style.display = 'none';
  }
}

async function submitAdminLogin(ev) {
  ev.preventDefault();
  const input = $('admin-login-password');
  const errEl = $('admin-login-error');
  if (errEl) errEl.textContent = '';
  const pw = (input && input.value) ? input.value : '';
  if (!pw) return;
  const hex = await sha256HexUtf8(pw);
  if (hex !== ADMIN_PASS_HASH_HEX) {
    if (errEl) errEl.textContent = 'Incorrect password.';
    if (input) input.focus();
    return;
  }
  await cloudExchangeToken(pw);
  if (input) input.value = '';
  setAdminSession();
  syncAdminGate();
  onAdminSessionChanged();
  showSave();
}

function adminLogout() {
  try { sessionStorage.removeItem(BVS_CLOUD_TOKEN_KEY); } catch {}
  clearAdminSession();
  syncAdminGate();
  const errEl = $('admin-login-error');
  if (errEl) errEl.textContent = '';
  onAdminSessionChanged();
}

// ── HELPERS ───────────────────────────────────────────────────────────────────
const $ = id => document.getElementById(id);
const fmt = n => n.toLocaleString('en-US',{style:'currency',currency:'USD'});
function getMaintDate(offset) {
  if (!offset) return null;
  const d = new Date(); d.setDate(d.getDate() + offset);
  return d;
}
function formatDate(d) {
  if (!d) return 'TBD';
  return `${d.getMonth()+1}/${d.getDate()}/${String(d.getFullYear()).slice(-2)}`;
}
function isOverdue(offset) {
  if (!offset) return false;
  const d = getMaintDate(offset);
  return d < new Date(Date.now() + 7 * 86400000); // within 7 days = alert
}
function calcRevenue() {
  return APPS.reduce((s, a) => {
    const p = a.price != null && Number.isFinite(Number(a.price)) ? Number(a.price) : null;
    const sub = state.subs[a.id] || 0;
    return s + (p != null && sub ? p * sub : 0);
  }, 0);
}
function calcExpenses() {
  return Object.values(state.expenses).reduce((s,e) => {
    return s + (parseFloat(e.hosting)||0) + (parseFloat(e.domain)||0) + (parseFloat(e.other)||0);
  }, 0);
}
function showSave() {
  const el = $('saveIndicator');
  if (el) {
    el.classList.add('show');
    setTimeout(() => el.classList.remove('show'), 2000);
  }
  if (canEditPortfolio()) persistPortfolioToStorage();
}

// ── FEATURES CATALOG (print / PDF / Markdown) ─────────────────────────────────
function catalogPriceLabel(a) {
  if (a.price != null && Number.isFinite(Number(a.price))) return `$${Number(a.price).toFixed(2)}/mo (portfolio model)`;
  return 'Varies / not set';
}
function getFeatureListForApp(a) {
  const row = APP_FEATURE_CATALOG[a.id];
  if (row && Array.isArray(row.features) && row.features.length) return row.features;
  return [`Core: ${a.desc}`, 'Add bullets to APP_FEATURE_CATALOG in BVS_Dashboard_v2_1.html'];
}
function renderFeatureCatalog() {
  const body = $('featuresCatalogBody');
  const meta = $('featuresCatalogMeta');
  if (!body) return;
  const q = ($('featuresSearchInput')?.value || '').trim().toLowerCase();
  const list = [...APPS].sort((a, b) => a.id - b.id).filter(a => {
    if (!q) return true;
    const hay = [
      a.name, a.desc, a.cat, catalogPriceLabel(a), a.url || '', a.prodUrl || '', a.storeUrl || '',
      a.repo || '', a.testflightUrl || '',
      ...getFeatureListForApp(a),
    ].join('\n').toLowerCase();
    return hay.includes(q);
  });
  body.innerHTML = list.map(a => {
    const feats = getFeatureListForApp(a);
    const linkBits = [];
    const pUrl = getAppProdUrl(a);
    const sUrl = getAppStoreUrl(a);
    if (pUrl) linkBits.push(`<a class="feat-link no-print" href="${pUrl}" target="_blank" rel="noopener">Site ↗</a>`);
    if (sUrl) linkBits.push(`<a class="feat-link no-print" href="${sUrl}" target="_blank" rel="noopener">App Store ↗</a>`);
    if (a.testflightUrl) linkBits.push(`<a class="feat-link no-print" href="${a.testflightUrl}" target="_blank" rel="noopener">TestFlight beta ↗</a>`);
    const gh = githubRepoHref(a.repo);
    if (gh) linkBits.push(`<a class="feat-link no-print" href="${gh}" target="_blank" rel="noopener">GitHub ↗</a>`);
    const urlLine = linkBits.length ? linkBits.join(' <span class="feat-card-meta">·</span> ') : '<span class="feat-card-meta">No links in portfolio</span>';
    const li = feats.map(f => `<li>${String(f).replace(/</g, '&lt;')}</li>`).join('');
    return `<div class="feat-card" data-app-id="${a.id}">
      <div class="feat-card-head">
        <div><span class="feat-card-title">${a.name}</span> <span class="feat-card-meta">· ${a.cat} · ${a.status}</span></div>
        <div class="feat-card-meta">${catalogPriceLabel(a)}</div>
      </div>
      <div class="feat-card-desc">${a.desc}</div>
      <div class="no-print" style="margin-bottom:8px;">${urlLine}</div>
      <ul class="feat-list">${li}</ul>
    </div>`;
  }).join('');
  if (meta) meta.textContent = q ? `${list.length} app(s) match filter · ${APPS.length} total` : `${APPS.length} apps · Bradley Virtual Solutions — ${new Date().toLocaleDateString()}`;
}
function printFeatureCatalog() {
  const tabBtn = Array.from(document.querySelectorAll('.tab')).find(t => /Features/i.test(t.textContent || ''));
  const panel = $('panel-features');
  const already = panel && panel.classList.contains('active');
  if (!already && tabBtn) tabBtn.click();
  setTimeout(() => window.print(), already ? 0 : 200);
}
function downloadFeatureCatalogMd() {
  const lines = [
    '# BradleyVS App Feature Catalog',
    '',
    `_Generated ${new Date().toISOString().slice(0, 10)} · ${APPS.length} apps_`,
    '',
    '> Source of truth: `APP_FEATURE_CATALOG` + `APPS` in `js/bvs-dashboard.js`. Edit there to update this export.',
    '',
  ];
  [...APPS].sort((a, b) => a.id - b.id).forEach(a => {
    lines.push(`## ${a.name} (#${a.id})`);
    lines.push('');
    lines.push(`- **Category:** ${a.cat}`);
    lines.push(`- **Status:** ${a.status}`);
    lines.push(`- **Portfolio price:** ${catalogPriceLabel(a)}`);
    lines.push(`- **Site / prod URL:** ${getAppProdUrl(a) || '—'}`);
    lines.push(`- **App Store:** ${getAppStoreUrl(a) || '—'}`);
    lines.push(`- **TestFlight:** ${a.testflightUrl || '—'}`);
    lines.push(`- **GitHub:** ${githubRepoHref(a.repo) || '—'}`);
    lines.push(`- **Legacy url field:** ${a.url || '—'}`);
    lines.push(`- **Summary:** ${a.desc}`);
    lines.push('');
    getFeatureListForApp(a).forEach(f => lines.push(`- ${f}`));
    lines.push('');
  });
  const blob = new Blob([lines.join('\n')], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `BVS_App_Features_${new Date().toISOString().slice(0, 10)}.md`;
  a.click();
  URL.revokeObjectURL(url);
}

// ── TABS ──────────────────────────────────────────────────────────────────────
function showTab(id, btn) {
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  $('panel-'+id).classList.add('active');
  btn.classList.add('active');
  if (id==='revenue') renderRevenue();
  if (id==='expenses') renderExpenses();
  if (id==='marketing') renderMarketing();
  if (id==='versions') renderVersionsPanel();
  if (id==='roadmap') renderRoadmap();
  if (id==='features') renderFeatureCatalog();
  if (id==='admin') {
    syncAdminGate();
    if (isAdminAuthenticated()) renderAdminPanel();
  }
  setTimeout(animateFadeIns, 50);
}

// ── KPI + GOAL ────────────────────────────────────────────────────────────────
function updateAll() {
  const rev = calcRevenue();
  const exp = calcExpenses();
  const goal = parseFloat($('goalInput')?.value) || 5000;
  const pct = Math.min((rev/goal*100),100).toFixed(1);
  const alerts = APPS.filter(a => isOverdue(a.maintOffset)).length;

  $('kpiSubs').textContent = Object.values(state.subs).reduce((s,v)=>s+(v||0),0);
  $('kpiMonthly').textContent = rev >= 1000 ? `$${(rev/1000).toFixed(1)}K` : `$${rev.toFixed(0)}`;
  $('kpiAlerts').textContent = alerts;
  ['goalCurrentDisplay','revBannerTotal'].forEach(id => { const el=$(id); if(el) el.textContent=fmt(rev); });
  ['revBannerAnnual'].forEach(id => { const el=$(id); if(el) el.textContent=fmt(rev*12); });
  ['revBannerNet'].forEach(id => { const el=$(id); if(el) el.textContent=fmt(rev*12*0.97); });

  // Goal bars
  ['goalBar','revGoalBar'].forEach(id => { const el=$(id); if(el) el.style.width=pct+'%'; });
  const gp = $('goalPct'); if(gp) gp.textContent = `${fmt(rev)} of ${fmt(goal)} goal · ${pct}% achieved`;
  const rgp = $('revGoalPct'); if(rgp) rgp.textContent = `${pct}% of monthly goal`;

  // Expenses
  const te = $('totalExpenses'); if(te) te.textContent = fmt(exp);
  const np = $('netProfit'); if(np) { np.textContent = fmt(rev-exp); np.style.color = (rev-exp)>=0 ? 'var(--green)':'var(--red)'; }
}

function updateGoal() {
  if (!canEditPortfolio()) return;
  updateAll();
  showSave();
}

// ── APPS TABLE ────────────────────────────────────────────────────────────────
/** Portfolio table “Link” column: site, App Store, TestFlight, GitHub (optional). */
function portfolioLinkCellHtml(a) {
  const parts = [];
  const prod = getAppProdUrl(a);
  const store = getAppStoreUrl(a);
  if (prod) parts.push(`<a href="${prod}" target="_blank" rel="noopener" class="link-btn">↗ Site</a>`);
  if (store) parts.push(`<a href="${store}" target="_blank" rel="noopener" class="link-btn">🏪 App Store</a>`);
  if (a.testflightUrl) parts.push(`<a href="${a.testflightUrl}" target="_blank" rel="noopener" class="link-btn">✈ TestFlight</a>`);
  const gh = githubRepoHref(a.repo);
  if (gh) parts.push(`<a href="${gh}" target="_blank" rel="noopener" class="link-btn">⌂ GitHub</a>`);
  if (parts.length) return `<div class="link-cell">${parts.join('')}</div>`;
  return `<span style="color:var(--text3);font-size:0.72rem">—</span>`;
}

function renderApps() {
  const canEdit = canEditPortfolio();
  const pub = isPublicPortfolioView();
  const headRow = document.querySelector('#appsTable thead tr');
  if (headRow) headRow.innerHTML = pub ? APPS_TABLE_HEAD_PUBLIC : APPS_TABLE_HEAD_FULL;

  const search = ($('searchInput')?.value||'').toLowerCase();
  let list = APPS.filter(a => {
    const mf = currentFilter==='all' || (currentFilter==='live'&&a.status==='live') ||
               (currentFilter==='maint'&&a.status==='maint') ||
               (currentFilter==='alert'&&isOverdue(a.maintOffset));
    const ms = !search || a.name.toLowerCase().includes(search) || a.desc.toLowerCase().includes(search) || a.cat.toLowerCase().includes(search)
      || String(a.testflightUrl || '').toLowerCase().includes(search)
      || String(a.repo || '').toLowerCase().includes(search)
      || String(a.storeUrl || '').toLowerCase().includes(search);
    return mf && ms;
  });
  list.sort((a,b) => {
    let va,vb;
    if(sortCol===0){va=a.id;vb=b.id;}
    else if(sortCol===1){va=a.name;vb=b.name;}
    else if(sortCol===4){va=a.price!=null&&Number.isFinite(Number(a.price))?Number(a.price):0;vb=b.price!=null&&Number.isFinite(Number(b.price))?Number(b.price):0;}
    else return 0;
    return sortAsc?(va>vb?1:-1):(va<vb?1:-1);
  });

  $('appsBody').innerHTML = list.map(a => {
    const overdue = isOverdue(a.maintOffset);
    const subs = state.subs[a.id]||0;
    const rev = a.price!=null&&Number.isFinite(Number(a.price))&&subs ? Number(a.price)*subs : 0;
    const rating = state.ratings[a.id]||0;
    const note = state.notes[a.id]||'';
    const statusClsCol = overdue ? 'status-alert' : a.status==='live' ? 'status-live' : a.status==='coming' ? 'status-coming-badge' : 'status-maint';
    const statusCls = overdue ? 'status-alert' : a.status==='live' ? 'status-live' : a.status==='coming' ? 'status-coming' : 'status-maint';
    const statusTxt = overdue ? '⚠ OVERDUE' : a.status==='live' ? '● Live' : a.status==='coming' ? '🚀 Coming Soon' : '● Maint.';
    const priCls = {Critical:'pri-critical',High:'pri-high',Medium:'pri-medium',Low:'pri-low'}[a.pri]||'pri-low';
    const priLabel = {Critical:'🔴 Critical',High:'🔵 High',Medium:'🟢 Medium',Low:'⚪ Low'}[a.pri]||a.pri;
    const maintD = getMaintDate(a.maintOffset);
    const maintStr = formatDate(maintD);
    const maintCls = overdue ? 'maint-overdue' : 'maint-ok';
    const starWrapCls = canEdit ? 'rating-stars' : 'rating-stars rating-stars--readonly';
    const stars = [1,2,3,4,5].map(s=>
      `<span class="star ${s<=rating?'filled':''}"${canEdit?` onclick="setRating(${a.id},${s})"`:""}>★</span>`).join('');

    if (pub) {
      return `<tr data-id="${a.id}" class="${overdue?'alert-row':''}">
      <td style="color:var(--text3);font-family:'DM Mono',monospace;font-size:0.78rem">${a.id}</td>
      <td><div class="app-name">${a.name}</div><div class="app-desc">${a.desc}</div></td>
      <td><span class="status-badge ${statusClsCol}" title="Public portfolio">${statusTxt}</span></td>
      <td style="font-size:0.78rem;color:var(--text2)">${a.cat}</td>
      <td>${portfolioLinkCellHtml(a)}</td>
    </tr>`;
    }

    const statusCell = canEdit
      ? `<select class="inline-select status-select ${statusCls}" onchange="updateStatus(${a.id},this.value)">
          <option value="live" ${a.status==='live'?'selected':''}>✅ Live</option>
          <option value="maint" ${a.status==='maint'?'selected':''}>🔧 Maint.</option>
          <option value="coming" ${a.status==='coming'?'selected':''}>🚀 Coming Soon</option>
        </select>`
      : `<span class="status-badge ${statusClsCol}" title="View only — sign in via Admin">${statusTxt}</span>`;
    const subsCell = canEdit
      ? `<input class="subs-input" type="number" min="0" value="${subs}" onchange="setSubs(${a.id},this.value)">`
      : `<span style="font-family:'DM Mono',monospace;font-size:0.78rem;color:var(--text2)" title="View only">${subs}</span>`;
    const priCell = canEdit
      ? `<select class="inline-select pri-select" onchange="updatePriority(${a.id},this.value)">
          <option value="Critical" ${a.pri==='Critical'?'selected':''}>🔴 Critical</option>
          <option value="High"     ${a.pri==='High'    ?'selected':''}>🔵 High</option>
          <option value="Medium"   ${a.pri==='Medium'  ?'selected':''}>🟢 Medium</option>
          <option value="Low"      ${a.pri==='Low'     ?'selected':''}>⚪ Low</option>
        </select>`
      : `<span class="priority-badge ${priCls}" style="font-size:0.72rem">${priLabel}</span>`;
    const hasPrice = a.price != null && Number.isFinite(Number(a.price));
    const priceCell = canEdit
      ? `<input class="subs-input price-input" type="number" step="0.01" min="0" placeholder="—" title="Monthly $ / sub · leave empty for Varies" value="${hasPrice ? Number(a.price) : ''}" onchange="setAppPrice(${a.id},this.value)">`
      : (hasPrice ? `<span class="price-val">$${Number(a.price).toFixed(2)}</span>` : `<span class="price-none">Varies</span>`);
    return `<tr data-id="${a.id}" class="${overdue?'alert-row':''}">
      <td style="color:var(--text3);font-family:'DM Mono',monospace;font-size:0.78rem">${a.id}</td>
      <td><div class="app-name">${a.name}</div><div class="app-desc">${a.desc}</div></td>
      <td>${statusCell}</td>
      <td style="font-size:0.78rem;color:var(--text2)">${a.cat}</td>
      <td>${priceCell}</td>
      <td>${subsCell}</td>
      <td id="rev-${a.id}">${rev>0?`<span class="rev-calc">${fmt(rev)}</span>`:`<span style="color:var(--text3)">—</span>`}</td>
      <td><div class="${starWrapCls}">${stars}</div></td>
      <td>${priCell}</td>
      <td><button type="button" class="notes-btn ${note?'has-note':''}" onclick="openNote(${a.id})" title="${canEdit?(note?'Edit note':'Add note'):'View note (read-only)'}">${note?(canEdit?'📝':'📝 View'):(canEdit?'+ Note':'—')}</button></td>
      <td>${portfolioLinkCellHtml(a)}</td>
      <td><span class="maint-date ${maintCls}">${maintStr}</span></td>
    </tr>`;
  }).join('');
}

function updateStatus(id, val) {
  if (!canEditPortfolio()) return;
  const app = APPS.find(a => a.id === id);
  if (app) { app.status = val; showSave(); renderApps(); if (isAdminAuthenticated()) renderAdminPanel(); }
}

function updatePriority(id, val) {
  if (!canEditPortfolio()) return;
  const app = APPS.find(a => a.id === id);
  if (app) { app.pri = val; showSave(); renderApps(); if (isAdminAuthenticated()) renderAdminPanel(); }
}

function setSubs(id,val) {
  if (!canEditPortfolio()) return;
  state.subs[id] = parseInt(val)||0;
  const a = APPS.find(x=>x.id===id);
  const rev = a&&a.price!=null&&Number.isFinite(Number(a.price))&&state.subs[id] ? Number(a.price)*state.subs[id] : 0;
  const cell = $('rev-'+id);
  if(cell) cell.innerHTML = rev>0 ? `<span class="rev-calc">${fmt(rev)}</span>` : `<span style="color:var(--text3)">—</span>`;
  updateAll(); showSave();
  if (isAdminAuthenticated()) renderAdminPanel();
}

function setAppPrice(id, val) {
  if (!canEditPortfolio()) return;
  const app = APPS.find(a => a.id === id);
  if (!app) return;
  const s = String(val ?? '').trim();
  if (s === '') {
    app.price = null;
  } else {
    const n = parseFloat(s.replace(/,/g, ''));
    if (!Number.isFinite(n) || n < 0) return;
    app.price = Math.round(n * 100) / 100;
  }
  const subs = state.subs[id]||0;
  const rev = app.price != null && Number.isFinite(Number(app.price)) && subs ? Number(app.price) * subs : 0;
  const cell = $('rev-'+id);
  if (cell) cell.innerHTML = rev > 0 ? `<span class="rev-calc">${fmt(rev)}</span>` : `<span style="color:var(--text3)">—</span>`;
  updateAll();
  showSave();
  renderApps();
  if (isAdminAuthenticated()) renderAdminPanel();
}

function setRating(id,val) {
  if (!canEditPortfolio()) return;
  state.ratings[id] = val;
  renderApps(); showSave();
  if (isAdminAuthenticated()) renderAdminPanel();
}

function setFilter(f,btn) {
  currentFilter=f;
  document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  renderApps();
}

function sortTable(col) {
  if(sortCol===col) sortAsc=!sortAsc; else{sortCol=col;sortAsc=true;}
  renderApps();
}

// ── NOTES MODAL ───────────────────────────────────────────────────────────────
function openNote(id) {
  modalAppId = id;
  const app = APPS.find(a=>a.id===id);
  const ed = canEditPortfolio();
  $('modalTitle').textContent = (ed?'📝 Notes':'👁️ Notes (view only)') + ` — ${app.name}`;
  const ta = $('modalTextarea');
  if (ta) {
    ta.value = state.notes[id]||'';
    ta.readOnly = !ed;
  }
  const saveBtn = $('modalSaveNoteBtn');
  if (saveBtn) {
    saveBtn.style.display = ed ? '' : 'none';
    saveBtn.disabled = !ed;
  }
  $('notesModal').classList.add('open');
}
function closeModal() { $('notesModal').classList.remove('open'); }
function saveNote() {
  if (!canEditPortfolio()) return;
  if(modalAppId) { state.notes[modalAppId]=$('modalTextarea').value; renderApps(); showSave(); if (isAdminAuthenticated()) renderAdminPanel(); }
  closeModal();
}
$('notesModal').addEventListener('click', e => { if(e.target===$('notesModal')) closeModal(); });

// ── EXPORT CSV ────────────────────────────────────────────────────────────────
function exportCSV() {
  if (!canEditPortfolio()) {
    alert('Admin sign-in required. Open the 🔐 Admin tab and unlock to export.');
    return;
  }
  const headers = ['ID','App Name','Description','Category','Status','Price/mo','Subscribers','Monthly Revenue','Rating','Priority','Notes','Next Maintenance'];
  const rows = APPS.map(a => {
    const subs = state.subs[a.id]||0;
    const p = a.price != null && Number.isFinite(Number(a.price)) ? Number(a.price) : null;
    const rev = p != null && subs ? (p*subs).toFixed(2) : '0.00';
    const priceCol = p != null ? p : 'Varies';
    const maint = formatDate(getMaintDate(a.maintOffset));
    return [a.id, `"${a.name}"`, `"${a.desc}"`, a.cat, a.status, priceCol, subs, rev, state.ratings[a.id]||0, a.pri, `"${(state.notes[a.id]||'').replace(/"/g,"'")}"`, maint];
  });
  const csv = [headers, ...rows].map(r=>r.join(',')).join('\n');
  const blob = new Blob([csv],{type:'text/csv'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href=url; a.download='BVS_App_Portfolio.csv'; a.click();
  URL.revokeObjectURL(url);
}

// ── REVENUE TAB ───────────────────────────────────────────────────────────────
function renderRevenue() {
  const priced = a => a.price != null && Number.isFinite(Number(a.price));
  const maxRev = Math.max(...APPS.filter(priced).map(a=>Number(a.price)*10), 1);
  const sorted = [...APPS].filter(priced).sort((a,b)=>(Number(b.price)*(state.subs[b.id]||0))-(Number(a.price)*(state.subs[a.id]||0)));
  $('revenueBreakdown').innerHTML = sorted.map(a => {
    const mp = Number(a.price);
    const rev = mp*(state.subs[a.id]||0);
    const pot = mp*10;
    return `<div style="display:flex;align-items:center;gap:1rem;padding:0.75rem 1rem;background:var(--surface);border:1px solid var(--border);border-radius:10px;">
      <div style="width:170px;font-size:0.8rem;font-weight:600;flex-shrink:0">${a.name}</div>
      <div style="flex:1">
        <div style="height:5px;background:var(--border);border-radius:3px;overflow:hidden;margin-bottom:3px">
          <div style="height:100%;width:${Math.min(rev/maxRev*100,100)}%;background:linear-gradient(90deg,var(--accent),var(--green));border-radius:3px;transition:width 0.5s"></div>
        </div>
        <div style="height:5px;background:var(--border);border-radius:3px;overflow:hidden;opacity:0.35">
          <div style="height:100%;width:${Math.min(pot/maxRev*100,100)}%;background:var(--text3);border-radius:3px"></div>
        </div>
      </div>
      <div style="text-align:right;flex-shrink:0">
        <div style="font-family:'DM Mono',monospace;font-size:0.82rem;color:${rev>0?'var(--green)':'var(--text3)'}">${fmt(rev)}/mo</div>
        <div style="font-size:0.68rem;color:var(--text3)">pot: ${fmt(pot)}</div>
      </div>
    </div>`;
  }).join('');

  const months = ['Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb'];
  const cur = calcRevenue();
  const growth = APPS.filter(a => a.price != null && Number.isFinite(Number(a.price))).length * 10;
  $('monthlyProjections').innerHTML = months.map((m,i) => {
    const proj = cur + i*growth;
    return `<div class="tracker-card">
      <div style="font-size:0.72rem;color:var(--text3);font-family:'DM Mono',monospace;text-transform:uppercase">${m} ${i>=10?'2027':'2026'}</div>
      <div class="tracker-total">${proj>=1000?'$'+(proj/1000).toFixed(1)+'K':'$'+proj.toFixed(0)}</div>
      <div style="font-size:0.72rem;color:var(--text3)">${i>0?`+${fmt(i*growth)} projected`:'Current baseline'}</div>
      <div class="progress-bar-wrap"><div class="progress-bar" style="width:${Math.min(proj/55000*100,100)}%"></div></div>
    </div>`;
  }).join('');
  updateAll();
}

// ── EXPENSES ──────────────────────────────────────────────────────────────────
function renderExpenses() {
  const canEdit = canEditPortfolio();
  $('expenseCards').innerHTML = APPS.map(a => {
    const e = state.expenses[a.id]||{hosting:'',domain:'',other:''};
    const total = (parseFloat(e.hosting)||0)+(parseFloat(e.domain)||0)+(parseFloat(e.other)||0);
    const mp = a.price != null && Number.isFinite(Number(a.price)) ? Number(a.price) : null;
    const rev = mp != null && state.subs[a.id] ? mp*state.subs[a.id] : 0;
    const profit = rev - total;
    const exAttr = canEdit ? `oninput="setExpense(${a.id},'hosting',this.value)"` : 'disabled';
    const exAttr2 = canEdit ? `oninput="setExpense(${a.id},'domain',this.value)"` : 'disabled';
    const exAttr3 = canEdit ? `oninput="setExpense(${a.id},'other',this.value)"` : 'disabled';
    return `<div class="card">
      <div class="card-header">
        <div class="card-name">${a.name}</div>
        <span class="status-badge ${a.status==='live'?'status-live':'status-maint'}" style="font-size:0.65rem">${a.status==='live'?'Live':'Maint.'}</span>
      </div>
      <div class="card-label">Hosting/mo ($)</div>
      <input class="card-input" type="number" placeholder="0.00" value="${e.hosting}" ${exAttr}>
      <div class="card-label">Domain/yr ($)</div>
      <input class="card-input" type="number" placeholder="0.00" value="${e.domain}" ${exAttr2}>
      <div class="card-label">Other/mo ($)</div>
      <input class="card-input" type="number" placeholder="0.00" value="${e.other}" ${exAttr3}>
      <div style="display:flex;justify-content:space-between;margin-top:10px;padding-top:10px;border-top:1px solid var(--border);">
        <div><div style="font-size:0.68rem;color:var(--text3)">Costs</div><div class="expense-total">-${fmt(total)}</div></div>
        <div style="text-align:right"><div style="font-size:0.68rem;color:var(--text3)">Profit</div><div class="profit-val" style="color:${profit>=0?'var(--green)':'var(--red)'}">${fmt(profit)}</div></div>
      </div>
    </div>`;
  }).join('');
}

function setExpense(id,field,val) {
  if (!canEditPortfolio()) return;
  if(!state.expenses[id]) state.expenses[id]={hosting:'',domain:'',other:''};
  state.expenses[id][field]=val;
  updateAll(); showSave();
  // refresh totals in expense cards without full re-render
  const e = state.expenses[id];
  const total=(parseFloat(e.hosting)||0)+(parseFloat(e.domain)||0)+(parseFloat(e.other)||0);
  const a=APPS.find(x=>x.id===id);
  const mp=a&&a.price!=null&&Number.isFinite(Number(a.price))?Number(a.price):null;
  const rev=mp!=null&&state.subs[id]?mp*state.subs[id]:0;
  const profit=rev-total;
}

// ── MARKETING ─────────────────────────────────────────────────────────────────
function renderMarketing() {
  const canEdit = canEditPortfolio();
  $('marketingCards').innerHTML = APPS.map(a => {
    const m = state.marketing[a.id]||{downloads:'',instagram:'',twitter:'',tiktok:''};
    const mk1 = canEdit ? `oninput="setMarketing(${a.id},'downloads',this.value)"` : 'disabled';
    const mk2 = canEdit ? `oninput="setMarketing(${a.id},'instagram',this.value)"` : 'disabled';
    const mk3 = canEdit ? `oninput="setMarketing(${a.id},'twitter',this.value)"` : 'disabled';
    const mk4 = canEdit ? `oninput="setMarketing(${a.id},'tiktok',this.value)"` : 'disabled';
    return `<div class="card">
      <div class="card-header">
        <div class="card-name">${a.name}</div>
        <span style="font-size:0.7rem;color:var(--text3)">${a.cat}</span>
      </div>
      <div class="card-label">Downloads / Installs</div>
      <input class="card-input" type="number" placeholder="0" value="${m.downloads}" ${mk1}>
      <div class="card-label">Instagram Followers</div>
      <input class="card-input" type="number" placeholder="0" value="${m.instagram}" ${mk2}>
      <div class="card-label">Twitter / X Followers</div>
      <input class="card-input" type="number" placeholder="0" value="${m.twitter}" ${mk3}>
      <div class="card-label">TikTok Followers</div>
      <input class="card-input" type="number" placeholder="0" value="${m.tiktok}" ${mk4}>
      <div style="margin-top:10px;padding-top:10px;border-top:1px solid var(--border);font-size:0.72rem;color:var(--text3);">
        Total reach: <span style="color:var(--accent);font-family:'DM Mono',monospace;font-weight:600">${((parseInt(m.instagram)||0)+(parseInt(m.twitter)||0)+(parseInt(m.tiktok)||0)).toLocaleString()}</span>
      </div>
    </div>`;
  }).join('');
}

function setMarketing(id,field,val) {
  if (!canEditPortfolio()) return;
  if(!state.marketing[id]) state.marketing[id]={downloads:'',instagram:'',twitter:'',tiktok:''};
  state.marketing[id][field]=val; showSave();
}

// ── VERSIONS ──────────────────────────────────────────────────────────────────
function renderVersionsPanel() {
  const sel = $('verAppSelect');
  if(!sel.options.length) {
    APPS.forEach(a => { const o=document.createElement('option'); o.value=a.id; o.textContent=a.name; sel.appendChild(o); });
  }
  renderVersions();
}

function renderVersions() {
  const appId = parseInt($('verAppSelect')?.value);
  const list = state.versions.filter(v=>v.appId===appId).sort((a,b)=>b.ts-a.ts);
  const emptyHint = canEditPortfolio()
    ? 'No version history yet. Add your first entry above.'
    : 'No version history yet. Sign in via Admin to add entries.';
  $('versionList').innerHTML = list.length ? list.map(v => `
    <div class="ver-item">
      <span class="ver-badge">${v.ver}</span>
      <div class="ver-text">${v.notes||'—'}</div>
      <div class="ver-date">${new Date(v.ts).toLocaleDateString()}</div>
    </div>`).join('') :
    `<div style="color:var(--text3);font-size:0.85rem;padding:1rem;">${emptyHint}</div>`;
}

function addVersion() {
  if (!canEditPortfolio()) return;
  const appId = parseInt($('verAppSelect')?.value);
  const ver = $('verNum').value.trim();
  const notes = $('verNotes').value.trim();
  if(!ver) return;
  state.versions.push({appId, ver, notes, ts:Date.now()});
  $('verNum').value=''; $('verNotes').value='';
  renderVersions(); showSave();
}

// ── ROADMAP ───────────────────────────────────────────────────────────────────
function renderRoadmap() {
  const roadmap = [
    {id:27,blocker:"Next: Wire standalone Vercel project to GitHub auto-deploy · Real Stripe (Checkout Session + webhook on server) · Optional PWA manifest · Multi-tenant API + DB (Phase B in SAAS_ARCHITECTURE.md)",launch:"Q2 2026",effort:"High"},
    {id:28,blocker:"Next: Same SaaS path as BarberBook · Server-side Twilio/SendGrid (never expose API secrets in SPA) · Optional Redis/session hardening for /api/bvs-auth pattern",launch:"Q2 2026",effort:"High"},
    {id:12,blocker:"Fix connection error",launch:"Apr 2026",effort:"Medium"},
    {id:9, blocker:"Complete AI builder",  launch:"Apr 2026",effort:"High"},
    {id:22,blocker:"Submit to App Store",  launch:"May 2026",effort:"High"},
    {id:21,blocker:"Complete app build",   launch:"May 2026",effort:"High"},
    {id:11,blocker:"Test all features",    launch:"Jun 2026",effort:"High"},
    {id:20,blocker:"Fix maintenance issues",launch:"May 2026",effort:"Low"},
    {id:26,blocker:"Fix maintenance issues",launch:"Jun 2026",effort:"Low"},
    {id:23,blocker:"Publish on Roblox",    launch:"Jul 2026",effort:"Low"},
  ];
  const effortColor = {High:'var(--red)',Medium:'var(--yellow)',Low:'var(--green)'};
  $('roadmapList').innerHTML = roadmap.map((rd,i) => {
    const a = APPS.find(x=>x.id===rd.id);
    if(!a) return '';
    const priColor={Critical:'var(--red)',High:'var(--orange)',Medium:'var(--yellow)',Low:'var(--text3)'}[a.pri];
    return `<div class="roadmap-item">
      <div class="roadmap-num">${i+1}</div>
      <div>
        <div class="roadmap-name">${a.name}</div>
        <div class="roadmap-meta">🔧 ${rd.blocker} · Effort: <span style="color:${effortColor[rd.effort]}">${rd.effort}</span> · <span style="color:${priColor}">${a.pri}</span></div>
      </div>
      <div class="roadmap-price">${a.price!=null&&Number.isFinite(Number(a.price))?`$${Number(a.price).toFixed(2)}/mo`:'Variable'}</div>
      <div class="roadmap-launch">🗓 ${rd.launch}</div>
    </div>`;
  }).join('');

  const platforms=[
    {icon:"🌐",name:"Web (Firebase/Vercel)",count:16,fee:"~3% Stripe",color:"var(--accent)"},
    {icon:"🍎",name:"Apple App Store",       count:5, fee:"30%",       color:"var(--text2)"},
    {icon:"🎮",name:"Roblox",                count:1, fee:"~30% Robux",color:"var(--purple)"},
    {icon:"📸",name:"Event-Based",           count:1, fee:"Varies",    color:"var(--yellow)"},
    {icon:"🌿",name:"GitHub Pages",          count:2, fee:"Free",      color:"var(--green)"},
    {icon:"📱",name:"TestFlight (pending)",  count:2, fee:"30% after", color:"var(--orange)"},
  ];
  $('platformGrid').innerHTML = platforms.map(p=>`
    <div class="tracker-card">
      <div style="font-size:1.4rem">${p.icon}</div>
      <div style="font-family:'Syne',sans-serif;font-size:1.4rem;font-weight:800;color:${p.color};margin:5px 0">${p.count} App${p.count!==1?'s':''}</div>
      <div style="font-weight:600;font-size:0.88rem">${p.name}</div>
      <div style="font-size:0.72rem;color:var(--text3);margin-top:4px;font-family:'DM Mono',monospace">Fee: ${p.fee}</div>
    </div>`).join('');
}

// ── FADE INS ──────────────────────────────────────────────────────────────────
function animateFadeIns() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target);} });
  },{threshold:0.05});
  document.querySelectorAll('.fade-in:not(.visible)').forEach(el=>obs.observe(el));
}

// ── INIT ──────────────────────────────────────────────────────────────────────

// ── ADMIN FUNCTIONS ───────────────────────────────────────────────────────────
function escHtmlText(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function adminDailyLogDateKey() {
  const el = $('adminDailyLogDate');
  let d = el && el.value ? String(el.value).trim() : '';
  if (!/^\d{4}-\d{2}-\d{2}$/.test(d)) {
    d = new Date().toISOString().slice(0, 10);
    if (el) el.value = d;
  }
  return d;
}

function setAdminDailyLogDateToday() {
  const el = $('adminDailyLogDate');
  if (el) el.value = new Date().toISOString().slice(0, 10);
  renderAdminPanel();
}

function clearAdminDailyLogForSelectedDate() {
  if (!canEditPortfolio()) return;
  const dk = adminDailyLogDateKey();
  if (!state.dailyBlurbs[dk] || Object.keys(state.dailyBlurbs[dk]).length === 0) {
    alert('No entries for this date.');
    return;
  }
  if (!confirm(`Clear all work-log blurbs for ${dk}?`)) return;
  delete state.dailyBlurbs[dk];
  renderAdminPanel();
  showSave();
}

let _bvsDailyBlurbSaveT = null;
function onDailyBlurbInput(appId, textareaEl) {
  if (!canEditPortfolio()) return;
  const dateKey = adminDailyLogDateKey();
  if (!state.dailyBlurbs[dateKey]) state.dailyBlurbs[dateKey] = {};
  const raw = textareaEl.value;
  const t = String(raw || '').trim();
  if (!t) {
    delete state.dailyBlurbs[dateKey][appId];
  } else {
    state.dailyBlurbs[dateKey][appId] = raw;
  }
  if (Object.keys(state.dailyBlurbs[dateKey]).length === 0) delete state.dailyBlurbs[dateKey];
  if (_bvsDailyBlurbSaveT) clearTimeout(_bvsDailyBlurbSaveT);
  _bvsDailyBlurbSaveT = setTimeout(() => { showSave(); _bvsDailyBlurbSaveT = null; }, 550);
}

function onDailyBlurbBlur() {
  if (_bvsDailyBlurbSaveT) {
    clearTimeout(_bvsDailyBlurbSaveT);
    _bvsDailyBlurbSaveT = null;
  }
  if (canEditPortfolio()) showSave();
}

function renderAdminPanel() {
  const live  = APPS.filter(a=>a.status==='live').length;
  const maint = APPS.filter(a=>a.status==='maint').length;
  const rev   = calcRevenue();
  const rated = Object.keys(state.ratings).filter(k=>state.ratings[k]>0).length;
  const alerts= APPS.filter(a=>isOverdue(a.maintOffset)).length;

  const set = (id,v) => { const el=$(id); if(el) el.textContent=v; };
  set('admin-total-apps', APPS.length);
  set('admin-live',  live);
  set('admin-maint', maint);
  set('admin-rev',   rev>=1000?`$${(rev/1000).toFixed(1)}K`:`$${rev.toFixed(0)}`);
  set('admin-rated', rated);
  set('admin-alerts',alerts);

  // Portfolio health score
  /** Live apps with a $/mo number in the table — for goal/scenario math only, not “actually billing”. */
  const listPricedLive = APPS.filter(a=>a.price!=null&&Number.isFinite(Number(a.price))&&a.status==='live').length;
  const withSubs  = APPS.filter(a=>(state.subs[a.id]||0)>0).length;
  const score = Math.round(
    (live/APPS.length)*30 +
    (listPricedLive/APPS.length)*30 +
    (withSubs/Math.max(listPricedLive,1))*25 +
    (rated/APPS.length)*15
  );
  const hs = $('healthScore'); if(hs) hs.textContent = score + '/100';
  const hb = $('healthBar');   if(hb) hb.style.width = score + '%';
  const hd = $('healthDetail');
  if(hd) hd.textContent = `${live} live · ${listPricedLive} with list $/mo (model) · ${withSubs} modeled subs · ${rated} rated`;

  // Maintenance schedule
  const ml = $('adminMaintList');
  if(ml) {
    const upcoming = APPS
      .filter(a=>a.maintOffset)
      .map(a=>({name:a.name, date:getMaintDate(a.maintOffset), overdue:isOverdue(a.maintOffset)}))
      .sort((a,b)=>a.date-b.date)
      .slice(0,6);
    ml.innerHTML = upcoming.map(a=>`
      <div style="display:flex;justify-content:space-between;padding:4px 0;border-bottom:1px solid var(--border);">
        <span style="font-size:0.78rem;color:${a.overdue?'var(--red)':'var(--text2)'}">${a.overdue?'⚠️ ':''}${a.name.substring(0,20)}</span>
        <span style="font-size:0.72rem;font-family:'DM Mono',monospace;color:${a.overdue?'var(--red)':'var(--text3)'}">${formatDate(a.date)}</span>
      </div>`).join('') || '<div style="color:var(--text3);font-size:0.8rem;">No upcoming maintenance</div>';
  }

  // Admin apps table
  const ab = $('adminAppsBody');
  if(ab) {
    ab.innerHTML = APPS.map(a=>{
      const subs = state.subs[a.id]||0;
      const hasP = a.price != null && Number.isFinite(Number(a.price));
      const rev  = hasP && subs ? Number(a.price)*subs : 0;
      const note = state.notes[a.id]||'';
      const rating = state.ratings[a.id]||0;
      return `<tr>
        <td style="color:var(--text3);font-size:0.75rem;font-family:'DM Mono',monospace">${a.id}</td>
        <td style="font-weight:600;font-size:0.82rem">${a.name}</td>
        <td>
          <select class="inline-select status-select status-${a.status}" onchange="updateStatus(${a.id},this.value);renderAdminPanel()">
            <option value="live"   ${a.status==='live'  ?'selected':''}>✅ Live</option>
            <option value="maint"  ${a.status==='maint' ?'selected':''}>🔧 Maint.</option>
            <option value="coming" ${a.status==='coming'?'selected':''}>🚀 Coming</option>
          </select>
        </td>
        <td>
          <select class="inline-select pri-select" onchange="updatePriority(${a.id},this.value);renderAdminPanel()">
            <option value="Critical" ${a.pri==='Critical'?'selected':''}>🔴 Critical</option>
            <option value="High"     ${a.pri==='High'    ?'selected':''}>🔵 High</option>
            <option value="Medium"   ${a.pri==='Medium'  ?'selected':''}>🟢 Medium</option>
            <option value="Low"      ${a.pri==='Low'     ?'selected':''}>⚪ Low</option>
          </select>
        </td>
        <td><input class="subs-input price-input" type="number" step="0.01" min="0" placeholder="—" title="Monthly $ · empty = Varies" value="${hasP ? Number(a.price) : ''}" onchange="setAppPrice(${a.id},this.value)"></td>
        <td><input class="subs-input" type="number" min="0" value="${subs}" onchange="setSubs(${a.id},this.value);renderAdminPanel()"></td>
        <td style="font-family:'DM Mono',monospace;font-size:0.8rem;color:${rev>0?'var(--green)':'var(--text3)'}">${rev>0?`$${rev.toFixed(2)}`:'—'}</td>
        <td style="font-size:0.9rem">${[1,2,3,4,5].map(s=>`<span style="color:${s<=rating?'var(--gold)':'var(--text3)'};cursor:pointer" onclick="setRating(${a.id},${s});renderAdminPanel()">★</span>`).join('')}</td>
        <td style="font-size:0.75rem;color:var(--orange)">${note?'📝 '+note.substring(0,30)+(note.length>30?'...':''):'<span style="color:var(--text3)">—</span>'}</td>
      </tr>`;
    }).join('');
  }

  const dk = adminDailyLogDateKey();
  const bucket = state.dailyBlurbs[dk] || {};
  const dlb = $('adminDailyLogBody');
  const ro = !canEditPortfolio();
  if (dlb) {
    dlb.innerHTML = APPS.map(a => {
      const v = bucket[a.id] || '';
      return `<tr>
        <td style="color:var(--text3);font-size:0.75rem;font-family:'DM Mono',monospace">${a.id}</td>
        <td style="font-weight:600;font-size:0.82rem;">${escHtmlText(a.name)}</td>
        <td><textarea rows="2" class="admin-daily-blurb-input" style="width:100%;min-width:200px;max-width:640px;background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:8px;color:var(--text);font-size:0.8rem;resize:vertical;box-sizing:border-box;" data-app-id="${a.id}" oninput="onDailyBlurbInput(${a.id},this)" onblur="onDailyBlurbBlur()" ${ro ? 'readonly' : ''}>${escHtmlText(v)}</textarea></td>
      </tr>`;
    }).join('');
  }
}

function bulkSetStatus(status) {
  if (!canEditPortfolio()) return;
  if(!confirm(`Set ALL ${APPS.length} apps to "${status}"?`)) return;
  APPS.forEach(a=>a.status=status);
  renderApps(); renderAdminPanel(); showSave();
}

function bulkSetSubs(n) {
  if (!canEditPortfolio()) return;
  APPS.forEach(a=>{ if(a.price!=null&&Number.isFinite(Number(a.price))) state.subs[a.id]=n; });
  renderApps(); renderAdminPanel(); updateAll(); showSave();
}

function clearAllNotes() {
  if (!canEditPortfolio()) return;
  if(!confirm('Clear ALL notes?')) return;
  Object.keys(state.notes).forEach(k=>delete state.notes[k]);
  renderApps(); renderAdminPanel(); showSave();
}

function addNewApp() {
  if (!canEditPortfolio()) return;
  const name  = $('new-app-name')?.value?.trim();
  const desc  = $('new-app-desc')?.value?.trim();
  const url   = $('new-app-url')?.value?.trim();
  const cat   = $('new-app-cat')?.value?.trim();
  const priceRaw = $('new-app-price')?.value?.trim();
  const price = priceRaw === '' ? null : (() => {
    const n = parseFloat(priceRaw);
    return Number.isFinite(n) && n >= 0 ? Math.round(n * 100) / 100 : null;
  })();
  const status= $('new-app-status')?.value||'maint';
  if(!name){alert('App name is required');return;}
  const newId = Math.max(...APPS.map(a=>a.id))+1;
  APPS.push({id:newId,name,desc:desc||'New App',url:url||null,prodUrl:null,storeUrl:null,repo:null,testflightUrl:null,status,cat:cat||'General',price,pri:'Medium',subs:0,action:'Set up app',maintOffset:30+newId});
  ['new-app-name','new-app-desc','new-app-url','new-app-cat','new-app-price'].forEach(id=>{const el=$(id);if(el)el.value='';});
  renderApps(); renderAdminPanel(); updateAll(); showSave();
  alert(`✅ "${name}" added to portfolio! Total: ${APPS.length} apps`);
}

function exportJSON() {
  if (!canEditPortfolio()) return;
  const data = {apps:APPS, state:state, exported:new Date().toISOString()};
  const blob = new Blob([JSON.stringify(data,null,2)],{type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href=url; a.download='BVS_Portfolio_Backup.json'; a.click();
  URL.revokeObjectURL(url);
}

/** Days since last repo push before “stale” (needs action). */
const MAINT_STALE_REPO_DAYS = 30;
/** Open GitHub issues above this count flag repo health (needs action). */
const MAINT_OPEN_ISSUES_WARN = 15;

function normalizeRepoKey(v) {
  return (v || '').toLowerCase().replace(/[^a-z0-9]/g, '');
}

/** Normalize deploy URLs for set equality (Firebase manifest + runtime matching). */
function normalizeHostingUrl(url) {
  if (!url || !/^https?:\/\//i.test(url)) return null;
  try {
    const u = new URL(url.trim());
    let path = u.pathname.replace(/\/+$/, '');
    if (!path) path = '';
    return `${u.origin}${path}${u.search}`.toLowerCase();
  } catch {
    return null;
  }
}

function isFirebaseHostingUrl(url) {
  if (!url || !/^https?:\/\//i.test(url)) return false;
  try {
    const h = new URL(url).hostname.toLowerCase();
    return h.endsWith('.web.app') || h.endsWith('.firebaseapp.com');
  } catch {
    return false;
  }
}

function isVercelHostingUrl(url) {
  if (!url || !/^https?:\/\//i.test(url)) return false;
  try {
    return new URL(url).hostname.toLowerCase().endsWith('.vercel.app');
  } catch {
    return false;
  }
}

function hostingUrlSetFromApps() {
  const s = new Set();
  APPS.forEach(a => {
    const u = appHostingProbeUrl(a);
    if (u && isFirebaseHostingUrl(u)) {
      const n = normalizeHostingUrl(u);
      if (n) s.add(n);
    }
  });
  return s;
}

function vercelUrlSetFromApps() {
  const s = new Set();
  APPS.forEach(a => {
    const u = appHostingProbeUrl(a);
    if (u && isVercelHostingUrl(u)) {
      const n = normalizeHostingUrl(u);
      if (n) s.add(n);
    }
  });
  return s;
}

async function fetchJson(path) {
  const res = await fetch(path, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

/**
 * When BVS_CLOUD_API_BASE is set, load maintenance JSON from GET /api/manifests (serverless).
 * Otherwise use static ./data/*.json (local file or static hosting).
 */
async function fetchMaintenanceDataBundle() {
  const base = getCloudApiBase();
  if (base) {
    try {
      const r = await fetch(`${base}/api/manifests`, { cache: 'no-store' });
      const j = await r.json().catch(() => ({}));
      if (r.ok && j.ok) {
        return {
          firebase: j.firebase != null ? j.firebase : null,
          vercel: j.vercel != null ? j.vercel : null,
          runtime: j.runtime != null ? j.runtime : null,
        };
      }
    } catch (e) {
      console.warn('BVS: /api/manifests failed, using static ./data files', e);
    }
  }
  const [firebase, vercel, runtime] = await Promise.all([
    fetchJson('./data/firebase-hosting-manifest.json'),
    fetchJson('./data/vercel-deployment-manifest.json'),
    fetchJson('./data/latest-runtime-check.json'),
  ]);
  return { firebase, vercel, runtime };
}

function parseFirebaseManifest(data) {
  if (!data || !Array.isArray(data.hostingUrls)) return null;
  const set = new Set();
  data.hostingUrls.forEach(u => {
    const n = normalizeHostingUrl(u);
    if (n) set.add(n);
  });
  return set;
}

function parseVercelManifest(data) {
  if (!data || !Array.isArray(data.deploymentUrls)) return null;
  const set = new Set();
  data.deploymentUrls.forEach(u => {
    const n = normalizeHostingUrl(u);
    if (n) set.add(n);
  });
  return set;
}

function runtimeResultForApp(app, runtimePayload) {
  if (!runtimePayload || !Array.isArray(runtimePayload.results)) return null;
  const probe = getAppProdUrl(app) || (app.url && !isAppStoreUrl(app.url) ? app.url : null);
  const target = normalizeHostingUrl(probe);
  if (!target) return null;
  for (const r of runtimePayload.results) {
    if (normalizeHostingUrl(r.url) === target) return r;
  }
  return null;
}

function daysSince(isoDate) {
  if (!isoDate) return null;
  const ms = Date.now() - new Date(isoDate).getTime();
  return Math.floor(ms / 86400000);
}

function extractGithubRepoName(url) {
  if (!url || !url.includes('github.io')) return null;
  try {
    const u = new URL(url);
    const firstSegment = u.pathname.split('/').filter(Boolean)[0];
    return firstSegment || null;
  } catch {
    return null;
  }
}

/** e.g. https://aba-mastery.vercel.app/app → aba-mastery */
function extractVercelProjectSlug(url) {
  if (!url || !/^https?:\/\//i.test(url)) return null;
  try {
    const h = new URL(url).hostname.toLowerCase();
    if (!h.endsWith('.vercel.app')) return null;
    const slug = h.replace(/\.vercel\.app$/i, '');
    return slug || null;
  } catch {
    return null;
  }
}

function buildRepoIndex(repos) {
  const index = new Map();
  repos.forEach(repo => index.set(normalizeRepoKey(repo.name), repo));
  return index;
}

function findRepoForApp(app, repoIndex) {
  const linkProbe = getAppProdUrl(app) || (app.url && !isAppStoreUrl(app.url) ? app.url : null) || app.url;
  const fromGithubUrl = extractGithubRepoName(linkProbe);
  const fromVercelSlug = extractVercelProjectSlug(linkProbe);
  const candidates = [];
  if (app.repo && String(app.repo).trim()) {
    const r = String(app.repo).trim();
    const tail = r.includes('/') ? r.split('/').pop() : r;
    candidates.push(tail, r.replace(/\//g, '-'));
  }
  candidates.push(
    fromGithubUrl,
    fromVercelSlug,
    app.name,
    app.name.replace(/&/g, 'and'),
    app.name.replace(/'/g, ''),
    app.name.replace(/\./g, ''),
    app.name.replace(/\s+/g, '-'),
  );
  const seen = new Set();
  const uniq = candidates.filter(Boolean).filter(c => {
    const k = normalizeRepoKey(c);
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });

  for (const c of uniq) {
    const exact = repoIndex.get(normalizeRepoKey(c));
    if (exact) return exact;
  }

  const appKey = normalizeRepoKey(app.name);
  for (const repo of repoIndex.values()) {
    const repoKey = normalizeRepoKey(repo.name);
    if (repoKey.includes(appKey) || appKey.includes(repoKey)) return repo;
  }
  return null;
}

async function checkDeployment(url) {
  if (!url) return { status:'none', label:'No URL', platform:'none', runtimeChecked:false };
  if (!/^https?:\/\//i.test(url)) return { status:'local', label:'Local file', platform:'local', runtimeChecked:false };

  let parsed;
  try { parsed = new URL(url); } catch { return { status:'fail', label:'Invalid URL', platform:'unknown', runtimeChecked:false }; }
  const host = parsed.hostname.toLowerCase();
  const isFirebase = host.endsWith('.web.app') || host.endsWith('.firebaseapp.com');
  const isVercel = host.endsWith('.vercel.app');
  const isGithubPages = host.endsWith('.github.io');

  const platform = isFirebase ? 'firebase' : (isVercel ? 'vercel' : (isGithubPages ? 'github-pages' : 'web'));

  try {
    // Basic uptime probe (this does not validate app runtime correctness).
    await fetch(url, { method:'HEAD', mode:'no-cors', cache:'no-store' });

    if (isFirebase) {
      // Firebase-specific probe: hosting init endpoint often exists for deployed sites.
      try {
        const initRes = await fetch(`${parsed.origin}/__/firebase/init.json`, { cache:'no-store' });
        if (initRes.ok) {
          return { status:'ok', label:'Reachable + Firebase init', platform, runtimeChecked:false };
        }
      } catch {
        // Keep as reachable even if init probe fails; many valid sites still block this endpoint.
      }
      return { status:'ok', label:'Reachable (Firebase)', platform, runtimeChecked:false };
    }

    if (isVercel) {
      return { status:'ok', label:'Reachable (Vercel)', platform, runtimeChecked:false };
    }

    return { status:'ok', label:'Reachable', platform, runtimeChecked:false };
  } catch {
    return { status:'fail', label:'Unreachable', platform, runtimeChecked:false };
  }
}

async function fetchRonb12Repos() {
  const res = await fetch('https://api.github.com/users/ronb12/repos?per_page=100&sort=updated', {
    headers: { 'Accept': 'application/vnd.github+json' }
  });
  if (!res.ok) throw new Error('GitHub API request failed');
  return res.json();
}

function renderMaintenanceChecks() {
  const body = $('maintenanceCheckBody');
  const summary = $('maintenanceCheckSummary');
  if (!body || !summary) return;

  if (!maintenanceState.results.length) {
    summary.textContent = maintenanceState.running ? 'Running checks...' : 'No checks run yet.';
    body.innerHTML = `<tr><td colspan="9" style="color:var(--text3);font-size:0.82rem;">${maintenanceState.running ? 'Running checks...' : 'Run checks to generate automated maintenance results.'}</td></tr>`;
    return;
  }

  const fm = maintenanceState.firebaseMeta;
  const vm = maintenanceState.vercelMeta;
  const rt = maintenanceState.runtimeMeta;
  const attentionCount = maintenanceState.results.filter(r => r.needsAction).length;
  const staleCount = maintenanceState.results.filter(r => typeof r.repoDays === 'number' && r.repoDays > MAINT_STALE_REPO_DAYS).length;
  const deployFailCount = maintenanceState.results.filter(r => r.deploy.status === 'fail').length;
  const matchedCount = maintenanceState.results.filter(r => !!r.repo).length;
  const archivedCount = maintenanceState.results.filter(r => r.repoArchived).length;
  const disabledCount = maintenanceState.results.filter(r => r.repoDisabled).length;
  const highIssueCount = maintenanceState.results.filter(r => typeof r.openIssues === 'number' && r.openIssues > MAINT_OPEN_ISSUES_WARN).length;
  const stamp = maintenanceState.lastRunAt ? new Date(maintenanceState.lastRunAt).toLocaleString() : 'n/a';

  const fbLabel = !fm.manifestLoaded ? 'Firebase: mfst n/a' : (fm.match100 ? 'Firebase: 100% ✓' : 'Firebase: MISMATCH ✗');
  const vcLabel = !vm.manifestLoaded ? 'Vercel: mfst n/a' : (vm.match100 ? 'Vercel: 100% ✓' : 'Vercel: MISMATCH ✗');
  let rtLabel = 'Runtime: no report';
  if (rt.loaded && rt.generatedAt) {
    const okN = maintenanceState.results.filter(r => r.runtime && r.runtime.ok).length;
    const hasR = maintenanceState.results.filter(r => r.runtime !== null).length;
    const badN = hasR - okN;
    rtLabel = `Runtime: ${okN} clean / ${hasR} scanned (${badN} with errors) · ${new Date(rt.generatedAt).toLocaleString()}`;
  } else if (rt.error) {
    rtLabel = 'Runtime: report fetch failed (open via http server or run CI)';
  }

  summary.textContent = `Last run: ${stamp} | ${fbLabel} | ${vcLabel} | ${rtLabel} | Repo: ${matchedCount}/${APPS.length} | Stale (>${MAINT_STALE_REPO_DAYS}d): ${staleCount} | Archived: ${archivedCount} · Disabled: ${disabledCount} · Issues>${MAINT_OPEN_ISSUES_WARN}: ${highIssueCount} | Unreachable: ${deployFailCount} | Needs action: ${attentionCount}`;

  body.innerHTML = maintenanceState.results.map(r => {
    const probe = appHostingProbeUrl(r.app) || '';
    const wantsRepoHint = !!(probe && (probe.includes('github.io') || isVercelHostingUrl(probe)));
    const repoTxt = r.repo ? r.repo.name : (wantsRepoHint ? 'No match' : '—');
    const repoColor = r.repo ? 'var(--green)' : (wantsRepoHint ? 'var(--red)' : 'var(--text3)');
    const updatedTxt = typeof r.repoDays === 'number' ? `${r.repoDays}d ago` : 'n/a';
    const updatedColor = typeof r.repoDays === 'number' && r.repoDays > MAINT_STALE_REPO_DAYS ? 'var(--orange)' : 'var(--text2)';
    const healthParts = [];
    let healthColor = 'var(--text3)';
    let healthTxt = '—';
    if (r.repo) {
      if (r.repoArchived) healthParts.push('ARCHIVED');
      if (r.repoDisabled) healthParts.push('DISABLED');
      if (typeof r.openIssues === 'number' && r.openIssues > 0) healthParts.push(r.openIssues + ' open');
      if (!healthParts.length) {
        healthTxt = 'OK';
        healthColor = 'var(--green)';
      } else {
        healthTxt = healthParts.join(' · ');
        healthColor = r.repoHealthIssue ? 'var(--red)' : 'var(--orange)';
      }
    }
    const maintColor = r.overdue ? 'var(--red)' : 'var(--text2)';
    const actionTxt = r.needsAction ? 'Yes' : 'No';
    const actionColor = r.needsAction ? 'var(--red)' : 'var(--green)';
    const deployColor = r.deploy.status === 'ok' ? 'var(--green)' : (r.deploy.status === 'fail' ? 'var(--red)' : 'var(--text2)');
    const deployLabel = `${r.deploy.label}${r.deploy.platform ? ` (${r.deploy.platform})` : ''}`;

    let fbCell = '—';
    let fbColor = 'var(--text3)';
    const hostU = appHostingProbeUrl(r.app);
    if (hostU && isFirebaseHostingUrl(hostU)) {
      if (!fm.manifestLoaded) { fbCell = '⚠ Fb mfst'; fbColor = 'var(--orange)'; }
      else if (!fm.match100) { fbCell = '✗ Fb'; fbColor = 'var(--red)'; }
      else { fbCell = 'Fb ✓'; fbColor = 'var(--green)'; }
    } else if (hostU && isVercelHostingUrl(hostU)) {
      if (!vm.manifestLoaded) { fbCell = '⚠ Vc mfst'; fbColor = 'var(--orange)'; }
      else if (!vm.match100) { fbCell = '✗ Vc'; fbColor = 'var(--red)'; }
      else { fbCell = 'Vc ✓'; fbColor = 'var(--green)'; }
    }

    let rtCell = '—';
    let rtColor = 'var(--text3)';
    if (hostU && /^https?:\/\//i.test(hostU)) {
      if (!r.runtime) {
        rtCell = rt.loaded ? 'No row' : 'No CI scan';
        rtColor = 'var(--orange)';
      } else if (r.runtime.ok) {
        const sec = typeof r.runtime.loadTimeMs === 'number' ? (r.runtime.loadTimeMs / 1000).toFixed(1) + 's' : '';
        const tit = (r.runtime.title || '').trim();
        const titShort = tit.length > 28 ? tit.slice(0, 26) + '…' : tit;
        const warnN = (r.runtime.consoleWarnings && r.runtime.consoleWarnings.length) || 0;
        rtCell = '✓' + (sec ? ' ' + sec : '') + (titShort ? ' · ' + titShort : '') + (warnN ? ` · ${warnN} warn` : '');
        rtColor = 'var(--green)';
      } else {
        const ce = Array.isArray(r.runtime.significantConsoleErrors)
          ? r.runtime.significantConsoleErrors.length
          : (r.runtime.consoleErrors?.length || 0);
        const pe = Array.isArray(r.runtime.significantPageErrors)
          ? r.runtime.significantPageErrors.length
          : (r.runtime.pageErrors?.length || 0);
        const n = ce + pe + (r.runtime.failedRequests?.length || 0);
        const extra = [];
        if (r.runtime.navigationError) extra.push('nav fail');
        if (typeof r.runtime.loadTimeMs === 'number' && r.runtime.loadTimeMs > 15000) extra.push('slow');
        if (!(r.runtime.title && String(r.runtime.title).trim())) extra.push('no title');
        const w = (r.runtime.consoleWarnings && r.runtime.consoleWarnings.length) || 0;
        if (w > 40) extra.push('warn flood');
        rtCell = `✗ ${n} err` + (extra.length ? ' · ' + extra.join(', ') : '');
        rtColor = 'var(--red)';
      }
    }

    return `<tr>
      <td style="font-size:0.8rem;font-weight:600;">${r.app.name}</td>
      <td style="font-size:0.78rem;color:${repoColor};font-family:'DM Mono',monospace;">${repoTxt}</td>
      <td style="font-size:0.78rem;color:${healthColor};font-family:'DM Mono',monospace;">${healthTxt}</td>
      <td style="font-size:0.78rem;color:${updatedColor};font-family:'DM Mono',monospace;">${updatedTxt}</td>
      <td style="font-size:0.78rem;color:${deployColor};font-family:'DM Mono',monospace;">${deployLabel}</td>
      <td style="font-size:0.78rem;color:${fbColor};font-family:'DM Mono',monospace;">${fbCell}</td>
      <td style="font-size:0.78rem;color:${rtColor};font-family:'DM Mono',monospace;">${rtCell}</td>
      <td style="font-size:0.78rem;color:${maintColor};font-family:'DM Mono',monospace;">${formatDate(getMaintDate(r.app.maintOffset))}</td>
      <td style="font-size:0.78rem;color:${actionColor};font-family:'DM Mono',monospace;font-weight:700;">${actionTxt}</td>
    </tr>`;
  }).join('');
}

async function runMaintenanceChecks() {
  if (maintenanceState.running) return;
  const btn = $('runMaintenanceBtn');
  maintenanceState.running = true;
  if (btn) { btn.disabled = true; btn.textContent = 'Checking...'; btn.style.opacity = '0.7'; }
  renderMaintenanceChecks();

  try {
    const [repos, bundle] = await Promise.all([
      fetchRonb12Repos(),
      fetchMaintenanceDataBundle(),
    ]);
    const manifestData = bundle.firebase;
    const vercelManifestData = bundle.vercel;
    const runtimePayload = bundle.runtime;

    const repoIndex = buildRepoIndex(repos);
    const appFbSet = hostingUrlSetFromApps();
    const appVcSet = vercelUrlSetFromApps();
    const manifestSet = parseFirebaseManifest(manifestData);
    const vercelSet = parseVercelManifest(vercelManifestData);

    maintenanceState.firebaseMeta = { match100:null, onlyInApps:[], onlyInManifest:[], manifestLoaded:false, manifestError:null };
    if (!manifestData) {
      maintenanceState.firebaseMeta.manifestError = 'Could not load firebase-hosting-manifest.json (use a local server or GitHub Pages).';
    } else if (!manifestSet) {
      maintenanceState.firebaseMeta.manifestError = 'Invalid manifest: expected { hostingUrls: string[] }';
    } else {
      maintenanceState.firebaseMeta.manifestLoaded = true;
      const onlyInApps = [...appFbSet].filter(u => !manifestSet.has(u));
      const onlyInManifest = [...manifestSet].filter(u => !appFbSet.has(u));
      maintenanceState.firebaseMeta.onlyInApps = onlyInApps;
      maintenanceState.firebaseMeta.onlyInManifest = onlyInManifest;
      maintenanceState.firebaseMeta.match100 = onlyInApps.length === 0 && onlyInManifest.length === 0;
    }

    maintenanceState.vercelMeta = { match100:null, onlyInApps:[], onlyInManifest:[], manifestLoaded:false, manifestError:null };
    if (!vercelManifestData) {
      maintenanceState.vercelMeta.manifestError = 'Could not load vercel-deployment-manifest.json (use a local server or GitHub Pages).';
    } else if (!vercelSet) {
      maintenanceState.vercelMeta.manifestError = 'Invalid manifest: expected { deploymentUrls: string[] }';
    } else {
      maintenanceState.vercelMeta.manifestLoaded = true;
      const onlyInAppsVc = [...appVcSet].filter(u => !vercelSet.has(u));
      const onlyInManifestVc = [...vercelSet].filter(u => !appVcSet.has(u));
      maintenanceState.vercelMeta.onlyInApps = onlyInAppsVc;
      maintenanceState.vercelMeta.onlyInManifest = onlyInManifestVc;
      maintenanceState.vercelMeta.match100 = onlyInAppsVc.length === 0 && onlyInManifestVc.length === 0;
    }

    maintenanceState.runtimeMeta = { loaded:false, generatedAt:null, error:null };
    if (runtimePayload && Array.isArray(runtimePayload.results)) {
      maintenanceState.runtimeMeta.loaded = true;
      maintenanceState.runtimeMeta.generatedAt = runtimePayload.generatedAt || null;
    } else {
      maintenanceState.runtimeMeta.error = 'No valid latest-runtime-check.json (run Actions workflow: Web app runtime check).';
    }

    const fm = maintenanceState.firebaseMeta;
    const vm = maintenanceState.vercelMeta;
    const results = [];

    for (const app of APPS) {
      const repo = findRepoForApp(app, repoIndex);
      const hostUrl = appHostingProbeUrl(app);
      const deploy = await checkDeployment(hostUrl);
      const repoDays = repo ? daysSince(repo.pushed_at || repo.updated_at) : null;
      const overdue = isOverdue(app.maintOffset);
      const staleRepo = !!(repo && typeof repoDays === 'number' && repoDays > MAINT_STALE_REPO_DAYS);
      const repoArchived = !!(repo && repo.archived);
      const repoDisabled = !!(repo && repo.disabled);
      const openIssues = repo && typeof repo.open_issues_count === 'number' ? repo.open_issues_count : null;
      const repoHealthIssue = repoArchived || repoDisabled || (openIssues !== null && openIssues > MAINT_OPEN_ISSUES_WARN);
      const deployIssue = deploy.status === 'fail';
      const hasGithubUrl = !!(hostUrl && hostUrl.includes('github.io'));
      const isFb = isFirebaseHostingUrl(hostUrl || '');
      const isVc = isVercelHostingUrl(hostUrl || '');
      const repoIssue = (hasGithubUrl || isVc) && !repo;
      const firebaseIssue = isFb && (!fm.manifestLoaded || fm.match100 !== true);
      const vercelIssue = isVc && (!vm.manifestLoaded || vm.match100 !== true);

      const rtRow = runtimeResultForApp(app, runtimePayload);
      const runtimeIssue = !!(rtRow && rtRow.ok === false);

      const needsAction = overdue || staleRepo || deployIssue || repoIssue || firebaseIssue || vercelIssue || runtimeIssue || repoHealthIssue;
      results.push({
        app, repo, repoDays, deploy, overdue, needsAction,
        runtime: rtRow,
        repoArchived, repoDisabled, openIssues, repoHealthIssue,
      });
    }

    maintenanceState.results = results;
    maintenanceState.lastRunAt = Date.now();
  } catch (err) {
    maintenanceState.results = [];
    maintenanceState.lastRunAt = Date.now();
    maintenanceState.firebaseMeta = { match100:null, onlyInApps:[], onlyInManifest:[], manifestLoaded:false, manifestError:'—' };
    maintenanceState.vercelMeta = { match100:null, onlyInApps:[], onlyInManifest:[], manifestLoaded:false, manifestError:'—' };
    maintenanceState.runtimeMeta = { loaded:false, generatedAt:null, error:'—' };
    const summary = $('maintenanceCheckSummary');
    if (summary) summary.textContent = 'Maintenance check failed. Verify internet and GitHub API access.';
  } finally {
    maintenanceState.running = false;
    if (btn) { btn.disabled = false; btn.textContent = 'Run Checks'; btn.style.opacity = '1'; }
    renderMaintenanceChecks();
  }
}


window.addEventListener('DOMContentLoaded', async () => {
  if (isPublicPortfolioView()) {
    try { document.documentElement.classList.add('bvs-public-view'); } catch {}
    try { document.body.classList.add('bvs-public-view'); } catch {}
    const t = $('tabAppsBtn');
    if (t) showTab('apps', t);
  }
  const now = new Date();
  const ds = now.toLocaleDateString('en-US',{weekday:'short',year:'numeric',month:'short',day:'numeric'});
  $('headerDate').textContent = ds;
  $('footerDate').textContent = ds;
  await tryMergeFromCloudOnLoad();
  await mergeWorkLogSeedFromFile();
  const gi = $('goalInput');
  if (gi && typeof state.goalAmount === 'number') gi.value = String(state.goalAmount);
  syncAdminGate();
  syncPortfolioEditMode();
  renderApps();
  updateAll();
  if (isAdminAuthenticated()) renderAdminPanel();
  renderMaintenanceChecks();
  renderFeatureCatalog();
  setTimeout(animateFadeIns, 100);
});
