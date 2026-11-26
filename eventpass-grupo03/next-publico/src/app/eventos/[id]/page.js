import Link from 'next/link';
import { notFound } from 'next/navigation';

async function getEventoDetalle(id) {
    const [resEv, resIns] = await Promise.all([
        fetch(`http://localhost:3000/eventos/${id}`, { cache: 'no-store' }),
        fetch(`http://localhost:3000/inscripciones?eventoId=${id}`, { cache: 'no-store' }),
    ]);
    if (!resEv.ok) return null;
    const evento = await resEv.json();
    const inscripciones = resIns.ok ? await resIns.json() : [];
    const aprobadas = inscripciones.filter((i) =>
        ['confirmada', 'aprobada'].includes(i.estado)
    );
    return { evento, aprobadas };
}

export async function generateMetadata({ params }) {
    const { id } = await params;
    const data = await getEventoDetalle(id);
    if (!data) {
        return { title: 'Evento no encontrado | EventPass' };
    }
    return {
        title: `${data.evento.nombre} | EventPass Público`,
        description: `Detalle y aforo confirmado del evento ${data.evento.nombre} en ${data.evento.lugar}.`,
    };
}

export default async function EventoDetalleSSRPage({ params }) {
    const { id } = await params;
    const data = await getEventoDetalle(id);
    if (!data) notFound();

    const { evento, aprobadas } = data;

    return (
        <div>
            <Link href="/eventos" className="btn btn-outline-secondary btn-sm mb-3">
                ← Volver al catálogo
            </Link>
            <div className="card shadow-sm mb-4">
                <div className="card-body">
                    <h2>{evento.nombre}</h2>
                    <p className="text-muted">{evento.descripcion}</p>
                    <p className="mb-1"><strong>Lugar:</strong> {evento.lugar}</p>
                    <p className="mb-1"><strong>Fecha:</strong> {evento.fecha}</p>
                    <p className="mb-0">
                        <strong>Cupos confirmados:</strong> {aprobadas.length} / {evento.capacidadMax}
                    </p>
                </div>
            </div>

            <h4>Inscripciones aprobadas / confirmadas</h4>
            {aprobadas.length === 0 ? (
                <div className="alert alert-info">Aún no hay inscripciones aprobadas para este evento.</div>
            ) : (
                <ul className="list-group">
                    {aprobadas.map((ins) => (
                        <li key={ins.id} className="list-group-item d-flex justify-content-between">
                            <span><strong>{ins.codigo}</strong> — Estudiante #{ins.estudianteId}</span>
                            <span className="badge bg-success">{ins.estado}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}