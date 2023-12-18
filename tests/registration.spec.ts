import { test } from '@playwright/test';
import { RegistrationPage } from '../pages/registrationPage';

test('Invalid Signup Attempt', async ({ page }) => {

  await page.goto('/');
  const registrationPage = new RegistrationPage(page);
  await registrationPage.open();
  await registrationPage.tryEmptyFields();
  await registrationPage.tryWrongEmail('@gmail.com');
  await registrationPage.tryShortPassword('123');
  await registrationPage.tryMismatchedPasswords('123456', '111111');

});
