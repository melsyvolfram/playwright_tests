import { expect, type Locator, type Page } from '@playwright/test';
import { HeaderComponent } from '../components/header';

export class LoginPage {
  readonly page: Page;
  readonly email: Locator;
  readonly password: Locator;
  readonly button_login: Locator;

  constructor(page: Page) {
    this.page = page;
    this.email = page.locator('#Email');
    this.password = page.locator('#Password');
    this.button_login = page.locator('.login-button');
  }

  async open() {
    const header = new HeaderComponent(this.page);
    await header.login.click();
    await expect(this.page).toHaveURL('/login?returnUrl=%2F');
  }

  async loginWithValidData(user) {
    await this.fillRequiredFields(user);
    await this.button_login.click();
    await expect(this.page).toHaveURL('/');
  }

  async fillRequiredFields(user) {
    await this.email.fill(user.email);
    await this.password.fill(user.password);
  }

}
