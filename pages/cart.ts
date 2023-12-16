import { expect, type Locator, type Page } from '@playwright/test';
import { HeaderComponent } from '../components/header';

export class CartPage {
  readonly page: Page;
  readonly agree_with_terms: Locator;
  readonly button_checkout: Locator;

  constructor(page: Page) {
    this.page = page;
    this.agree_with_terms = page.locator('#termsofservice');
    this.button_checkout = page.locator('#checkout');
  }

  async open() {
    const headerComponent = new HeaderComponent(this.page);
    await headerComponent.cart.click();
    await expect(this.page).toHaveURL('/cart');
  }

  async proceedToCheckout() {
    await this.agree_with_terms.click();
    await expect(this.agree_with_terms).toBeChecked();
    await this.button_checkout.click();
    await expect(this.page).toHaveURL('/onepagecheckout#opc-billing');
  }

}
