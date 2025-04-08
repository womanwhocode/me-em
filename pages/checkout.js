import { fillData } from "../helpers/utils";
import { expect } from '../fixtures';


const selectors = {
    // expressCheckout: '"heading", { name: "Express checkout options:" }',
    email: {
        form: 'signInOrRegister',
        input: 'input[type="email"]',
    },
    continueBtn: 'button',
    deliveryAddress: {
        form: 'deliveryAddress',
        firstName: 'input[name="firstName"]',
        lastName: 'input[name="lastName"]',
        phoneNumber: 'input[name="telephone"]',
        addressLine1: 'input[name="addressLine1"]',
        city: 'input[name="city"]',
        postcode: 'input[name="postcode"]',
        countryDropdown: 'select[name="countryCode"]',
        regionDropDown: 'select[name="regionCode"]'
    },
    billingAddress: 'billingAddress',
    radioBtn: 'input[name="radio"]',
    deliveryMethod: 'deliveryOptions',
    paymentMethod: {
        form: 'payment',
        payBtn: '.adyen-checkout__button--pay',
        cardNumber: '#adyen-checkout-encryptedCardNumber-1744023616673',
        expiryDate: '#adyen-checkout-encryptedExpiryDate-1744023616674',
        securityCode: '#adyen-checkout-encryptedSecurityCode-1744023616675',
        cardHolder: '#adyen-checkout-holderName-1744023616676'
    },
}


export async function enterEmail(email) {
    try {
        const form = await page.getByTestId(selectors.email.form);
        await fillData(selectors.email.input, email);
        await clickSubmitBtn('Continue', form);
        const checkout = await page.getByRole('heading', { name: 'Express checkout options:' });
        const tick = await page.getByTestId('signInOrRegister').getByRole('img');
        await expect(checkout).toBeVisible();
        await expect(tick).toBeVisible();
        // await (page.locator(selectors.deliveryAddress.firstName)).click();
    } catch (error) {
        throw new Error('Error whilst entering email: ' + error.message);
    }
}


export async function enterDeliveryAddress(userData) {
    try {
        const country = await page.getByLabel('Country*');
        await country.click();
        await country.selectOption(userData.address.country);
        
        if (userData.address.region) {
            const region = await page.getByLabel('Region*');
            await region.click();
            await region.selectOption(userData.address.region);
        }

        // UI is quite unstable here, needed more time to find a way to handle it
        const addressBlock = await page.getByTestId(selectors.deliveryAddress.form);
        await fillData(selectors.deliveryAddress.firstName, userData.firstName, addressBlock);
        await fillData(selectors.deliveryAddress.lastName, userData.lastName, addressBlock);
        await fillData(selectors.deliveryAddress.phoneNumber, userData.phoneNumber, addressBlock);
        await fillData(selectors.deliveryAddress.addressLine1, userData.address.addressLine1);
        

        await fillData(selectors.deliveryAddress.postcode, userData.address.postcode);
        await fillData(selectors.deliveryAddress.city, userData.address.city);
        const form = await page.locator(selectors.deliveryAddress.form);
        await clickSubmit('Submit to Continue', form);
        await expect(page.getByTestId(selectors.billingAddress)).toBeEnabled();
    } catch (error) {
        throw new Error('Error whilst entering delivery address: ' + error.message);
    }
}

export async function chooseTheSameBillingAddress() {
    try{
        await page.locator(selectors.radioBtn, {hasText: /same/ }).check();
        await clickSubmitBtn('Submit to Continue');
        await expect(page.getByTestId(selectors.deliveryMethod)).toBeEnabled();
    } catch(error) {
        throw new Error('Error whilst submitting choosing billing address ' + error.message);
    }
}

export async function chooseDeliveryMethod(testData) {
    try {
        await page.locator(selectors.radioBtn, {hasText: `/${testData.deliveryPrice}/` }).check();
        await clickSubmit('Submit to Continue');
        await expect(page.getByTestId(selectors.paymentMethod.form)).toBeEnabled();
    } catch(error) {
        throw new Error('Error whilst choosing delivery method ' + error.message);
    }
}

export async function choosePaymentMethodAndPay(testData, userData = {}) {
    try {
        if (testData.paymentMethod == 'card') {
            await entryCardDetails(userData);
        } else if (testData.paymentMethod == 'PayPal') {
            await page.locator(selectors.radioBtn, {hasText: /PayPal/ }).check();
        }
        await page.locator(selectors.paymentMethod.payBtn).click();
        await expect(page).not.toMatchText('Your payment has been declined, please try another payment method or try again');
    } catch (error) {
        throw new Error('Error whilst choosing payment method ' + error.message);
    }
}

async function entryCardDetails(userData) {
    try {
        await fillData(selectors.paymentMethod.cardNumber, userData.payment.cardNumber);
        await fillData(selectors.paymentMethod.expiryDate, userData.payment.expiryDate);
        await fillData(selectors.paymentMethod.securityCode, userData.payment.cvv);
        await fillData(selectors.paymentMethod.cardHolder, `${userData.firstName} ${userData.lastName}`);
    } catch (error) {
        throw new Error('Error whilst entering card details ' + error.message);
    }
}

async function clickSubmitBtn(text, locator = page) {
    await locator.getByRole(selectors.continueBtn, {name: text})
    .click();
}

//add assertion with order confirmation 
export async function asserOrderCompleted() {
    try {
        
    } catch (error) {
        
    }
}