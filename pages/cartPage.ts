import { expect, type Locator, type Page } from '@playwright/test';
import { HeaderComponent } from '../components/header';

export class CartPage {
  readonly page: Page;
  readonly product_item: Locator;
  readonly product_name: Locator;
  readonly product_quantity: Locator;
  readonly product_price: Locator;
  readonly product_total_price: Locator;
  readonly order_subtotal_price: Locator;
  readonly agree_with_terms: Locator;
  readonly button_checkout: Locator;
  readonly button_update_cart: Locator;
  readonly button_remove: Locator;

  constructor(page: Page) {
    this.page = page;
    this.product_item = page.locator('.cart tr .product-name');
    this.product_name = page.locator('.cart tr .product-name');
    this.product_quantity = page.locator('.cart tr .qty-input');
    this.product_price = page.locator('.cart tr .product-unit-price');
    this.product_total_price = page.locator('.cart tr .product-subtotal');
    this.order_subtotal_price = page.locator('.order-subtotal .value-summary');
    this.agree_with_terms = page.locator('#termsofservice');
    this.button_checkout = page.locator('#checkout');
    this.button_update_cart = page.locator('#updatecart');
    this.button_remove = page.locator('.remove-btn');
  }

  async open() {
    const header = new HeaderComponent(this.page);
    await header.cart.click();
    await expect(this.page).toHaveURL('/cart');
  }

  async checkItemsQuantity(itemsQuantity: number) {
    await expect(this.product_item).toHaveCount(itemsQuantity);
  }

  async checkProductName(productNumber: number, expectedName: string) {
    await expect(this.product_name.nth(productNumber - 1)).toHaveText(expectedName);
  }

  async checkProductQuantity(productNumber: number, expectedQuantity: number) {
    await expect(this.product_quantity.nth(productNumber - 1)).toHaveValue(String(expectedQuantity));
  }

  async checkProductPrice(productNumber: number, expectedPrice: number) {
    const actualPriceString = await this.product_price.nth(productNumber - 1).innerText();
    const actualPrice = Number(actualPriceString.replace('$', ''));
    await expect(actualPrice).toBe(expectedPrice);
  }

  async checkProductTotalPrice(productNumber: number, expectedTotalPrice: number) {
    const actualTotalPriceString = await this.product_total_price.nth(productNumber - 1).innerText();
    const actualTotalPrice = Number(actualTotalPriceString.replace('$', ''));
    await expect(actualTotalPrice).toBe(expectedTotalPrice);
  }

  async checkOrderSubtotalPrice(expectedPrice: number) {
    const actualPriceString = await this.order_subtotal_price.innerText();
    const actualPrice = Number(actualPriceString.replace('$', ''));
    await expect(actualPrice).toBe(expectedPrice);
  }

  async setProductQuantity(productNumber: number, newQuantity: number) {
    await this.product_quantity.nth(productNumber - 1).fill(String(newQuantity));
  }

  async updateCart() {
    await this.button_update_cart.click();
  }

  async removeProduct(productNumber: number) {
    await this.button_remove.nth(productNumber - 1).click();
  }

  async proceedToCheckout() {
    await expect(this.agree_with_terms).not.toBeChecked();
    await this.agree_with_terms.click();
    await expect(this.agree_with_terms).toBeChecked();
    await this.button_checkout.click();
    await expect(this.page).toHaveURL('/onepagecheckout#opc-billing');
  }

}
