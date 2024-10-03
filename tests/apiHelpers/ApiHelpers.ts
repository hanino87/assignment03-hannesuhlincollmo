import { APIRequestContext } from "@playwright/test";
export class APIHELPERS {

    private URL_LOGIN: string
    private authorization:{ username:string, token:string}; 
    private URL_ALL_CLIENTS: string;
    private URL_UPDATE_CLIENT:string;

    constructor(URL_LOGIN: string,authorization:{ username:string, token:string},URL_ALL_CLIENTS:string,URL_UPDATE_CLIENT:string) {
        this.URL_LOGIN = URL_LOGIN;
        this.authorization= authorization; 
        this. URL_ALL_CLIENTS=URL_ALL_CLIENTS
        this.URL_UPDATE_CLIENT=URL_UPDATE_CLIENT

    }

    // BELOW ALL APIHELPERS METODS

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
        const jsonResponse = await response.json(); 
        const accessToken = jsonResponse.token;
        this.authorization = { "username": `${process.env.USERNAME}`, "token": accessToken }
        return this.authorization;
    }

    async getAllClients(request: APIRequestContext) {
        const response = await request.get(`${this.URL_ALL_CLIENTS}`, {
            headers: {
              'Content-Type': 'application/json',
              'x-user-auth': JSON.stringify(this.authorization) 
            },
          });
        return response
    }

    async UppdateOneClient(request: APIRequestContext,payload:object) {
        const response = await request.put(`${this.URL_UPDATE_CLIENT}`, {
            headers: {
              'Content-Type': 'application/json',
              'x-user-auth': JSON.stringify(this.authorization) 
            },
            data: JSON.stringify(payload),
          });
        return response
    }

}

