const{test,expect} = require("@playwright/test");

test("Iframe/frameset handle",async({page})=>{
 await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
 const framePage = page.frameLocator("#courses-iframe");   //// handling iframe using frameLocator method and id of iframe and storing it in variable
 await framePage.locator("li a[href*='lifetime-access']:visible").click();
 const text = await framePage.locator(".text h2").textContent();  ///// getting text content of element inside iframe
 console.log(text);
const arr = text.split(" ");
expect(arr[0]).toBe("Join");  ///// verifying text content
}); 