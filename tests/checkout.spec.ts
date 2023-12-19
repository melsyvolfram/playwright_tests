import { test } from '@playwright/test';
import { RegistrationPage } from '../pages/registrationPage';
import { LoginPage } from '../pages/loginPage';
import { CartPage } from '../pages/cartPage';
import { CheckoutPage } from '../pages/checkoutPage';
import { AddressesPage } from '../pages/addressesPage';
import { ActionsComponent } from '../components/actions';
import { UserFactory } from '../factories/user';

test('User Signup and Checkout', async ({ page }) => {

  const userFactory = new UserFactory();
  const user = userFactory.build({});

  await page.goto('/');
  const registrationPage = new RegistrationPage(page);
  await registrationPage.open();
  await registrationPage.registerWithValidData(user);

  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.loginWithValidData(user);

  await page.goto('/books');
  const actions = new ActionsComponent(page);
  await actions.addToCart(1);

  const cartPage = new CartPage(page);
  await cartPage.open();
  await cartPage.proceedToCheckout();

  const checkoutPage = new CheckoutPage(page);
  await checkoutPage.setBillingAddress(user);
  await checkoutPage.setShippingMethod(1);
  await checkoutPage.setPaymentMethod(1);
  await checkoutPage.continuePayingByCheck();
  await checkoutPage.button_confirm.click();
  await checkoutPage.purchaseSuccessConfirmation();

});

test('Existing User Login and Checkout', async ({ page }) => {

  // --- PRECONDITION START ---
  // In a real project precondition should be done by API or other backend way, not by clicking in UI. It's an example project and I don't have access to the API, that's why here precondition is done in UI.
  const userFactory = new UserFactory();
  const user = userFactory.build({});

  await page.goto('/');
  const registrationPage = new RegistrationPage(page);
  await registrationPage.open();
  await registrationPage.registerWithValidData(user);

  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.loginWithValidData(user);

  await page.goto('/customer/addresses');
  const addressesPage = new AddressesPage(page);
  await addressesPage.addNewAddress(user);
  // --- PRECONDITION END ---

  await page.goto('/books');
  const actions = new ActionsComponent(page);
  await actions.addToCart(1);

  const cartPage = new CartPage(page);
  await cartPage.open();
  await cartPage.proceedToCheckout();

  const checkoutPage = new CheckoutPage(page);
  await checkoutPage.continueWithExistingBillingAddress();
  await checkoutPage.setShippingMethod(2);
  await checkoutPage.setPaymentMethod(2);
  await checkoutPage.setPaymentInfoCreditCard();
  await checkoutPage.button_confirm.click();
  await checkoutPage.purchaseSuccessConfirmation();

});
