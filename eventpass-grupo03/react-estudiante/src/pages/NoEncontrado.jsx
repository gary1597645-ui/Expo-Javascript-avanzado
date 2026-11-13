import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function NoEncontrado() {
    useEffect(() => {
        document.title = '404 - EventPass';
    }, []);

    return (
        <div className="text-center mt-5">
            <h1 className="display-4">404</h1>
            <p className="lead">La página que buscas no existe.</p>
            <Link to="/" className="btn btn-primary">Volver al inicio</Link>
        </div>
    );
}