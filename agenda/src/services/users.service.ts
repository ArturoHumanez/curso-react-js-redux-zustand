import axios, { AxiosResponse } from "axios";
import { CreateUserResponse } from "../types";
 
/**
 * Funcion que realiza el registro de usuario
 * @param username - Nombre de usuario
 * @param password - Contraseña
 * @returns  Promise<CreateUserResponse> - Respuesta de la peticion
 */
export const userService = (username: string, password: string): Promise<CreateUserResponse> => {
   return axios.post('http://localhost:8080/register', {
     username,
     password,
   },
  {
    withCredentials: false
  }
  )
   .then((response: AxiosResponse<CreateUserResponse>) => response.data)
   .catch(() => {
     throw new Error("Algo fallo al iniciar sesion");
   })
 }
 