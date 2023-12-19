import { type Locator, type Page } from '@playwright/test';

export class HeaderComponent {
  readonly page: Page;
  readonly register: Locator;
  readonly login: Locator;
  readonly cart: Locator;

  constructor(page: Page) {
    this.page = page;
    this.register = page.locator('.ico-register');
    this.login = page.locator('.ico-login');
    this.cart = page.locator('.ico-cart');
  }

}
