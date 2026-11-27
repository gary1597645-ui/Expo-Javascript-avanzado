import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="alert alert-danger my-4">
            <h4>404 — Recurso no encontrado</h4>
            <p>El evento o código de inscripción solicitado no existe en EventPass.</p>
            <Link href="/eventos" className="btn btn-dark btn-sm">Ir al catálogo público</Link>
        </div>
    );
}