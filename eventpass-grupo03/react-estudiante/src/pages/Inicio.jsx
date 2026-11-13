import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Inicio() {
    useEffect(() => {
        document.title = 'Inicio - EventPass';
    }, []);

    return (
        <section className="p-5 mb-4 bg-primary text-white rounded-3">
            <h1 className="display-6 fw-bold">Bienvenido a EventPass</h1>
            <p className="lead">Consulta los eventos del campus e inscríbete.</p>
            <Link to="/catalogo" className="btn btn-light">Ver catálogo</Link>
        </section>
    );
}