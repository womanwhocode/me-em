# About

This project uses Playwright(JS) framework with expect-playwright library. 
This project uses Playwright's test runner and is configured to run tests in Chrome.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Install Playwright browsers:
```bash
npx playwright install
```

## Running Tests

```bash
npm test
```

## Project Structure

- `tests/` - Test files
- `helpers/` - generic function and DOM helpers
- `playwright.config.js` - Playwright configuration. Change browsers and headless mode here. 
- `testData.js` - data that is passed to tests is managed here
- `fixtures.js` - global test set-up

## Stack

- Playwright - Browser automation library
- expect-playwright - Additional assertions for Playwright 


## Description 

Since the assignment has quite a big scope, I focused on organising tests like if it was for a scalable robust framework. With my approach, testData is managed in a separate file and passed to tests, selectors are stored in one place and easier to update, generic functions are stored separately and there's error handling too. A screenshot is create on failure basis. 

1. Complete an order : a user opens a product, selects a size, checks cart, checks data at checkout, enters delivery and payment details (card) and send an order.

Note: the third test will fail in this case scenario: I'm experiencing UI instability on checkout after entering email, tried a lot of ways to handle it, but decided to move on and submit the assignment. I'll update the project If I have more time to find a solution. Looking forward to hearing from you.

2. Unhappy path : a user opens a product, does not select a size, clicks add to bag button.

### What else would I add

Of course, there're plenty of things that would be added here if it was a real project:
 - translations for different locales
 - unify selectors
 - configure to parallel testing
 - create more custom function for DOM interactions
 - logger
 - testing integration with OMS
 - running tests in different browsers
 - global set-up files
 - linting
 - add SKU and quantity to product data
 - assertion to check the payment is completed
