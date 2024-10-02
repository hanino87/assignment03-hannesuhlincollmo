import { APIRequestContext } from "@playwright/test";
export class APIHELPERS {

    private URL_LOGIN: string
    private authorization:{ username:string, token:string}; 

    constructor(URL_LOGIN: string,authorization:{ username:string, token:string}) {
        this.URL_LOGIN = URL_LOGIN;
        this.authorization= authorization; 


    }

    // BELOW ALL APIHELPERS METODS

    // async uppdateCustomer(request: APIRequestContext,payload:object) {
    //     const response = await request.put(`${this.UPDATE_CUSTOMER}`, {
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         data: JSON.stringify(payload),
    //     })
    //     return response
    // }

    async LoginBackend(request: APIRequestContext) {
        const response = await request.post(`${this.URL_LOGIN}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                username:`${process.env.USERNAME}`,
                password:`${process.env.PASSWORD}`
            }
        })
        const jsonResponse = await response.json(); // Parse the JSON response
        const accessToken = jsonResponse.token;
        this.authorization = { "username": `${process.env.USERNAME}`, "token": accessToken }
        return this.authorization;
    }

    async getAllcustomers(request: APIRequestContext) {
        const response = await request.get('http://localhost:3000/api/clients', {
            headers: {
              'Content-Type': 'application/json',
              'x-user-auth': JSON.stringify(this.authorization) // Use the authorization object in x-user-auth that is the type of token the api want 
            },
          });
        return response
    }

    




}

// async deleteCarWithLatestId(request: APIRequestContext, carid: number) {
//     const payload = { id: carid };
//     const response = await request.delete(this.DELETE_CAR, {
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         data: JSON.stringify(payload),
//     });
//     return response;
// }

// const response = await fetch('http://localhost:3000/api/login', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       'username': `${process.env.USERNAME}`,
//       'password': `${process.env.PASSWORD}`
//     }),
//   });