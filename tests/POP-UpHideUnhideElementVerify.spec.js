const{test,expect} = require("@playwright/test");

test("Hide and Unhide Element Verification",async({page})=>{

await  page.goto("https://www.google.com/");    
await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
await page.goBack();  ////// navigate back to previous page
await page.goForward();         //// navigate back and forth between pages
await page.reload();       

await expect(page.locator("#displayed-text")).toBeVisible();   //// verifying element is visible

await page.locator("#hide-textbox").click();   //// hiding the element

await expect(page.locator("#displayed-text")).toBeHidden();   //// verifying element is hidden

await page.locator("#show-textbox").click();   //// showing the element

await expect(page.locator("#displayed-text")).toBeVisible();   //// verifying element is visible

});



test("dialog box close",async({page})=>{
await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

   // page.on('dialog', dialog => dialog.dismiss()); //// event listener to handle dialog box to cancel it
    page.on('dialog', dialog => dialog.accept()); ///// event listener to handle dialog box to accept it
    await page.locator("#confirmbtn").click();   //// clicking on button which triggers dialog box

});



test("Mouse hover element",async({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/"); 
   await page.locator("#mousehover").hover();   //// hovering on element to reveal hidden options

});