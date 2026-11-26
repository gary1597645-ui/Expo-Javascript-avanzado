import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import BadgeEstado from '../components/BadgeEstado';
import FormularioInscripcion from '../components/FormularioInscripcion';
import { obtenerEventoPorId } from '../services/eventosFetch';
import { listarTodasInscripciones } from '../services/inscripcionesAxios';
import { calcularAforoPorEvento } from '../core/estadisticas.js';

export default function EventoDetalle() {
    const { id } = useParams();
    const [evento, setEvento] = useState(null);
    const [inscripciones, setInscripciones] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    const cargarDetalle = async () => {
        setCargando(true);
        setError(null);
        try {
            const [eventoData, inscripcionesData] = await Promise.all([
                obtenerEventoPorId(id),
                listarTodasInscripciones(),
            ]);
            setEvento(eventoData);
            setInscripciones(inscripcionesData);
        } catch (err) {
            setError(err.message);
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        cargarDetalle();
    }, [id]);

    useEffect(() => {
        document.title = evento ? `${evento.nombre} - EventPass` : 'Detalle de evento - EventPass';
    }, [evento]);

    if (cargando) {
        return (
            <div className="text-center my-5">
                <div className="spinner-border text-primary" role="status" />
                <p className="mt-2">Cargando detalle del evento...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger">
                {error} <Link to="/catalogo" className="alert-link ms-2">Volver al catálogo</Link>
            </div>
        );
    }

    if (!evento) {
        return (
            <div className="alert alert-warning">
                Evento no encontrado. <Link to="/catalogo">Volver al catálogo</Link>
            </div>
        );
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
            <FormularioInscripcion evento={evento} onInscripcionCreada={cargarDetalle} />
        </div>
    );
}