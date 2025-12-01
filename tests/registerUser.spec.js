// register_login.spec.js
const { test, expect } = require('@playwright/test');

test('Register &  login', async ({ page }) => {
  // --- Register ---
  await page.goto('https://rahulshettyacademy.com/client/#/auth/register');

  const email = `user${Date.now()}@example.com`;
  const password = 'P@ssw0rd123!';
  const phoneNumber = '9876543210'
  await page.locator('#firstName').fill('Playwright');
  await page.locator('#lastName').fill('User');
  await page.locator('#userEmail').fill(email);
  await page.locator('#userPassword').fill(password);
  await page.locator('#confirmPassword').fill(password);
  await page.locator('#userMobile').fill(phoneNumber)
  await page.locator('input[value="Register"]').click();
  await page.locator("input[type='checkbox']").check();  
  await page.locator('#login').click();
  await expect(page.locator('.headcolor')).toHaveText('Account Created Successfully');

 });
