import properties from "../properties";
import { expect } from "../fixtures";
import { getPriceFromInnerText } from "../helpers/utils";

export const url = `${properties.baseURL}/checkout/cart`;

const selectors = {
    checkoutBtn: 'link',
    orderSummary: '.summary-totals',
    totalPrice: '#grand-total',
    cartItemImg: 'link',
    checkoutSummary: 'basket-summary-desktop'
}

export async function checkOrderSummary(testData) {
    try {
        await expect(page.getByRole(selectors.cartItemImg, {name: `${testData.product.name}`}).first()).toBeVisible();
        await expect(page.locator(selectors.orderSummary)).toContainText(testData.product.price);
        await expect(page.locator(selectors.orderSummary)).toContainText(testData.deliveryPrice);
        const totalPriceLocator = await page.locator(selectors.totalPrice);
        const totalPriceDisplayed = await getPriceFromInnerText(totalPriceLocator);
        expect(totalPriceDisplayed).toBe(testData.totalPrice);
    } catch(e) {
        throw new Error('Error whilst validating order summary ' + e.message);
    }
}

export const calculateTotal = (product, shipping) => 
    (
        (Array.isArray(product)
          ? product.reduce((sum, p) => sum + +p.price, 0)
          : +product.price) + +shipping
      ).toString();

export async function goToCheckout() {
    try {
        const buttonLocator =  page.getByRole(selectors.checkoutBtn, {name: 'Checkout'});
        expect(buttonLocator).toBeEnabled;
        await buttonLocator.click();
        await expect(page.getByTestId(selectors.checkoutSummary)).toBeVisible();
    } catch (error) {
        throw new Error('Error whilst clicking checkout button ' + error.message);
    }
}