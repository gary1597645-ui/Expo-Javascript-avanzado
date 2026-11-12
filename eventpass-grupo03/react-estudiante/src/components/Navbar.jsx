import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';

export default function Navbar() {
    const { user, logout } = useContext(AuthContext);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className={`navbar navbar-expand-lg ${theme === 'dark' ? 'navbar-dark bg-dark border-bottom' : 'navbar-light bg-light shadow-sm'}`}>
            <div className="container">
                <Link className="navbar-brand fw-bold" to="/">EventPass</Link>
                <div className="d-flex w-100 justify-content-between align-items-center">
                    <ul className="navbar-nav flex-row gap-3">
                        <li className="nav-item">
                            <Link className="nav-link" to="/catalogo">Catálogo</Link>
                        </li>
                        {user && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/mis-inscripciones">Mis Inscripciones</Link>
                                </li>
                            </>
                        )}
                    </ul>
                    <div className="d-flex align-items-center gap-3">
                        <button className="btn btn-sm btn-outline-secondary" onClick={toggleTheme}>
                            {theme === 'light' ? '🌙 Oscuro' : '☀️ Claro'}
                        </button>
                        {user ? (
                            <div className="d-flex align-items-center gap-3">
                                <span className="navbar-text d-none d-md-block">Hola, {user.nombre}</span>
                                <button className="btn btn-sm btn-danger" onClick={handleLogout}>Salir</button>
                            </div>
                        ) : (
                            // Enlace corregido para redirigir a la vista de Login
                            <Link to="/login" className="btn btn-sm btn-primary">Iniciar Sesión</Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}