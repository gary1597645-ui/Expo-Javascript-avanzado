import Link from 'next/link';
import { notFound } from 'next/navigation';

async function getEventoDetalle(id) {
    // Carga el evento y sus inscripciones en el servidor para generar el detalle.
    const [resEv, resIns] = await Promise.all([
        fetch(`http://localhost:3000/eventos/${id}`, { cache: 'no-store' }),
        fetch(`http://localhost:3000/inscripciones?eventoId=${id}`, { cache: 'no-store' }),
    ]);
    if (!resEv.ok) return null;
    const evento = await resEv.json();
    const inscripciones = resIns.ok ? await resIns.json() : [];
    const aprobadasDelEvento = inscripciones.filter((i) =>
        ['confirmada', 'aprobada'].includes(i.estado)
    );
    const fechaEvento = new Date(`${evento.fecha}T00:00:00`);
    const inicioSemana = new Date();
    inicioSemana.setHours(0, 0, 0, 0);
    inicioSemana.setDate(inicioSemana.getDate() - ((inicioSemana.getDay() + 6) % 7));
    const finSemana = new Date(inicioSemana);
    finSemana.setDate(finSemana.getDate() + 7);
    const eventoEstaSemana = fechaEvento >= inicioSemana && fechaEvento < finSemana;
    const aprobadas = eventoEstaSemana ? aprobadasDelEvento : [];
    return { evento, aprobadas, eventoEstaSemana };
}

export async function generateMetadata({ params }) {
    // Genera metadatos según el evento solicitado en la ruta dinámica.
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

    const { evento, aprobadas, eventoEstaSemana } = data;

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

            <h4>Inscripciones aprobadas / confirmadas de esta semana</h4>
            {!eventoEstaSemana && (
                <p className="text-muted">Este evento no se realiza durante la semana actual.</p>
            )}
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