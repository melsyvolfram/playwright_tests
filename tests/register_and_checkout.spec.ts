import { test } from '@playwright/test';
import { RegistrationPage } from '../pages/registration';
import { LoginPage } from '../pages/login';
import { ActionsComponent } from '../components/actions';
import { CartPage } from '../pages/cart';

test('User Signup and Checkout', async ({ page }) => {

  await page.goto('/');

  const registrationPage = new RegistrationPage(page);
  await registrationPage.open();
  await registrationPage.registerWithValidData();

  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.loginWithValidData();

  await page.goto('/books');
  const actionsComponent = new ActionsComponent(page);
  await actionsComponent.addToCart();

  const cartPage = new CartPage(page);
  await cartPage.open();
  await cartPage.proceedToCheckout();

  // TODO: continue test here - checkout process and purchase. Mayby encapsulate part of test to another file, because login/register tests have common part.

});

test('Invalid Signup Attempt', async ({ page }) => {

  await page.goto('/');

  const registrationPage = new RegistrationPage(page);
  await registrationPage.open();
  await registrationPage.registerWithEmptyFields();
  await registrationPage.registerWithShortPasswords();
  await registrationPage.registerWithMismatchedPasswords();

});
