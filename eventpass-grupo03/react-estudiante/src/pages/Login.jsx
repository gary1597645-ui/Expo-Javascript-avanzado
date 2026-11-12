import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const manejarLogin = (e) => {
        e.preventDefault();
        // Simulación estática para el Avance 2.
        if (correo === 'u20231234@utp.edu.pe' && password === 'est123') {
            login({ id: 3, nombre: 'Jefferson Molleapaza', correo: correo, rol: 'estudiante' });
            navigate('/catalogo');
        } else {
            alert('Credenciales incorrectas. Usa: u20231234@utp.edu.pe / est123');
        }
    };

    return (
        <div className="row justify-content-center mt-5">
            <div className="col-md-4">
                <div className="card shadow">
                    <div className="card-body">
                        <h3 className="card-title text-center mb-4">Iniciar Sesión</h3>
                        <form onSubmit={manejarLogin}>
                            <div className="mb-3">
                                <label className="form-label">Correo Institucional</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={correo}
                                    onChange={(e) => setCorreo(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Contraseña</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Ingresar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}