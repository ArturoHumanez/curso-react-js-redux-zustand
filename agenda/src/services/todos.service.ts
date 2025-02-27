import axios from "axios";
const API_URL = 'https://jsonplaceholder.typicode.com';

export const getTodos = async() => {

    try{
        const response = await axios.get(`${API_URL}/todos`)
            .then((response) => response.data)
            .catch((error) => {throw new Error(`Algo a fallado: ${error}`)})

        return response;
    }catch(error){
        console.log("Error al acceder al token: ", error);
        
    }
}