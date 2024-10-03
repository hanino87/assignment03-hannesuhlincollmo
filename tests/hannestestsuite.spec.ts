import { test, expect } from '@playwright/test';
import { APIHELPERS } from './apiHelpers/ApiHelpers';
import { URL_ALL_CLIENTS, URL_LOGIN, URL_UPDATE_CLIENT } from './apiHelpers/UrlVariabel';
import { Fakerdatauppdatelient } from './FakerData/Fakerdata';
import { LoginPage } from './pages/Login-page';
import { DashboardPage } from './pages/Dashboard-page';
import { BillcreatePage } from './pages/Billcreate-page';
import { BilllistPage } from './pages/Billlist-page';

test.describe('Hannes Testsuite assignment 03 Backend', () => {
  let apihelpers: APIHELPERS;
  let authorization: { username: string; token: string };

  test.beforeAll(async ({ request }) => {
    apihelpers = new APIHELPERS(URL_LOGIN, authorization, URL_ALL_CLIENTS, URL_UPDATE_CLIENT);
    const responselogin = await apihelpers.LoginBackend(request);
    authorization = responselogin; 
    return authorization
  });

  test ('testcase 01 get right response all customers and verify the testdata is in there', async ({ request }) => {
    const responseAllClients = await apihelpers.getAllClients(request,)
    expect(responseAllClients.status()).toBe(200)
    expect(responseAllClients.status()).not.toBe(401)
    const cusomterData = await responseAllClients.json();
    expect(cusomterData.length).toBeGreaterThanOrEqual(2);

  });

  test('testcase 02 uppdate a existing customer and verify the change in client list', async ({ request }) => {
    const payload = Fakerdatauppdatelient();
    const responseUpdateCustomer = await apihelpers.UppdateOneClient(request, payload);
    expect(responseUpdateCustomer.status()).toBeTruthy();
    expect(responseUpdateCustomer.status()).not.toBe(401);
    expect(await responseUpdateCustomer.json()).toMatchObject(
      expect.objectContaining({
        name: payload.name,
        email: payload.email,
        telephone: payload.telephone,
        id: payload.id
      })
    )
    const responseAllClients= await apihelpers.getAllClients(request)
    expect(responseAllClients.status()).toBe(200)
    expect(responseAllClients.status()).not.toBe(401)
    const responseAllCustomers = await apihelpers.getAllClients(request);
    expect(responseAllCustomers.ok()).toBeTruthy();
    const allCustomers = await responseAllCustomers.json();
    expect(allCustomers).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: payload.name,
          email: payload.email,
          telephone: payload.telephone,
          id: payload.id
        })
      ])
    )
  });

});

test.describe('Hannes Testsuite assignment 03 Frontend', () => {
  test.beforeEach(async ({ page }) => {
    const loginpage = new LoginPage(page);
    await loginpage.goto();
    await loginpage.performLogin(`${process.env.USERNAME}`,`${process.env.PASSWORD}`);
  });
  test('testcase 03 assert you can go to bill page ', async ({ page }) => {
    const dashboardpage= new DashboardPage(page);
    const billviewpage= new BilllistPage(page);
    await dashboardpage.clickonviewlinkforbill();
    await billviewpage.clickonheadebilllist();
    await expect(page.locator('#app > div > h2 > div')).toHaveText("Bills")
    await expect(page.locator('#app > div > h2 > div')).not.toHaveText("Tester hotel overview")
    await expect(page).toHaveURL('http://localhost:3000/bills');
    await expect(page).not.toHaveURL('http://localhost:3000/rooms');
  });

  test('testcase 04 verify that you cant fill empty value for bills', async ({ page }) => {
    const dashboardpage= new DashboardPage(page);
    const billviewpage= new BilllistPage(page);
    const billcreatepage= new BillcreatePage(page);
    await dashboardpage.clickonviewlinkforbill();
    await billviewpage.clickoncreatBill();
    await billcreatepage.Createbillwithoutanyvalue();
    await expect(page.locator('#app')).toContainText('Value must be a whole number');
    await expect(page.locator('#app')).not.toContainText('Thank you your bill has been saved to the system');
  });
});
















































































































































































































































































