import { loginService } from '../../src/services/auth.service';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter'
import {describe, it, expect} from '@jest/globals'
import { AuthResponse } from '../../src/types';

describe('auth.service.tsx', () => { 
    let mock:InstanceType<typeof  MockAdapter>;
    
    beforeEach(()=>{
        mock = new MockAdapter(axios);
    })
    afterEach(() => {   
        mock.restore()
    })
    it('should return status 200 on success login', async() => {
        const username: string = 'Test'
        const password: string = 'Test'
        const mockResponse : AuthResponse = {status: 200, message: 'Login exitoso'}
        mock.onPost('http://localhost:8080/login',{username, password}).reply(200, mockResponse)
        const response = await loginService(username, password);
        expect(response.status).toBe(200);
    });

    // it('should return an error if the login failed', async() => {
    //      const username: string = 'Test'
    //     const password: string = 'Test'
    //     const mockResponse : AuthResponse = {status: 401, message: 'Login fallido'}
    //     mock.onPost('http://localhost:8080/login',{username, password}).reply(401, mockResponse)
    //     const response = await loginService(username, password);
    //     expect(response).rejects.toThrowError("Algo falló al iniciar sesión")
    // });
    it('should return an error if the login failed', async() => {
        const username: string = 'Test'
       const password: string = 'Test'
       const mockResponse : AuthResponse = {status: 401, message: 'Login fallido'}
       mock.onPost('http://localhost:8080/login',{username, password}).reply(401, mockResponse)
       await expect(loginService(username, password)).rejects.toThrowError("Algo fallo al iniciar sesion");
   });
    
})