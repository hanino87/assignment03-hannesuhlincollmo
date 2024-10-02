import { test, expect } from '@playwright/test';
import { APIHELPERS } from './apiHelpers/ApiHelpers';
import { URL_LOGIN } from './apiHelpers/UrlVariabel';


test.describe('Hannes Testsuite assignment 03 Backend', () => {
  let apihelpers: APIHELPERS;
  let authorization: { username: string; token: string };

  test.beforeAll(async ({ request }) => {
    apihelpers = new APIHELPERS(URL_LOGIN, authorization);

    // Make the login request
    const responselogin = await apihelpers.LoginBackend(request);
    authorization = responselogin; // Store the authorization in variabel response
    console.log(authorization)
  });

  test('testcase 01 get right response all customers and verify the testdata is in there', async ({ request }) => {
    const responseAllClients= await apihelpers.getAllcustomers(request)
    console.log(responseAllClients)
    expect(responseAllClients.status()).toBe(200)
    expect(responseAllClients.status()).not.toBe(401)
    // parse the response to Jsonformat and assert that there are 2 user ther wich indicate that our testdata works from start
    const cusomterData= await responseAllClients.json(); 
    console.log('Customer Data:', cusomterData);
    expect(cusomterData.length).toBeGreaterThanOrEqual(2);

  });

  // test('testcase 02 uppdate a customer and verify the changes has been uppdated in the customer list ', async ({ request }) => {
  //   // const responseAllClients = await request.get('http://localhost:3000/api/clients', {
  //   //   headers: {
  //   //     'Content-Type': 'application/json',
  //   //     'x-user-auth': JSON.stringify(authorization) // Use the authorization object in x-user-auth that is the type of token the api want 
  //   //   },
  //   // });
  //   // // Ensure the response is successful and that i dont get 401 which means i got authorization
  //   // expect(responseAllClients.status()).toBe(200);
  //   // expect(responseAllClients.status()).not.toBe(401);
  //   // expect(responseAllClients.ok()).toBeTruthy();
  //   // // parse the response to Jsonformat and assert that there are 2 user ther wich indicate that our testdata works from start
  //   // const cusomterData= await responseAllClients.json(); // Parse the JSON response
  //   // console.log('Customer Data:', cusomterData);
  //   // expect(cusomterData.length).toBeGreaterThanOrEqual(1);

  // });
});









//       const responseAllClients = await request.get('http://localhost:3000/api/clients', {
//           headers: {
//               'Content-Type': 'application/json',
//               'x-user-auth': JSON.stringify(authorization) // Use the authorization object
//           },
//       });

//       expect(responseAllClients.ok()).toBeTruthy(); // Ensure the response is successful
//       const clientsData = await responseAllClients.json(); // Parse the JSON response
//       console.log('Clients Data:', clientsData);
//       // Further assertions can be added here
//   });
// });











































































































































































































































































