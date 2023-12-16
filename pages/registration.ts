import { expect, type Locator, type Page } from '@playwright/test';
import { HeaderComponent } from '../components/header';

export class RegistrationPage {
  readonly page: Page;
  readonly first_name: Locator;
  readonly last_name: Locator;
  readonly email: Locator;
  readonly password: Locator;
  readonly confirm_password: Locator;
  readonly button_register: Locator;
  readonly button_continue: Locator;
  readonly result: Locator;

  constructor(page: Page) {
    this.page = page;

    this.first_name = page.locator('#FirstName');
    this.last_name = page.locator('#LastName');
    this.email = page.locator('#Email');
    this.password = page.locator('#Password');
    this.confirm_password = page.locator('#ConfirmPassword');

    this.button_register = page.locator('#register-button');
    this.button_continue = page.locator('.register-continue-button');

    this.result = page.locator('.result');
  }

  async open() {
    const headerComponent = new HeaderComponent(this.page);
    await headerComponent.register.click();
    await expect(this.page).toHaveURL('/register?returnUrl=%2F');
  }

  async registerWithValidData() {
    // TODO: generate data
    const newUser = {
      firstName: 'qqq',
      lastName: 'qqqlast',
      email: 'test5@test.com',
      password: '123456',
      confirmPassword: '123456'
    };
    await this.fillRequiredFields(newUser);
    await this.button_register.click();
    await expect(this.page).toHaveURL('/registerresult/1?returnUrl=/');
    await expect(this.result).toHaveText('Your registration completed');
    await this.button_continue.click();
    await expect(this.page).toHaveURL('/');
  }

  async registerWithEmptyFields() {
    await this.button_register.click();
    // TODO: check validation
  }

  async registerWithShortPasswords() {
    // TODO: generate data
    const newUser = {
      firstName: 'qqq',
      lastName: 'qqqlast',
      email: 'test6@test.com',
      password: '123',
      confirmPassword: '123'
    };
    await this.fillRequiredFields(newUser);
    await this.button_register.click();
    // TODO: check validation

  }

  async registerWithMismatchedPasswords() {
    // TODO: generate data
    const newUser = {
      firstName: 'qqq',
      lastName: 'qqqlast',
      email: 'test6@test.com',
      password: '123456',
      confirmPassword: '111111'
    };
    await this.fillRequiredFields(newUser);
    await this.button_register.click();
    // TODO: check validation
  }

  async fillRequiredFields(user) {
    await this.first_name.fill(user.firstName);
    await this.last_name.fill(user.lastName);
    await this.email.fill(user.email);
    await this.password.fill(user.password);
    await this.confirm_password.fill(user.confirmPassword);
  }

}
