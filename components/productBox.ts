import { type Locator, type Page } from '@playwright/test';

export class ProductBoxComponent {
  readonly page: Page;
  readonly name: Locator;
  readonly price: Locator;

  constructor(page: Page) {
    this.page = page;
    this.name = page.locator('.product-title a');
    this.price = page.locator('.actual-price');
  }

  async getProductName(productNumber: number) {
    const productName = await this.name.nth(productNumber - 1).innerText();
    return productName;
  }

  async getProductPrice(productNumber: number) {
    const productPriceString = await this.price.nth(productNumber - 1).innerText();
    return Number(productPriceString.replace('$', ''));
  }

}
