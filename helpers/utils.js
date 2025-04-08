import { faker } from '@faker-js/faker';

export function randomPersonalData() {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = `${firstName}.${lastName}.${Date.now()}@somedomain.com`.toLowerCase();
    const phone = faker.phone.number();
    const address = {
      addressLine1: faker.location.streetAddress(),
      postcode: faker.location.zipCode(),
      city: faker.location.city(),
      country: 'United Kingdom'
    };
    const payment =  {
      cardNumber: '4111111111111111', 
      expiryDate: `${faker.date.future().getMonth() + 1}/${faker.date.future().getFullYear().toString().slice(-2)}`,
      cvv: faker.string.numeric(3)
    };
  return {
    firstName,
    lastName,
    email,
    phone,
    address,
    payment
    }
  };


export const getPriceFromInnerText = async (locator) => (await locator.innerText()).trim().slice(1);

 export async function fillData(selector, inputData, locator = page) {
    const el = await locator.locator(selector);
    await el.fill(inputData);
 }

