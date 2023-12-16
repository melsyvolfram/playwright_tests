import { test } from '@playwright/test';
import { ActionsComponent } from '../components/actions';
import { CartPage } from '../pages/cart';

test('Existing User Login and Checkout', async ({ page }) => {

  await page.goto('/books');
  const actionsComponent = new ActionsComponent(page);
  await actionsComponent.addToCart(); // TODO: Add multiple products

  const cartPage = new CartPage(page);
  await cartPage.open();

  // TODO: continue test here: Modify the quantity of a product;  Remove a product from the cart; Verify that the cart is updated accordingly.

});
