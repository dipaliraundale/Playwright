import { test, expect } from "@playwright/test";

const colors = {
  chromium: "\x1b[36m", // cyan
  firefox: "\x1b[33m", // yellow
  webkit: "\x1b[35m", // magenta
  edge: "\x1b[32m", // green
  reset: "\x1b[0m",
};

// Test 1
test("Navigate to Lutefish", async ({ browserName, page }) => {
  console.log(
    `${colors[browserName] || ""}Running on browser: ${browserName}${
      colors.reset
    }`
  );

  await page.goto("https://lutefish.com/#/login");
  const title = await page.title();
  expect(title).toBe(
    "Lutefish Online Music Collaboration Platform - All Together Now"
  );

  console.log(
    `${colors[browserName] || ""}Login test passed on ${browserName}${
      colors.reset
    }`
  );
});

// Test 2
test("Login_Lutefish", async ({ browserName, page }) => {
  console.log(
    `${colors[browserName] || ""}Running on browser: ${browserName}${
      colors.reset
    }`
  );
  test.setTimeout(90000);
  await page.goto("https://flow-future.lutefish.com/#/login");
  const title = await page.title();
  expect(title).toBe("Lutefish");

  await page.fill("#username", "sasuke.uchiha@yopmail.com");
  await page.fill("#outlined-adornment-password", "Admin");
  await page.getByRole("button", { name: "Sign In" }).click();
  await page.waitForLoadState("networkidle");

  console.log(
    `${colors[browserName] || ""}Login test passed on ${browserName}${
      colors.reset
    }`
  );
});

// Test 3
test("Login Failed Check", async ({ browserName, page }) => {
  console.log(`${colors[browserName] || ""}Running on browser: ${browserName}${colors.reset}`);
  test.setTimeout(90000);
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await page.locator("#username").fill("rahulshettyaca");
  await page.locator("[type=password]").fill("learning");
  await page.locator("#signInBtn").click();
  const errorMessage = page.locator(".alert-danger");
  await expect(errorMessage).toBeVisible();
  const messageText = await errorMessage.textContent();
  console.log("Login failed message:", messageText);
    expect(messageText).toContain("Incorrect username");
 console.log(`${colors[browserName] || ''}Login test passed on ${browserName}${colors.reset}`);
});


test("Login create variable and call it", async ({ browserName, page }) => {
  console.log(`${colors[browserName] || ""}Running on browser: ${browserName}${colors.reset}`);
  test.setTimeout(90000);
  const userName = page.locator("#username");
  const password = page.locator("[type=password]");
  const signInBtn = page.locator("#signInBtn");
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await userName.fill("rahulshetty");
  await password.fill("learning");
  await signInBtn.click();
  const errorMessage = page.locator(".alert-danger");
  await expect(errorMessage).toBeVisible();
  const messageText = await errorMessage.textContent();
  console.log("Login failed message:", messageText);
    expect(messageText).toContain("Incorrect username");
 console.log(`${colors[browserName] || ''}Login test passed on ${browserName}${colors.reset}`);
});


test("Login ", async ({ browserName, page }) => {
  console.log(`${colors[browserName] || ""}Running on browser: ${browserName}${colors.reset}`);
  test.setTimeout(90000);
  const userName = page.locator("#username");
  const password = page.locator("[type=password]");
  const signInBtn = page.locator("#signInBtn");
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await userName.fill("rahulshettyacademy");
  await password.fill("learning");
  await signInBtn.click();
  console.log (await page.locator(".card-body a").first().textContent());  ///////// grap the text and indexing the test
    console.log (await page.locator(".card-body a").nth(1).textContent());
 
 console.log(`${colors[browserName] || ''}Login test passed on ${browserName}${colors.reset}`);


});

test("Login and get all the title and waits and idle state ", async ({ browserName, page }) => {
  console.log(`${colors[browserName] || ""}Running on browser: ${browserName}${colors.reset}`);
  test.setTimeout(90000);
  const userName = page.locator("#username");
  const password = page.locator("[type=password]");
  const signInBtn = page.locator("#signInBtn");
  const title = page.locator(".card-body a");
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await userName.fill("rahulshettyacademy");
  await password.fill("learning");
  await signInBtn.click();
  await page.waitForLoadState('networkidle')///// it loads all the apis and next steps are executing
  console.log (await title.first().textContent());  ///Apply loop on the indexing
  console.log (await title.nth(1).textContent());
 await title .first().waitFor(); /// it wait for the single element  not for the mulple element return
 const alltitle =await title .allTextContents(); //// alltextContents is the method to grab all the title   (if we remove line no 121 ans 122 then test will execute with balnk array as the page is not loaded fully)
 console.log(alltitle)

  
 console.log(`${colors[browserName] || ''}Login test passed on ${browserName}${colors.reset}`);


});