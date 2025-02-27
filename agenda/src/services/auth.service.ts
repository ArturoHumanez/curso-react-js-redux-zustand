import axios, { AxiosResponse } from "axios"
import { AuthResponse } from "../types";

/**
 * 
 * Funcion que realiza la peticion de login
 * @param username 
 * @param password 
 */
export const loginService = async(username:string, password:string):Promise<AuthResponse> => {
    
    new Promise<AuthResponse>((resolve, reject) => {
        axios.post("http://localhost:8080/login", {
            username,
            password
        })
        .then((response: AxiosResponse<AuthResponse>) => resolve(response.data))
        .catch((error) => reject(error))
        // .catch(()=>{
        //     throw new Error("Algo falló al iniciar sesión")}
        // )
    })

}