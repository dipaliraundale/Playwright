import { test, expect } from "@playwright/test";
import path from "path";

const colors = {
  chromium: "\x1b[36m", // cyan
  firefox: "\x1b[33m", // yellow
  webkit: "\x1b[35m", // magenta
  edge: "\x1b[32m", // green
  reset: "\x1b[0m",
};

test("Check the blinking text and open a new page", async ({ browser,browserName }) => {
  console.log(`${colors[browserName] || ""}Running on browser: ${browserName}${colors.reset}`);
  test.setTimeout(90000);
   const context = await browser.newContext();
   const page = await context.newPage();

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/"); 
  
 //await page.pause();
  const docLink = page.locator("[href*='documents-request']");
 await expect(docLink).toHaveAttribute("class", /blinkingText/, { timeout: 15000 });///if didnt mentioned the timeout then script is not executing


  const [NewPageControl]= await Promise.all(   ///Not necessory it open one page it shuld be more than 2 then always store it in array
    [context.waitForEvent('page'),//litsen for any new page //winddow handle    ///for the opening the new page the line 20 and 21 should execute the paralley for that we have to use "promise.all and removed the awaits keyword"
    docLink.click(),
]  )   /////from 24 to 27 step new page is opened
 
const text= await NewPageControl.locator (".red").textContent();

console.log(text)
   

 console.log(`${colors[browserName] || ''}Test passed on ${browserName}${colors.reset}`);
});

///extract text from the anpther/child window and paste that text inthe previous/parent window
test.only("Check the blinking text and open a new page and grab any text and paste in the privious window", async ({ browser,browserName }) => {
  console.log(`${colors[browserName] || ""}Running on browser: ${browserName}${colors.reset}`);
  test.setTimeout(90000);
   const context = await browser.newContext();
   const page = await context.newPage();

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/"); 
  await page.pause();

  const docLink = page.locator("[href*='documents-request']");
 await expect(docLink).toHaveAttribute("class", /blinkingText/, { timeout: 15000 });///if didnt mentioned the timeout then script is not executing


  const [NewPageControl]= await Promise.all(   ///Not necessory it open one page it shuld be more than 2 then always store it in array
    [context.waitForEvent('page'),//litsen for any new page //winddow handle    ///for the opening the new page the line 20 and 21 should execute the paralley for that we have to use "promise.all and removed the awaits keyword"
    docLink.click(),
]  )   /////from 24 to 27 step new page is opened
 
const text= await NewPageControl.locator (".red").textContent(); //// textconytent only return a valuse when the element is attached to DOM
//const text= await NewPageControl.locator (".red").inputValue(); ///retuen the text prenst in the paraent window 



console.log(text)
NewPageControl .pause();
const ArrayText = text.split("@");
const arrayText = "rahulshettyacademy.com learning portal";
const domain = (arrayText ?? '').trim().split(/\s+/)[0] || '';    //?? '' → if value is null or undefined, use empty string,.trim() → remove extra spaces,.split(/\s+/) → split text into words by space,[0] → take the first word,|| '' → return empty string if nothing fou
console.log(domain);
await page.locator("#username").fill(domain)
 console.log(`${colors[browserName] || ''}Test passed on ${browserName}${colors.reset}`);
});
