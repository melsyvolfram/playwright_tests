import { expect, type Locator, type Page } from '@playwright/test';

export class NotificationsComponent {
  readonly page: Page;
  readonly success: Locator;
  readonly close: Locator;

  constructor(page: Page) {
    this.page = page;
    this.success = page.locator('.bar-notification.success');
    this.close = page.locator('.bar-notification .close');
  }

  async alertSuccess() {
    // TODO: stabilize this method, because the test often fails here
    await expect(this.success).toBeVisible();
    await this.close.click();
    await expect(this.success).toBeHidden();
  }

  // TODO: add check alertError()

}
