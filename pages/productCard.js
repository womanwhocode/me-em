import properties, { timeouts } from "../properties";
import { url } from "./cart";
import { expect } from '../fixtures';
import { getPriceFromInnerText } from "../helpers/utils";

const selectors = {
    sizeDropdown: 'size-select-button-dropdown',
    sizeOption: 'option',
    price: 'price-display-regular',
    productInfo: 'product-detail-block',
    addToBagBtn: 'button',
    imgMosaic: '#Rleuubaj5ta',
    miniCart: '.minicart-items',
    minicartReviewBagBtn: 'link',
    outOfStock: 'dataproduct-detail-block-outofstock-info',
    title: 'product-detail-block-product-title',
    intelligentDesignBlock: 'Intelligent DesignROLL-TOP',
    cartProgress: 'region',
    sizeMsg: 'product-detail-block-invalid-size'
}

export async function open(product) {
    try {
        await page.goto(`${properties.baseURL}/${product.url}`);
        await expect(page.locator(selectors.imgMosaic)).toBeVisible();
        await expect(page.getByTestId(selectors.title)).toContainText(product.name);
        await expect(page.getByText(selectors.intelligentDesignBlock)).toBeVisible();
    } catch(error) {
        throw new Error('Error whilst opening product: ' + product + error.message);
    }
    
}

export const checkProductIsAvailable = async () => await expect(page.getByTestId(selectors.outOfStock)).not.toBeVisible();

export async function pickFirstAvailableSize() {
    try {
        await page.getByTestId(selectors.sizeDropdown).click();
        const firstAvailable = page
            .getByRole(selectors.sizeOption, {disabled: 'false'})
            .first();
        if (firstAvailable) {
            const size = (await firstAvailable.innerText()).replace(/[^0-9]/g, '');
            await firstAvailable.click();
            return size;
        } else {
            throw new Error ('No sizes are available');
        }
    } catch (error) {
        throw new Error('Error whilst finding available size: ' + error.message);
    }
}


export async function addToBag() {
    try {
        await page.getByRole(selectors.addToBagBtn, { name: 'Add to Bag'}).click();
    } catch(error) {
        throw new Error('Error whilst adding to cart ' + error.message);
    }
}

export async function assertMinicartIsDisplayed() {
    try {
        await page.waitForLoadState();
        await expect(page.locator(selectors.miniCart)).toBeVisible({visible: true});
    } catch (error) {
        throw new Error('Error whilst asserting minicart is displayed ' + error.message);
    }
}


export async function goToCart() {
    try{
        await page.getByRole(selectors.minicartReviewBagBtn, {name: 'Review Bag and Checkout'}).click();
        await expect(page.getByRole(selectors.cartProgress, { name: 'Checkout progress' })).toBeVisible();
        await expect(page).toMatchURL(url);
    } catch(error) {
        throw new Error("Error whilst opening checkout page" + error.message)
    }
}


export async function getPrice() {
    try {
        const productInfo = await page.getByTestId(selectors.productInfo);
        const priceInfoLocator = await productInfo.getByTestId(selectors.price);
        return getPriceFromInnerText(priceInfoLocator);
    } catch (error) {
        throw new Error('Error whilst getting product price: ' + error.message);
    }
}

export async function selectSizeMsgIsShown() {
    try {
        const msg = await page.getByTestId(selectors.sizeMsg);
        await expect(msg).toBeVisible();
    } catch (error) {
        throw new Error('Error whilst asserting select size message:' + error.message)
    }
}
 

