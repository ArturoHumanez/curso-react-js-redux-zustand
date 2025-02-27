import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { loginService } from '../../services/auth.service';
import './Login.css'

const Login: React.FC = ()=> {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>("");

    const handleSubmit = async(event: React.FormEvent) =>{
        event.preventDefault(); //Evitar que recargue página
        loginService(username, password)
            .then((response)=>{
                if(response && response.status === 200)
                    navigate('/home');
                else
                    setError("Usuario o contraseña incorrectos");
            })
            .catch((error) => {
                setError(`${error}`);
            })
        // localStorage.setItem("token", response);


    }

  return (
    <div>
        <h2>Inicia Sesión</h2>
        {
            error && <p>{error}</p>
        }
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder='Indica tu usuario' value={username} 
                onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder='Indica tu contraseña' value={password} 
                onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Iniciar sesión</button>
        </form>
    </div>
  )
}

export default Login;