import { test } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const urlsPath = path.join(__dirname, 'urls.json');
const outPath = path.join(__dirname, '..', 'data', 'latest-runtime-check.json');

/** Max time for domcontentloaded + first paint window (ms). */
const MAX_LOAD_MS = 15_000;
/** Fail if more than this many browser console *warnings* (noise cap). */
const MAX_CONSOLE_WARNS = 40;

function significantConsoleErrors(errors: string[]): string[] {
  return errors.filter((e) => {
    // Next.js App Router prefetches RSC payloads; aborted navigations log this then recover.
    if (/Falling back to browser navigation/i.test(e)) return false;
    return true;
  });
}

/** Drop single-character / empty pageerrors (common minified false positives). */
function significantPageErrors(errors: string[]): string[] {
  return errors.filter((e) => String(e).trim().length >= 4);
}

interface UrlFile {
  urls: string[];
}

export interface ScanResult {
  url: string;
  ok: boolean;
  httpStatus: number | null;
  loadTimeMs: number | null;
  finalUrl: string | null;
  title: string | null;
  /** Raw browser console errors (includes filtered noise). */
  consoleErrors: string[];
  /** Subset of consoleErrors that fail the check (see significantConsoleErrors()). */
  significantConsoleErrors: string[];
  consoleWarnings: string[];
  pageErrors: string[];
  significantPageErrors: string[];
  failedRequests: string[];
  navigationError?: string;
}

const { urls } = JSON.parse(fs.readFileSync(urlsPath, 'utf8')) as UrlFile;

test('full maintenance scan — deployed URLs', async ({ page }) => {
  const results: ScanResult[] = [];

  for (const url of urls) {
    const consoleErrors: string[] = [];
    const consoleWarnings: string[] = [];
    const pageErrors: string[] = [];
    const failedRequests: string[] = [];

    const consoleHandler = (msg: { type: () => string; text: () => string }) => {
      const t = msg.type();
      if (t === 'error') consoleErrors.push(msg.text());
      else if (t === 'warning') consoleWarnings.push(msg.text());
    };
    const pageErrorHandler = (err: Error) => {
      pageErrors.push(err.message);
    };
    const requestFailedHandler = (req: {
      url: () => string;
      failure: () => { errorText: string } | null;
    }) => {
      const f = req.failure();
      const err = f?.errorText ?? 'failed';
      // SPAs / Firestore often abort in-flight subresources on route change — not a deploy break.
      if (String(err).includes('ERR_ABORTED')) return;
      failedRequests.push(`${req.url()} — ${err}`);
    };

    page.on('console', consoleHandler);
    page.on('pageerror', pageErrorHandler);
    page.on('requestfailed', requestFailedHandler);

    let httpStatus: number | null = null;
    let navigationError: string | undefined;
    let loadTimeMs: number | null = null;
    let title: string | null = null;

    const t0 = Date.now();
    try {
      const response = await page.goto(url, {
        waitUntil: 'domcontentloaded',
        timeout: 60_000,
      });
      loadTimeMs = Date.now() - t0;
      httpStatus = response?.status() ?? null;
      await page.waitForTimeout(2500);
      title = (await page.title().catch(() => '')) || '';
    } catch (e) {
      loadTimeMs = Date.now() - t0;
      navigationError = e instanceof Error ? e.message : String(e);
    }

    const finalUrl = page.url() || null;

    page.off('console', consoleHandler);
    page.off('pageerror', pageErrorHandler);
    page.off('requestfailed', requestFailedHandler);

    const httpOk = httpStatus !== null && httpStatus > 0 && httpStatus < 400;
    const titleOk = (title || '').trim().length > 0;
    const loadOk =
      loadTimeMs !== null &&
      loadTimeMs <= MAX_LOAD_MS &&
      !navigationError;
    const sigErrors = significantConsoleErrors(consoleErrors);
    const sigPageErrors = significantPageErrors(pageErrors);
    const noRuntimeErrors =
      sigErrors.length === 0 &&
      sigPageErrors.length === 0 &&
      failedRequests.length === 0;
    const warningsOk = consoleWarnings.length <= MAX_CONSOLE_WARNS;

    const ok =
      httpOk &&
      loadOk &&
      titleOk &&
      noRuntimeErrors &&
      warningsOk &&
      !navigationError;

    results.push({
      url,
      ok,
      httpStatus,
      loadTimeMs,
      finalUrl,
      title: title ? title.slice(0, 120) : null,
      consoleErrors,
      significantConsoleErrors: sigErrors,
      consoleWarnings,
      pageErrors,
      significantPageErrors: sigPageErrors,
      failedRequests,
      navigationError,
    });
  }

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(
    outPath,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        source: 'Playwright monitor/smoke.spec.ts (full maintenance)',
        limits: { maxLoadMs: MAX_LOAD_MS, maxConsoleWarnings: MAX_CONSOLE_WARNS },
        results,
      },
      null,
      2
    )
  );

  const bad = results.filter((r) => !r.ok);
  if (bad.length > 0) {
    throw new Error(
      `Full maintenance scan failures (${bad.length}):\n${JSON.stringify(bad, null, 2)}`
    );
  }
});
