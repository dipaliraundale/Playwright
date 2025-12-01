// register_login.spec.js
const { test, expect } = require('@playwright/test');
const {RegisterUser} = require('../Pageobjects/RegisterUser.js');

test('Register &  login', async ({ page }) => {

  const registerUser = new RegisterUser(page); /// create object of page object class

//renerate the random user name  ///// we can put this in page object also
  function randomString(length = 6) {
    const chars = 'abcdefghijklmnopqrstuvwxyz';
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  }

  const firstName = randomString();
  const lastName = randomString();
  const email = `user${Date.now()}@example.com`;
  const password = 'P@ssw0rd123!';
  const phoneNumber = '9876543210';
 
  await registerUser.goto();
  await registerUser.ValidateRegisteration(firstName, lastName, email, password, phoneNumber);

await page.waitForLoadState('networkidle');

});



/**Below is the code for Pageobjects/RegisterUser.js file in the simplest form without random data generation****/


/*
const { test } = require('@playwright/test');
const { RegisterUser } = require('../Pageobjects/RegisterUser.js');

test('Register & login', async ({ page }) => {
  const registerUser = new RegisterUser(page);

  //  Call your helper inside the page object
  const userData = registerUser.generateUserData();

  await registerUser.goto();
  await registerUser.ValidateRegisteration(
    userData.firstName,
    userData.lastName,
    userData.email,
    userData.password,
    userData.phoneNumber
  );

  await page.waitForLoadState('networkidle');
});
*/