import { test } from '@playwright/test';
import { ActionsComponent } from '../components/actions';
import { CartPage } from '../pages/cartPage';
import { ProductBoxComponent } from '../components/productBox';

test('Verify Cart Functionality', async ({ page }) => {

  await page.goto('/books');
  const productBox = new ProductBoxComponent(page);

  const firstProductName = await productBox.getProductName(1);
  const firstProductQuantity = 2;
  const firstProductPrice = await productBox.getProductPrice(1);
  const firstProductTotalPrice = firstProductPrice * firstProductQuantity;

  const secondProductName = await productBox.getProductName(2);
  const secondProductQuantity = 1;
  const secondProductPrice = await productBox.getProductPrice(2);
  const secondProductTotalPrice = secondProductPrice * secondProductQuantity;

  const actions = new ActionsComponent(page);
  await actions.addToCart(1);
  await actions.addToCart(1);
  await actions.addToCart(2);

  const cartPage = new CartPage(page);
  await cartPage.open();
  await cartPage.checkItemsQuantity(2);
  await cartPage.checkOrderSubtotalPrice(firstProductTotalPrice + secondProductTotalPrice);

  await cartPage.checkProductName(1, firstProductName);
  await cartPage.checkProductQuantity(1, firstProductQuantity);
  await cartPage.checkProductPrice(1, firstProductPrice);
  await cartPage.checkProductTotalPrice(1, firstProductTotalPrice);

  await cartPage.checkProductName(2, secondProductName);
  await cartPage.checkProductQuantity(2, secondProductQuantity);
  await cartPage.checkProductPrice(2, secondProductPrice);
  await cartPage.checkProductTotalPrice(2, secondProductTotalPrice);

  const firstProductNewQuantity = 4;
  const firstProductNewTotalPrice = firstProductPrice * firstProductNewQuantity;
  await cartPage.setProductQuantity(1, firstProductNewQuantity);
  await cartPage.updateCart();
  await cartPage.checkProductQuantity(1, firstProductNewQuantity);
  await cartPage.checkProductTotalPrice(1, firstProductNewTotalPrice);
  await cartPage.checkOrderSubtotalPrice(firstProductNewTotalPrice + secondProductTotalPrice);

  await cartPage.removeProduct(1);
  await cartPage.checkItemsQuantity(1);
  await cartPage.checkProductName(1, secondProductName);
  await cartPage.checkOrderSubtotalPrice(secondProductTotalPrice);

});
