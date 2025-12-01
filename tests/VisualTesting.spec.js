const{test,expect} = require("@playwright/test");

///capture screenshot of page and element and verify it on every run privious screenshot is overridden or not check button is alight with previous one or not
//screenshot--store---screenshot --compare

test('Capture and compare screenshots of page and button', async ({ page }) => {

  // Step 1: Go to website
  await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

  // Step 2: Wait for button to be visible (important to avoid timing issues)
  const button = page.locator('#checkBoxOption1');
  await button.waitFor();

  // Step 3: Capture full page screenshot and compare
  expect(await page.screenshot()).toMatchSnapshot('fullpage.png');

  // Step 4: Capture element screenshot (for specific visual alignment)
  const buttonImage = await button.screenshot();
  expect(buttonImage).toMatchSnapshot('button.png');

  // 💡 Notes:
  // - On first run: creates 'fullpage.png' & 'button.png' in __screenshots__ folder.
  // - On next runs: compares new screenshots with baseline.
  // - If mismatch detected: Playwright highlights pixel differences.
});
