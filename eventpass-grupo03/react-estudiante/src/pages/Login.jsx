import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Iniciar sesión - EventPass';
    }, []);

    const manejarLogin = (e) => {
        e.preventDefault();
        const resultado = login(correo, password);
        if (resultado.ok) {
            navigate('/catalogo');
        } else {
            setError(resultado.error);
        }
    };

    return (
        <div className="row justify-content-center mt-5">
            <div className="col-md-4">
                <div className="card shadow">
                    <div className="card-body">
                        <h3 className="card-title text-center mb-4">Iniciar Sesión</h3>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <form onSubmit={manejarLogin}>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="correo-login">Correo Institucional</label>
                                <input
                                    id="correo-login"
                                    type="email"
                                    className="form-control"
                                    value={correo}
                                    onChange={(e) => setCorreo(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="password-login">Contraseña</label>
                                <input
                                    id="password-login"
                                    type="password"
                                    className="form-control"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Ingresar</button>
                        </form>
                        <p className="small text-muted mt-3 mb-0">Ejemplo: ana.torres@utp.edu.pe / est123</p>
                    </div>
                </div>
            </div>
        </div>
    );
}