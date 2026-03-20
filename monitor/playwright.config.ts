import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: '.',
  testMatch: 'smoke.spec.ts',
  timeout: 120_000,
  retries: 0,
  use: {
    headless: true,
    // Full maintenance: fail on invalid / untrusted TLS (turn on if a host uses broken certs).
    ignoreHTTPSErrors: false,
    viewport: { width: 1280, height: 720 },
  },
});
