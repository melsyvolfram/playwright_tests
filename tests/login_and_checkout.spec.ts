import { test } from '@playwright/test';
import { LoginPage } from '../pages/login';
import { ActionsComponent } from '../components/actions';
import { CartPage } from '../pages/cart';

test('Existing User Login and Checkout', async ({ page }) => {

  await page.goto('/');

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
