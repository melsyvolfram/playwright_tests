import { expect, type Locator, type Page } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly country: Locator;
  readonly city: Locator;
  readonly address1: Locator;
  readonly zip_postal_code: Locator;
  readonly phone: Locator;
  readonly button_continue: Locator;
  readonly button_confirm: Locator;
  readonly ship_to_same_address: Locator;
  readonly select_billing_address: Locator;
  readonly select_credit_card: Locator;
  readonly cardholder_name: Locator;
  readonly card_number: Locator;
  readonly card_code: Locator;
  readonly select_expire_month: Locator;
  readonly select_expire_year: Locator;

  constructor(page: Page) {
    this.page = page;
    this.country = page.locator('#BillingNewAddress_CountryId');
    this.city = page.locator('#BillingNewAddress_City');
    this.address1 = page.locator('#BillingNewAddress_Address1');
    this.zip_postal_code = page.locator('#BillingNewAddress_ZipPostalCode');
    this.phone = page.locator('#BillingNewAddress_PhoneNumber');
    this.button_continue = page.getByText('Continue');
    this.button_confirm = page.locator('.confirm-order-next-step-button');
    this.ship_to_same_address = page.locator('#ShipToSameAddress');
    this.select_billing_address = page.locator('#billing-address-select');
    this.select_credit_card = page.locator('#CreditCardType');
    this.cardholder_name = page.locator('#CardholderName');
    this.card_number = page.locator('#CardNumber');
    this.card_code = page.locator('#CardCode');
    this.select_expire_month = page.locator('#ExpireMonth');
    this.select_expire_year = page.locator('#ExpireYear');
  }

  async continueWithExistingBillingAddress() {
    await expect(this.ship_to_same_address).toBeChecked();
    await expect(this.select_billing_address).toBeVisible();
    await this.button_continue.nth(0).click();
  }

  async setBillingAddress(user) {
    await expect(this.ship_to_same_address).toBeChecked();
    await this.fillRequiredFields(user);
    await this.button_continue.nth(0).click();
    await expect(this.page).toHaveURL('/onepagecheckout#opc-shipping_method');
  }

  async setShippingMethod(methodNumber: number) {
    let optionSelector = await this.page.locator(`#shippingoption_${methodNumber - 1}`);
    await optionSelector.click();
    await expect(optionSelector).toBeChecked();
    await this.button_continue.nth(2).click();
    await expect(this.page).toHaveURL('/onepagecheckout#opc-payment_method');
  }

  async setPaymentMethod(methodNumber: number) {
    let optionSelector = await this.page.locator(`#paymentmethod_${methodNumber - 1}`);
    await optionSelector.click();
    await expect(optionSelector).toBeChecked();
    await this.button_continue.nth(3).click();
    await expect(this.page).toHaveURL('/onepagecheckout#opc-payment_info');
  }

  async setPaymentInfoCreditCard() {
    await expect(this.select_credit_card).toHaveValue('visa');
    await this.cardholder_name.fill('TEST TEST');
    await this.card_number.fill('0000 0000 0000 0000');
    await expect(this.select_expire_month).toHaveValue('1');
    await this.select_expire_year.selectOption('2030');
    await expect(this.select_expire_year).toHaveValue('2030');
    await this.card_code.fill('123');
    await this.button_continue.nth(4).click();
    await expect(this.page).toHaveURL('/onepagecheckout#opc-confirm_order');
  }

  async continuePayingByCheck() {
    await expect(this.page.getByText('Mail Personal or Business Check, Cashier\'s Check or money order to:')).toBeVisible();
    await this.button_continue.nth(4).click();
    await expect(this.page).toHaveURL('/onepagecheckout#opc-confirm_order');
  }

  async fillRequiredFields(user) {
    await this.country.selectOption(user.country);
    await this.city.fill(user.city);
    await this.address1.fill(user.address1);
    await this.zip_postal_code.fill(user.zipPostalCode);
    await this.phone.fill(user.phone);
  }

  async purchaseSuccessConfirmation() {
    await expect(this.page).toHaveURL('/checkout/completed');
    await expect(this.page.getByText('Thank you')).toBeVisible();
    await expect(this.page.getByText('Your order has been successfully processed!')).toBeVisible();
    await expect(this.page.getByText('Order number: ')).toBeVisible();
    await expect(this.page.getByText('Click here for order details.')).toBeVisible();
    await this.button_continue.click();
    await expect(this.page).toHaveURL('/');
  }

}
