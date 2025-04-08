const selectors = {
    cookieBanner: '#onetrust-banner-sdk',
    acceptCookiesBtn: '#onetrust-accept-btn-handler'
}


export async function acceptCookies() {
    try {
        const cookieBanner = page.locator(selectors.cookieBanner);
        await cookieBanner.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {
            console.log('Cookie banner not visible, may have been accepted already');
            return;
        });
        
        if (await cookieBanner.isVisible()) {
            await page.locator(selectors.acceptCookiesBtn).click();
            await cookieBanner.waitFor({ state: 'hidden', timeout: 5000 });
        }
    } catch (error) {
        throw new Error('Error whilst accepting cookies ' + error.message);
    }
}