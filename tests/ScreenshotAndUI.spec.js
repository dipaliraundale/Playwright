const{test,expect} = require("@playwright/test");

test("capture screenshot",async({page})=>{
 await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
 await page.screenshot({path: 'screenshots/example.png'});   ////screenshot of the page


});

/////DYNAMIC name for screenshot with date and time stamp


test('dynamic screenshot name', async ({ page }) => {

  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

  // Generate dynamic file name based on current date and time
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-'); 
  const screenshotPath = `screenshots/example-${timestamp}.png`;

  await page.screenshot({ path: screenshotPath });

  console.log(`Screenshot saved as: ${screenshotPath}`);
});


test.only("capture screenshot of element",async({page})=>{
 await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
 await page.screenshot({path: 'screenshots/example.png'});   ////screenshot of the page
 await page.locator("#displayed-text").screenshot({path: 'screenshots/element-example.png'});  ////screenshot of a specific element

});