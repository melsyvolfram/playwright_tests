import { defineConfig } from '@playwright/test';

export default defineConfig({

  testDir: './tests',
  fullyParallel: true,
  workers: 3,
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
  timeout: 60000,
  expect: {
    timeout: 6000,
  },
  use: {
    baseURL: 'https://demo.nopcommerce.com',
    headless: true,
    viewport: { width: 1280, height: 720 },
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    // launchOptions: {
    //   slowMo: 500,
    // },
  },

});
