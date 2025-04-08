import properties from './properties';
const { defineConfig } = require('@playwright/test');


export default defineConfig({
  testDir: 'tests',
  timeout: properties.timeouts.test,
  retries: 0,
  use: {
    browserName: 'chromium',
    headless: false, 
    baseURL: properties.baseURL,
    viewport: { width: 1280, height: 720 },
    actionTimeout: properties.timeouts.action,
    navigationTimeout: properties.timeouts.navigation,
    testIdAttribute: 'data-testid',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
});
