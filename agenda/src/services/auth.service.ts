import axios from "axios"

export const loginService = async(username:string, password:string) => {
    try{
        const response = await axios.post("http://localhost:8080/login", {
            username,
            password
        }) 
        console.log("Response: ", response.data);
    
        return response.data?.token || null;
    }catch(error){
        console.log("Error al acceder al token: ", error);
        
    }
    
    
}