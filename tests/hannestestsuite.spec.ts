import { test, expect } from '@playwright/test';
import { APIHELPERS } from './apiHelpers/ApiHelpers';
import { URL_ALL_CLIENTS, URL_LOGIN, URL_UPDATE_CLIENT } from './apiHelpers/UrlVariabel';
import { Fakerdatauppdatelient } from './FakerData/Fakerdata';


test.describe('Hannes Testsuite assignment 03 Backend', () => {
  let apihelpers: APIHELPERS;
  let authorization: { username: string; token: string };

  test.beforeAll(async ({ request }) => {
    apihelpers = new APIHELPERS(URL_LOGIN, authorization, URL_ALL_CLIENTS, URL_UPDATE_CLIENT);

    // Make the login request
    const responselogin = await apihelpers.LoginBackend(request);
    authorization = responselogin; // Store the authorization in variabel response
    return authorization
  });

  test ('testcase 01 get right response all customers and verify the testdata is in there', async ({ request }) => {
    const responseAllClients = await apihelpers.getAllClients(request,)
    console.log(responseAllClients)
    expect(responseAllClients.status()).toBe(200)
    expect(responseAllClients.status()).not.toBe(401)
    // parse the response to Jsonformat and assert that there are 2 user ther wich indicate that our testdata works from start
    const cusomterData = await responseAllClients.json();
    console.log('Customer Data:', cusomterData);
    expect(cusomterData.length).toBeGreaterThanOrEqual(2);

  });

  test('testcase 02', async ({ request }) => {

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
    console.log(responseAllClients)
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



















































































































































































































































































