import { test, expect } from '@playwright/test';

test('basic test', async ({browser}) => {
   const context = await browser.newContext();
   const page = await context.newPage();
   await page.goto('https://www.google.com');
   await page.waitForTimeout(5000);
   await page.close();
}); 

test('Book Store search', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  const bookStoreCard = page.locator('div.card-body:has-text("Book Store Application")');
  await expect(bookStoreCard).toBeVisible();
  await bookStoreCard.click();
  const searchBox = page.getByRole('textbox', { name: 'Type to search' });
  await expect(searchBox).toBeVisible();
  await searchBox.fill('Git Pocket Guide');
  const bookLink = page.getByRole('link', { name: 'Git Pocket Guide' });
  await expect(bookLink).toBeVisible();
  await bookLink.click();
  console.log('booklined', bookLink);
  await expect(page).toHaveURL('https://demoqa.com/books?book=9781449325862');
});


test(' form submission', async ({ page }) => {


});
