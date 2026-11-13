import { useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import db from '../data/db.json';
import BadgeEstado from '../components/BadgeEstado';
import FormularioInscripcion from '../components/FormularioInscripcion';
import { InscripcionesContext } from '../context/InscripcionesContext';
import { calcularAforoPorEvento } from '../core/estadisticas.js';

export default function EventoDetalle() {
    const { id } = useParams();
    const { inscripciones } = useContext(InscripcionesContext);
    const evento = db.eventos.find((item) => item.id === Number(id));

    useEffect(() => {
        document.title = evento ? `${evento.nombre} - EventPass` : 'Evento no encontrado - EventPass';
    }, [evento]);

    if (!evento) {
        return <div className="alert alert-warning">Evento no encontrado. <Link to="/catalogo">Volver al catálogo</Link></div>;
    }

    const inscritos = calcularAforoPorEvento(inscripciones).get(evento.id) || 0;
    const disponibles = evento.capacidadMax - inscritos;
    const estado = disponibles <= 0
        ? 'agotado'
        : disponibles <= evento.capacidadMax * 0.1
            ? 'ultimos_cupos'
            : 'disponible';

    return (
        <div>
            <Link to="/catalogo" className="btn btn-sm btn-outline-secondary mb-3">Volver al catálogo</Link>
            <section className="card shadow-sm">
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start">
                        <h2 className="card-title">{evento.nombre}</h2>
                        <BadgeEstado estado={estado} />
                    </div>
                    <p className="text-muted">{evento.descripcion}</p>
                    <p><strong>Lugar:</strong> {evento.lugar}</p>
                    <p><strong>Fecha:</strong> {evento.fecha}</p>
                    <p><strong>Aforo:</strong> {inscritos} / {evento.capacidadMax}</p>
                </div>
            </section>
            <FormularioInscripcion evento={evento} />
        </div>
    );
}