import { test } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const urlsPath = path.join(__dirname, 'urls.json');
const outPath = path.join(__dirname, '..', 'data', 'latest-runtime-check.json');

interface UrlFile {
  urls: string[];
}

interface ScanResult {
  url: string;
  ok: boolean;
  httpStatus: number | null;
  consoleErrors: string[];
  pageErrors: string[];
  failedRequests: string[];
  navigationError?: string;
}

const { urls } = JSON.parse(fs.readFileSync(urlsPath, 'utf8')) as UrlFile;

test('runtime scan — all deployed URLs', async ({ page }) => {
  const results: ScanResult[] = [];

  for (const url of urls) {
    const consoleErrors: string[] = [];
    const pageErrors: string[] = [];
    const failedRequests: string[] = [];

    const consoleHandler = (msg: { type: () => string; text: () => string }) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    };
    const pageErrorHandler = (err: Error) => {
      pageErrors.push(err.message);
    };
    const requestFailedHandler = (req: {
      url: () => string;
      failure: () => { errorText: string } | null;
    }) => {
      const f = req.failure();
      failedRequests.push(`${req.url()} — ${f?.errorText ?? 'failed'}`);
    };

    page.on('console', consoleHandler);
    page.on('pageerror', pageErrorHandler);
    page.on('requestfailed', requestFailedHandler);

    let httpStatus: number | null = null;
    let navigationError: string | undefined;

    try {
      const response = await page.goto(url, {
        waitUntil: 'domcontentloaded',
        timeout: 60_000,
      });
      httpStatus = response?.status() ?? null;
      await page.waitForTimeout(2500);
    } catch (e) {
      navigationError = e instanceof Error ? e.message : String(e);
    }

    page.off('console', consoleHandler);
    page.off('pageerror', pageErrorHandler);
    page.off('requestfailed', requestFailedHandler);

    const httpOk = httpStatus !== null && httpStatus > 0 && httpStatus < 400;
    const noRuntimeErrors =
      consoleErrors.length === 0 &&
      pageErrors.length === 0 &&
      failedRequests.length === 0;
    const ok = httpOk && noRuntimeErrors && !navigationError;

    results.push({
      url,
      ok,
      httpStatus,
      consoleErrors,
      pageErrors,
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
        source: 'Playwright monitor/smoke.spec.ts',
        results,
      },
      null,
      2
    )
  );

  const bad = results.filter((r) => !r.ok);
  if (bad.length > 0) {
    throw new Error(
      `Runtime scan failures (${bad.length}):\n${JSON.stringify(bad, null, 2)}`
    );
  }
});
