class RegisterUser {    

    constructor(page) {
        this.page = page;
        this.firstName = page.locator('#firstName');
        this.lastName = page.locator('#lastName');
        this.userEmail = page.locator('#userEmail');
        this.userPassword = page.locator('#userPassword');
        this.confirmPassword = page.locator('#confirmPassword');
        this.userMobile = page.locator('#userMobile');
        this.registerButton = page.locator('input[value="Register"]');
        this.termsCheckbox = page.locator("input[type='checkbox']");
        this.loginButton = page.locator('#login');
        this.successMessage = page.locator('.headcolor');
    
    }
    async goto() {
        await this.page.goto('https://rahulshettyacademy.com/client/#/auth/register');
    }

    async ValidateRegisteration(firstName, lastName, email, password, phoneNumber) {

        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.userEmail.fill(email);
        await this.userPassword.fill(password);
        await this.confirmPassword.fill(password);
        await this.userMobile.fill(phoneNumber);
        await this.registerButton.click();
        await this.termsCheckbox.check();  
        await this.loginButton.click();
        return this.successMessage.textContent('Account Created Successfully');
    }
}

module.exports = { RegisterUser };



////******below is the code for generating random user details******/
/*class RegisterUser {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://example.com/register');
  }

  // Utility function to generate random strings
  randomString(length = 6) {
    const chars = 'abcdefghijklmnopqrstuvwxyz';
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  }

  // Function to create dynamic test data
  generateUserData() {
    const firstName = this.randomString(5);
    const lastName = this.randomString(6);
    const email = `${firstName}.${lastName}${Date.now()}@example.com`;
    const password = 'P@ssw0rd123!';
    const phoneNumber = '9876543210';
    return { firstName, lastName, email, password, phoneNumber };
  }

  async ValidateRegisteration(firstName, lastName, email, password, phoneNumber) {
    // your page actions here
    await this.page.fill('#firstName', firstName);
    await this.page.fill('#lastName', lastName);
    await this.page.fill('#email', email);
    await this.page.fill('#password', password);
    await this.page.fill('#phone', phoneNumber);
    await this.page.click('#registerBtn');
  }
}

module.exports = { RegisterUser }; */
