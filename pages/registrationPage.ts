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
    const header = new HeaderComponent(this.page);
    await header.register.click();
    await expect(this.page).toHaveURL('/register?returnUrl=%2F');
  }

  async registerWithValidData(user) {
    await this.fillRequiredFields(user);
    await this.button_register.click();
    await expect(this.page).toHaveURL('/registerresult/1?returnUrl=/');
    await expect(this.result).toHaveText('Your registration completed');
    await this.button_continue.click();
    await expect(this.page).toHaveURL('/');
  }

  async tryEmptyFields() {
    await this.button_register.click();
    await expect(this.page.getByText('First name is required.')).toBeVisible();
    await expect(this.page.getByText('Last name is required.')).toBeVisible();
    await expect(this.page.getByText('Email is required.')).toBeVisible();
    await expect(this.page.getByText('Password is required.')).toHaveCount(2);
  }

  async tryWrongEmail(email: string) {
    await this.email.fill(email);
    await this.button_register.click();
    await expect(this.page.getByText('Wrong email')).toBeVisible();
    await this.makeSureUrlNotChanged();
  }

  async tryShortPassword(password: string) {
    await this.password.fill(password);
    await this.button_register.click();
    await expect(this.page.getByText('Password must meet the following rules: must have at least 6 characters')).toBeVisible();
    await this.makeSureUrlNotChanged();
  }

  async tryMismatchedPasswords(password: string, confirmPassword: string) {
    await this.password.fill(password);
    await this.confirm_password.fill(confirmPassword);
    await this.button_register.click();
    await expect(this.page.getByText('The password and confirmation password do not match.')).toBeVisible();
    await this.makeSureUrlNotChanged();
  }

  async makeSureUrlNotChanged() {
    await this.page.mainFrame().waitForTimeout(1000); // to be sure that the user is not registered - the URL doesn't change
    await expect(this.page).toHaveURL('/register?returnUrl=%2F');
  }

  async fillRequiredFields(user) {
    await this.first_name.fill(user.firstName);
    await this.last_name.fill(user.lastName);
    await this.email.fill(user.email);
    await this.password.fill(user.password);
    await this.confirm_password.fill(user.confirmPassword);
  }

}
