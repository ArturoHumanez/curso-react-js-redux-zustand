import axios, { AxiosResponse } from "axios";
import { AuthResponse } from "../types";
 
/**
 * Funcion que realiza la peticion de login
 * @param username - Nombre de usuario
 * @param password - Contraseña
 * @returns  Promise<AuthResponse> - Respuesta de la peticion
 */
export const loginService = (username: string, password: string): Promise<AuthResponse> => {
   return axios.post('http://localhost:8080/login', {
     username,
     password,
   },
  {
    withCredentials: true
  }
  )
   .then((response: AxiosResponse<AuthResponse>) => response.data)
   .catch(() => {
     throw new Error("Algo fallo al iniciar sesion");
   })
 }