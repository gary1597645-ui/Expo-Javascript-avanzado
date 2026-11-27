import Link from 'next/link';
import { notFound } from 'next/navigation';

async function getInscripcionPorCodigo(codigo) {
    const res = await fetch(
        `http://localhost:3000/inscripciones?codigo=${encodeURIComponent(codigo)}`,
        { cache: 'no-store' }
    );
    if (!res.ok) return null;
    const lista = await res.json();
    const inscripcion = lista[0];
    if (!inscripcion) return null;

    const resEv = await fetch(`http://localhost:3000/eventos/${inscripcion.eventoId}`, {
        cache: 'no-store',
    });
    const evento = resEv.ok ? await resEv.json() : null;
    return { inscripcion, evento };
}

export async function generateMetadata({ params }) {
    const { codigo } = await params;
    return {
        title: `Estado de Inscripción ${codigo} | EventPass`,
        description: `Consulta pública del estado de la inscripción ${codigo} en EventPass.`,
    };
}

export default async function ConsultaInscripcionPage({ params }) {
    const { codigo } = await params;
    const resultado = await getInscripcionPorCodigo(codigo);
    if (!resultado) notFound();

    const { inscripcion, evento } = resultado;

    return (
        <div className="card shadow-sm p-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="mb-0">Constancia de Inscripción: {inscripcion.codigo}</h2>
                <span className="badge bg-primary fs-6 text-uppercase">{inscripcion.estado}</span>
            </div>
            <p><strong>Evento:</strong> {evento ? evento.nombre : `Evento #${inscripcion.eventoId}`}</p>
            <p><strong>Lugar:</strong> {evento?.lugar ?? 'Por confirmar'}</p>
            <p><strong>Fecha de inscripción:</strong> {inscripcion.fechaInscripcion}</p>
            <Link href="/eventos" className="btn btn-outline-primary btn-sm mt-2" style={{ width: 'fit-content' }}>
                Ver más eventos
            </Link>
        </div>
    );
}