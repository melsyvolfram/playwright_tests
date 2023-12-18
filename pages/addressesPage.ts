import { expect, type Locator, type Page } from '@playwright/test';

export class AddressesPage {
  readonly page: Page;
  readonly first_name: Locator;
  readonly last_name: Locator;
  readonly email: Locator;
  readonly country: Locator;
  readonly city: Locator;
  readonly address1: Locator;
  readonly zip_postal_code: Locator;
  readonly phone: Locator;
  readonly button_add_address: Locator;
  readonly button_save: Locator;

  constructor(page: Page) {
    this.page = page;
    this.first_name = page.locator('#Address_FirstName');
    this.last_name = page.locator('#Address_LastName');
    this.email = page.locator('#Address_Email');
    this.country = page.locator('#Address_CountryId');
    this.city = page.locator('#Address_City');
    this.address1 = page.locator('#Address_Address1');
    this.zip_postal_code = page.locator('#Address_ZipPostalCode');
    this.phone = page.locator('#Address_PhoneNumber');
    this.button_add_address = page.locator('.add-address-button');
    this.button_save = page.locator('.save-address-button');
  }

  async addNewAddress(user) {
    await this.button_add_address.click();
    await this.fillRequiredFields(user);
    await this.button_save.click();
    await expect(this.page).toHaveURL('/customer/addresses');
  }

  async fillRequiredFields(user) {
    await this.first_name.fill(user.firstName);
    await this.last_name.fill(user.lastName);
    await this.email.fill(user.email);
    await this.country.selectOption(user.country);
    await this.city.fill(user.city);
    await this.address1.fill(user.address1);
    await this.zip_postal_code.fill(user.zip_postal_code);
    await this.phone.fill(user.phone);
  }

}
