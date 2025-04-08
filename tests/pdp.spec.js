import * as productCardPage from '../pages/productCard';
import * as cartPage from '../pages/cart';
import * as checkoutPage from '../pages/checkout';
import properties from "../properties";
import { acceptCookies } from "../pages/home";
import { test } from '../fixtures';
import { randomPersonalData } from '../helpers/utils';
import { testData } from '../testData';

const userData = randomPersonalData();
userData.address.city = testData.city;
userData.address.country = testData.country;
userData.address.region = testData.region;
const productData = testData.product;

test.describe.serial('Complete an order', () => {
  let page;

  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    page = await context.newPage();
    global.page = page;
    await page.goto(properties.baseURL);
    await acceptCookies();
  });

  test('User should be able to choose size and add a product to cart', async () => {
    await productCardPage.open(productData);
    await productCardPage.checkProductIsAvailable();
    productData.size = await productCardPage.pickFirstAvailableSize();
    productData.price = await productCardPage.getPrice();
    await productCardPage.addToBag();
    await productCardPage.assertMinicartIsDisplayed();
    await productCardPage.goToCart();
  });

  test('User should be able to review cart', async() => {
    testData.totalPrice = cartPage.calculateTotal(productData, testData.deliveryPrice);
    await cartPage.checkOrderSummary(testData);
    await cartPage.goToCheckout();
  });

  test('User should be able to fill in delivery details and complete purchase', async () => {
    await checkoutPage.enterEmail(userData.email);
    await checkoutPage.enterDeliveryAddress(userData);
    await checkoutPage.chooseTheSameBillingAddress();
    await checkoutPage.chooseDeliveryMethod(testData);
    await checkoutPage.choosePaymentMethodAndPay(testData, userData);
    await checkoutPage.asserOrderCompleted();
  });

  test.afterAll(async () => {
    await page.close();
  });
});

test.describe('Unhappy path', () => {
  test.beforeEach(async ({context}) => {
    global.page = page;
    page = await context.newPage();
    await page.goto(properties.baseURL);
    await acceptCookies(page);
  });
  test('User should not be able to add a product to cart without picking a size', async () => {
    await productCardPage.open(productData);
    await productCardPage.checkProductIsAvailable();
    await productCardPage.addToBag();
    await productCardPage.selectSizeMsgIsShown();
  })
})