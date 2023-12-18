import { type Locator, type Page } from '@playwright/test';
import { NotificationsComponent } from './notifications';

export class ActionsComponent {
  readonly page: Page;
  readonly button_add_to_cart: Locator;

  constructor(page: Page) {
    this.page = page;
    this.button_add_to_cart = page.locator('.product-box-add-to-cart-button');
  }

  async addToCart(productNumber: number) {
    await this.button_add_to_cart.nth(productNumber - 1).click();
    const notifications = new NotificationsComponent(this.page);
    await notifications.alertSuccess();
  }

}
