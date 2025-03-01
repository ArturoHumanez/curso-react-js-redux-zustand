import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { userService } from '../../services/users.service';
import { useAuthStore } from '../../store/authStore';

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();
    const loginAction = useAuthStore((state) => state.login);

    const mutation = useMutation({
        mutationFn: ({ username, password }: { username: string; password: string }) =>
            userService(username, password),
        onSuccess: (response) => {
            if (response.message) {
                loginAction(username, password);
                navigate('/home');
            } else {
                setError('Error desconocido al registrarse');
            }
        },
        onError: (error: any) => {
            setError(error.message || 'Error al registrarse');
        }
    });

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        mutation.mutate({ username, password }); // Ejecutar la mutación
    };

    return (
        <div>
            <h2>Regístrate</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Indica tu usuario' value={username} 
                    onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder='Indica tu contraseña' value={password} 
                    onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" disabled={mutation.isPending}>
                    {mutation.isPending? 'Registrando...' : 'Registrarse'}
                </button>
            </form>
            <small><a onClick={() => navigate('/login')}>¿Ya tienes cuenta? Inicia sesión</a></small>
        </div>
    );
};

export default Register;
