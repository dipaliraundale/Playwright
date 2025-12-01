import { test, expect } from "@playwright/test";

test("Resourcify - Complete Flow", async ({ page }) => {

 
  console.log("Navigating to Resourcify login page...");
  await page.goto("https://resourcify.pratititech.com/");
  await page.fill('input[type="email"]', "test.user@pratititech.com");
  await page.fill('input[type="password"]', "Test@123");
  await page.click('button:has-text("Login")');
  await expect(page).toHaveURL(/.*dashboard.*/);
  await expect(page.locator("text=Overview")).toBeVisible();
  console.log("Login successful, Dashboard loaded.");
});

// // ---------------- DASHBOARD VALIDATION ----------------
//   // Verify overview counts
//   const empCount = await page.textContent('div:has-text("Employees") >> span, text=Employees >> xpath=..');
//   const projCount = await page.textContent('div:has-text("Projects") >> span, text=Projects >> xpath=..');
//   const onBench = await page.locator('text=On Bench').isVisible();

//   expect(onBench).toBeTruthy();
//   console.log(`Employees: ${empCount}, Projects: ${projCount}`);

//   // Verify Bench period filter buttons
//   const filters = ["30d", "30-60d", "60-90d", "90d"];
//   for (const filter of filters) {
//     await expect(page.locator(`button:has-text("${filter}")`)).toBeVisible();
//     await page.click(`button:has-text("${filter}")`);
//     await page.waitForTimeout(1000);
//     console.log(`✅ Verified Bench filter: ${filter}`);
//   }

//   // ---------------- NAVIGATION ----------------
//   const sideMenuItems = ["Employees", "Projects", "Customers", "Skills"];

//   for (const item of sideMenuItems) {
//     await page.click(`text=${item}`);
//     await page.waitForLoadState("networkidle");
//     await expect(page.locator(`text=${item}`)).toBeVisible();
//     console.log(`✅ Navigation to ${item} tab verified.`);
//   }

//   // ---------------- LOGOUT ----------------
//   await page.click('button:has-text("Logout")');
//   await expect(page).toHaveURL(/.*login.*/);
//   console.log("✅ Logout successful.");