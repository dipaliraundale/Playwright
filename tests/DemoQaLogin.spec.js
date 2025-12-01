import { test, expect } from '@playwright/test';

test.only('Shopping Page & buy products', async ({ page }) => {
  const Mobile = "Samsung galaxy s7";

  // --- Go to homepage ---
  await page.goto("https://www.demoblaze.com/index.html");
  await page.waitForLoadState("networkidle");
  //await page.pause();
  // --- Find the product dynamically ---
  const products = page.locator(".card-block");
  const totalProducts = await products.count();
  console.log(`Total products found: ${totalProducts}`);

  let productFound = false;
  for (let i = 0; i < totalProducts; i++) {
    const productTitle = await products.nth(i).locator("h4 a").textContent();
    if (productTitle.trim() === Mobile) {
      console.log(`Product found: ${Mobile}`);
      await products.nth(i).locator("h4 a").click();
      productFound = true;
      break;
    }
  }

  if (!productFound) {
    throw new Error(`Product "${Mobile}" not found`);
  }

  // --- Add to cart ---
  page.on('dialog', async dialog => {
    console.log("Alert message:", dialog.message());
    await dialog.accept();
  });
const button = page.locator(".btn.btn-success.btn-lg");
await button.waitFor({ state: 'visible', timeout: 30000 });  // wait up to 30s
await button.click();
  await page.waitForTimeout(2000);

  // --- Go to Cart ---
const cartButton = page.locator('a#cartur'); 
await cartButton.waitFor({ state: 'visible', timeout: 30000 }); // wait up to 30s
await cartButton.scrollIntoViewIfNeeded(); // make sure it's in view
await cartButton.click();
await page.waitForTimeout(2000);


  // --- Verify product in cart ---
  await expect(page.locator(`td:has-text("${Mobile}")`)).toBeVisible();

  // --- Place the order ---
  await page.locator(".btn.btn-success").click();

  // --- Fill order form ---
  await page.fill('#name', 'Test User');
  await page.fill('#country', 'India');
  await page.fill('#city', 'Pune');
  await page.fill('#card', '1234567890123456');
  await page.fill('#month', '10');
  await page.fill('#year', '2025');
  await page.locator('button:has-text("Purchase")').click();

  // --- Verify purchase success ---
  const confirmation = await page.locator('.sweet-alert > h2').textContent();
  console.log('Purchase confirmation:', confirmation);
  expect(confirmation).toContain('Thank you for your purchase');
});
