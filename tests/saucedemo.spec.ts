import { test, expect } from '@playwright/test';

test('Test login as standard user successfully', async ({ page }) => {
  // Go to saucedemo page
  await page.goto('https://www.saucedemo.com/');
  // Input Standard User name
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  // Input Standard User Password
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  // Get the current URL
  //const currentUrl = page.url();
  // Assert that the URL includes "inventory.html"
  //expect(currentUrl).toContain('inventory.html');
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
    // Accessing About Page without any problem
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await page.getByRole('link', { name: 'About' }).click();
    await expect(page).toHaveURL('https://saucelabs.com/')
});

test('Test error when login as locked_out_user', async ({ page }) => {
  // Go to saucedemo page
  await page.goto('https://www.saucedemo.com/');
  // Input Standard User name
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('locked_out_user');
  // Input Standard User Password
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  
  // Find the element with the locator [data-test="error"]
  const errorElement = page.locator('[data-test="error"]');
  await expect(errorElement).toContainText('Epic sadface: Sorry, this user has been locked out.');
});


test('Test login as problem_user', async ({ page }) => {
  // Go to saucedemo page
  await page.goto('https://www.saucedemo.com/');
  // Input Standard User name
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('problem_user');
  // Input Standard User Password
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  // Get the current URL
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
  // Problem accessing About page
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.getByRole('link', { name: 'About' }).click();
  await expect(page).toHaveURL('https://saucelabs.com/error/404')
});

test('Test login as performance_glitch_user successfully but slower', async ({ page }) => {
  // Go to saucedemo page
  await page.goto('https://www.saucedemo.com/');
  // Input Standard User name
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('performance_glitch_user');
  // Input Standard User Password
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
   // Get the current time before navigating to the target URL
   const startTime = Date.now();
  await page.locator('[data-test="login-button"]').click();
  // Calculate the time taken to navigate from the initial URL to the target URL
  const navigationTime = Date.now() - startTime;

  // Assert that the navigation time is as expected
  const expectedTime = 3000; // Expected time in milliseconds
  expect(navigationTime).toBeGreaterThan(expectedTime);
  // Get the current URL
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
});

test('Test error with invalid user name', async ({ page }) => {
  // Go to saucedemo page
  await page.goto('https://www.saucedemo.com/');
  // Input Standard User name
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('invalid_user');
  // Input Standard User Password
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  
  // Find the element with the locator [data-test="error"]
  const errorElement = page.locator('[data-test="error"]');
  await expect(errorElement).toContainText('Epic sadface: Username and password do not match any user in this service');
});


test('Test error with invalid password', async ({ page }) => {
  // Go to saucedemo page
  await page.goto('https://www.saucedemo.com/');
  // Input Standard User name
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  // Input Standard User Password
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('invalid_password');
  await page.locator('[data-test="login-button"]').click();
  
  // Find the element with the locator [data-test="error"]
  const errorElement = page.locator('[data-test="error"]');
  await expect(errorElement).toContainText('Epic sadface: Username and password do not match any user in this service');
});

test('Test error with blank username', async ({ page }) => {
  // Go to saucedemo page
  await page.goto('https://www.saucedemo.com/');

  // Input Standard User Password
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('invalid_password');
  await page.locator('[data-test="login-button"]').click();
  
  // Find the element with the locator [data-test="error"]
  const errorElement = page.locator('[data-test="error"]');
  await expect(errorElement).toContainText('Epic sadface: Username is required');
});

test('Test error with blank password', async ({ page }) => {
  // Go to saucedemo page
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="login-button"]').click();
  
  // Find the element with the locator [data-test="error"]
  const errorElement = page.locator('[data-test="error"]');
  await expect(errorElement).toContainText('Epic sadface: Password is required');
});