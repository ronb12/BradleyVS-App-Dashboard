/**
 * Smoke + light UX check for the BradleyVS portfolio dashboard itself (not portfolio app URLs).
 */
import { test, expect } from '@playwright/test';

const DASH_URLS = [
  'https://bradleyvs-app-dashboard.vercel.app/',
  'https://bradleyvs-app-dashboard.vercel.app/BVS_Dashboard_v2_1',
  'https://ronb12.github.io/BradleyVS-App-Dashboard/',
];

function significantConsole(errors: string[]): string[] {
  return errors.filter(
    (e) =>
      e.trim().length >= 4 &&
      !/Falling back to browser navigation/i.test(e) &&
      !/ChunkLoadError/i.test(e)
  );
}

for (const url of DASH_URLS) {
  test(`dashboard loads clean: ${url}`, async ({ page }) => {
    const consoleErrors: string[] = [];
    const pageErrors: string[] = [];
    const failed: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    page.on('pageerror', (err) => pageErrors.push(err.message));
    page.on('requestfailed', (req) => {
      const f = req.failure();
      const err = f?.errorText ?? 'failed';
      if (String(err).includes('ERR_ABORTED')) return;
      failed.push(`${req.url()} — ${err}`);
    });

    const res = await page.goto(url, {
      waitUntil: 'domcontentloaded',
      timeout: 60_000,
    });
    expect(res?.status(), 'HTTP status').toBeLessThan(400);

    await page.waitForTimeout(2500);

    await expect(page.locator('button.tab').first()).toBeVisible();
    const title = (await page.title()).trim();
    expect(title.length).toBeGreaterThan(2);

    const sig = [
      ...significantConsole(consoleErrors),
      ...pageErrors.filter((e) => e.trim().length >= 4),
    ];
    expect.soft(sig, `console/page errors:\n${sig.join('\n')}`).toEqual([]);
    expect.soft(failed, `failed requests:\n${failed.join('\n')}`).toEqual([]);
  });
}

test('dashboard: tab navigation + admin gate', async ({ page }) => {
  const base = 'https://bradleyvs-app-dashboard.vercel.app/BVS_Dashboard_v2_1';
  await page.goto(base, { waitUntil: 'domcontentloaded', timeout: 60_000 });
  await page.waitForTimeout(1200);

  await page.getByRole('button', { name: /Apps/i }).click();
  await expect(page.locator('#panel-apps')).toBeVisible();
  await page.waitForTimeout(400);

  await page.getByRole('button', { name: /Admin/i }).click();
  await expect(page.locator('#panel-admin')).toBeVisible();
  await page.waitForTimeout(400);

  const adminGate =
    (await page.locator('#admin-login-card').count()) > 0 ||
    (await page.locator('input[type="password"]').count()) > 0;
  expect(adminGate).toBeTruthy();
});
