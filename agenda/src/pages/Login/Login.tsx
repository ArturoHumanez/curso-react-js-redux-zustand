import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom'
import './Login.css';
import { useAuthStore } from '../../store/authStore';

const Login: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate()

    const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
    const loginAction = useAuthStore((state) => state.login)

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/home')
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        loginAction(username, password)
    };

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

        <small><a onClick={() => navigate('/register')}>¿No tienes cuenta? Regístrate</a></small>
        </div>
  )
}

export default Login;