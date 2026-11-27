import Link from 'next/link';

export const metadata = {
    // Metadatos de esta página para el título y la descripción del navegador.
    title: 'Catálogo de Eventos | EventPass Público',
    description: 'Lista completa de eventos disponibles en el campus renderizada en el servidor.',
};

async function getEventos() {
    // Obtiene el catálogo en el servidor y evita reutilizar datos antiguos.
    const res = await fetch('http://localhost:3000/eventos', { cache: 'no-store' });
    if (!res.ok) throw new Error('Error al obtener eventos');
    return res.json();
}

export default async function EventosPublicoPage() {
    const eventos = await getEventos();

    return (
        <div>
            <h1 className="mb-3">Catálogo Público de Eventos</h1>
            <p className="text-muted mb-4">
                Página renderizada en el servidor (SSR). Haz clic derecho → <em>Ver código fuente</em> para comprobar el HTML pre-renderizado.
            </p>
            <div className="row g-3">
                {eventos.map((ev) => (
                    <div key={ev.id} className="col-md-4">
                        <div className="card h-100 shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">{ev.nombre}</h5>
                                <p className="text-muted mb-1">{ev.lugar}</p>
                                <p className="small mb-2">
                                    <strong>Fecha:</strong> {ev.fecha} · <strong>Aforo máx:</strong> {ev.capacidadMax}
                                </p>
                                <Link href={`/eventos/${ev.id}`} className="btn btn-primary btn-sm">
                                    Ver detalle y confirmados
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}