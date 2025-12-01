import { test, expect } from "@playwright/test";

const colors = {
  chromium: "\x1b[36m", // cyan
  firefox: "\x1b[33m", // yellow
  webkit: "\x1b[35m", // magenta
  edge: "\x1b[32m", // green
  reset: "\x1b[0m",
};
test("Login & UI controls ", async ({ browserName, page }) => {
  console.log(`${colors[browserName] || ""}Running on browser: ${browserName}${colors.reset}`);
  test.setTimeout(90000);
  const userName = page.locator("#username");
  const password = page.locator("[type=password]");
  const signInBtn = page.locator("#signInBtn");
  const dropdown = page .locator("select.form-control")
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await userName.fill("rahulshettyacademy");
  await password.fill("learning");
  await page.locator('.radiotextsty').last().click(); ///radio button checked
  await page.locator('#okayBtn').click()

 await dropdown.selectOption ("consult")  ///////handle dropdown
// await page.pause();  ///pause the execution
  await signInBtn.click();
  console.log (await page.locator(".card-body a").first().textContent());  ///////// grap the text and indexing the test
    console.log (await page.locator(".card-body a").nth(1).textContent());
 
 console.log(`${colors[browserName] || ''}Login test passed on ${browserName}${colors.reset}`);
   

});

test("Login Radio button selection ", async ({ browserName, page }) => {
  console.log(`${colors[browserName] || ""}Running on browser: ${browserName}${colors.reset}`);
  test.setTimeout(90000);
  const userName = page.locator("#username");
  const password = page.locator("[type=password]");
  const signInBtn = page.locator("#signInBtn");
  const dropdown = page .locator("select.form-control")
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await userName.fill("rahulshettyacademy");
  await password.fill("learning");
  await page.locator('.radiotextsty').last().click(); ///radio button checked
  await expect (page.locator(".radiotextsty").last()).toBeChecked();///assertion for the box is checked or not
  await page.locator('#okayBtn').click()

 await dropdown.selectOption ("consult")  ///////handle dropdown
 await page.pause();  ///pause the execution
  await signInBtn.click();
  console.log (await page.locator(".card-body a").first().textContent());  ///////// grap the text and indexing the test simialrly we can use for the unchecked operations.
  
    console.log (await page.locator(".card-body a").nth(1).textContent());
 
 console.log(`${colors[browserName] || ''}Login test passed on ${browserName}${colors.reset}`);
   

});


test("check the blinking text  ", async ({ browserName, page }) => {
  console.log(
    `${colors[browserName] || ""}Running on browser: ${browserName}${
      colors.reset
    }`
  );
  test.setTimeout(90000);
  const userName = page.locator("#username");
  const password = page.locator("[type=password]");
  const signInBtn = page.locator("#signInBtn");
  const dropdown = page .locator("select.form-control")
  const docLink = page.locator("[href*='documents-request']")
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await userName.fill("rahulshettyacademy");
  await password.fill("learning");
  await expect (docLink).toHaveAttribute('class', 'blinkingText');
  console.log(docLink);
  

console.log(
    `${colors[browserName] || ""}Login test passed on ${browserName}${
      colors.reset
    }`
  );



 
 
test.only('Autosuggestion dropdown', async ({ page }) => {
   //js file- Login js, DashboardPage
   const email = "anshika@gmail.com";
   const productName = 'ZARA COAT 3';
   const products = page.locator(".card-body");
   await page.goto("https://rahulshettyacademy.com/client");
   await page.locator("#userEmail").fill(email);
   await page.locator("#userPassword").fill("Iamking@000");
   await page.locator("[value='Login']").click();
   await page.waitForLoadState('networkidle');
   await page.locator(".card-body b").first().waitFor();
   const titles = await page.locator(".card-body b").allTextContents();
   console.log(titles); 
   const count = await products.count();
   for (let i = 0; i < count; ++i) {
      if (await products.nth(i).locator("b").textContent() === productName) {
         //add to cart
         await products.nth(i).locator("text= Add To Cart").click();
         break;
      }
   }
 
   await page.locator("[routerlink*='cart']").click();
   //await page.pause();
 
   await page.locator("div li").first().waitFor();
   const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
   expect(bool).toBeTruthy();
   await page.locator("text=Checkout").click();
 
  await page.getByPlaceholder('Select Country').pressSequentially("ind", { delay: 150 })  ////////////type with delay i.e. type sequentially a delay of 150 milliseconds is introduced between each key press.That means it enters  i → (delay 150 ms) → enters n → (delay 150 ms) → enters d
   const dropdown = page.locator(".ta-results");
   await dropdown.waitFor();
   const optionsCount = await dropdown.locator("button").count();
   for (let i = 0; i < optionsCount; ++i) {
      const text = await dropdown.locator("button").nth(i).textContent();
      if (text === " India") {
         await dropdown.locator("button").nth(i).click();
         break;
      }
   }
 
   expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
   await page.locator(".action__submit").click();
   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
   const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   console.log(orderId);
 
   await page.locator("button[routerlink*='myorders']").click();
   await page.locator("tbody").waitFor();
   const rows = await page.locator("tbody tr");
 
 
   for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
   const orderIdDetails = await page.locator(".col-text").textContent();
   expect(orderId.includes(orderIdDetails)).toBeTruthy(); // truthy assertion means that the condition is expected to be true
 
});
 
 
 
 

});