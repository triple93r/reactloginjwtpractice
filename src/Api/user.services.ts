

/* This code snippet defines an `authService` object in TypeScript that provides various methods related to handling authentication tokens and data storage using the browser's `localStorage`. Here's a breakdown of what each method does: */

import { IRegisterUser } from "../interfaces/IRegisterUser";
import { IUser } from "../interfaces/IUser";
import { httpClient } from "./HttpClient";

export const userService = {
    getAllUsers: () => httpClient.get(`http://localhost:3005/users`),
    createUser: (payload: IRegisterUser) => httpClient.post('http://localhost:3005/register', payload)
};


