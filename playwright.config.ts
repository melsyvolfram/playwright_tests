import { defineConfig } from '@playwright/test';

export default defineConfig({

  testDir: './tests',
  fullyParallel: true,
  reporter: [
    [
      'html',
      {
        open: 'never',
        outputFolder: 'reports'
      }
    ]
  ],
  use: {
    baseURL: 'https://demo.nopcommerce.com',
    headless: true,
    viewport: { width: 1280, height: 720 },
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

});
