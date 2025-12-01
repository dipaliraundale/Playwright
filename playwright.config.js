// @ts-check
import { defineConfig, devices } from '@playwright/test'

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  timeout: 20 * 1000, ////time out for overall test
  expect: {
    timeout: 5000 //time out for expect condition
  },
  fullyParallel: true,

  //  Fail CI if test.only is present
  forbidOnly: !!process.env.CI,

  // Retry only on CI
  retries: process.env.CI ? 2 : 0,

  //  Use more workers locally, fewer on CI
  workers: process.env.CI ? 1 : 2,

  // -----------------------------------------
  //  REPORTERS (IMPORTANT FOR CI/CD)
  // -----------------------------------------
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['github'], // Adds annotations to PRs in GitHub
  ],

  // -----------------------------------------
  //  ARTIFACTS (screenshots, traces, videos)
  // -----------------------------------------
  outputDir: 'test-results/',

  use: {
    browserName: 'firefox', // default browser for all tests
    headless: false,
    screenshot: 'on',
    trace: 'retain-on-failure',  ///if we on it then generate trace for every test case and off will not geterete

    launchOptions: {
      //  Use browser-specific args for fullscreen behavior
      args: process.env.BROWSER === 'firefox'
        ? ['-width', '1920', '-height', '1080'] // Firefox specific args
        : ['--start-maximized'], // Chromium/Edge args to maximize the browser
    },

    viewport: null, // Ensures browser uses native full window size
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { 
        // Spread the base device but override conflicting properties
        ...devices['Desktop Chrome'],
        deviceScaleFactor: undefined, // Removes conflict with null viewport
        viewport: null, // Allow full screen window
        headless: false,
        launchOptions: {
          args: ['--start-maximized'], //  Works for Chromium/Edge
        },
      },
    },
    {
      name: 'firefox',
      use: { 
        // Spread the base device but override conflicting properties
        ...devices['Desktop Firefox'],
        deviceScaleFactor: undefined, //  Removes conflict with null viewport
        viewport: null, //  Allow full screen window
        headless: false,
        launchOptions: {
          args: ['--start-fullscreen'], // Firefox-specific fullscreen
        },
      }, 
    },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'], headless: true }, //////Safari browser
    // },
    // {
    //   name: 'Edge',
    //   use: { 
    //     ...devices['Desktop Edge'],
    //     channel: 'msedge',   // Correct way to run Microsoft Edge
    //     headless: true,
    //     viewport: null, //  Allow full screen window
    //     launchOptions: {
    //       args: ['--start-maximized'], //  Edge fullscreen
    //     },
    //   },
    // },
  ],
});
