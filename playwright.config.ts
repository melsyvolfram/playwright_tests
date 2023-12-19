import { defineConfig } from '@playwright/test';

export default defineConfig({

  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  workers: process.env.WORKERS ? Number(process.env.WORKERS) : 2,
  reporter: [
    [
      'html',
      {
        open: 'never',
        outputFolder: 'reports',
      }
    ],
    [
      'dot'
    ]
  ],
  timeout: process.env.CI ? 30000 : 60000,
  expect: {
    timeout: 6000,
  },
  use: {
    baseURL: process.env.BASE_URL || 'https://demo.nopcommerce.com',
    headless: true,
    viewport: { width: 1280, height: 720 },
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    launchOptions: {
      slowMo: process.env.CI ? 0 : 500,
    },
  },

});
