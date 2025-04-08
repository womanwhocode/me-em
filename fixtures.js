import { test as base, expect } from '@playwright/test';
import { matchers } from "expect-playwright";


global.page = undefined;
expect.extend(matchers);


export const test = base.extend({

  context: async ({ context }, use) => {
    await context.addInitScript(() => {
      window.localStorage.setItem('debug', 'true');
    });
    await use(context);
  },
  
  page: async ({ page }, use) => {
    await use(page);
  },
});

export { expect }; 