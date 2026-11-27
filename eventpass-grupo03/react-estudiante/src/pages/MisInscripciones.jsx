import { useContext, useEffect, useState } from 'react';
import BadgeEstado from '../components/BadgeEstado';
import ContadorRegresivo from '../components/ContadorRegresivo';
import { ResumenInscripciones } from '../components/ResumenInscripciones';
import { AuthContext } from '../context/AuthContext';
import { useInscripciones } from '../hooks/useInscripciones';
import { obtenerEventos } from '../services/eventosFetch';

export default function MisInscripciones() {
    const { user } = useContext(AuthContext);
    const { datos: mias, cargando, error, cancelar, recargar } = useInscripciones(user?.id);
    const [eventos, setEventos] = useState([]);
    const [fechaActual] = useState(() => new Date().toISOString().slice(0, 10));

    useEffect(() => {
        document.title = 'Mis inscripciones - EventPass';
        obtenerEventos()
            .then(setEventos)
            .catch(() => setEventos([]));
    }, []);

    const buscarEvento = (id) => eventos.find((evento) => String(evento.id) === String(id));

    const proxima = mias
        .filter((inscripcion) => ['confirmada', 'aprobada'].includes(inscripcion.estado))
        .map((inscripcion) => buscarEvento(inscripcion.eventoId))
        .filter((evento) => evento && evento.fecha >= fechaActual)
        .sort((a, b) => a.fecha.localeCompare(b.fecha))[0];

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="mb-0">Mis inscripciones</h2>
                <button className="btn btn-sm btn-outline-primary" onClick={recargar}>
                    Actualizar estado
                </button>
            </div>

            {/* Bloque con Alova (useRequest + caché + botón actualizar) */}
            <ResumenInscripciones usuarioId={user?.id} />

            {proxima && <ContadorRegresivo fecha={proxima.fecha} nombre={proxima.nombre} />}

            {/* Estado 1: Cargando */}
            {cargando && (
                <div className="text-center my-4">
                    <div className="spinner-border text-primary" role="status" />
                    <p className="mt-2">Cargando tus inscripciones...</p>
                </div>
            )}

            {/* Estado 2: Error */}
            {!cargando && error && (
                <div className="alert alert-danger">{error}</div>
            )}

            {/* Estado 3: Lista vacía */}
            {!cargando && !error && mias.length === 0 && (
                <div className="alert alert-info">Aún no tienes inscripciones registradas.</div>
            )}

            {/* Tabla de resultados */}
            {!cargando && !error && mias.length > 0 && (
                <div className="table-responsive">
                    <table className="table table-hover shadow-sm">
                        <thead className="table-light">
                            <tr>
                                <th>Código</th>
                                <th>Evento</th>
                                <th>Fecha de inscripción</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mias.map((ins) => (
                                <tr key={ins.id}>
                                    <td><strong>{ins.codigo}</strong></td>
                                    <td>{buscarEvento(ins.eventoId)?.nombre ?? `Evento ${ins.eventoId}`}</td>
                                    <td>{ins.fechaInscripcion}</td>
                                    <td><BadgeEstado estado={ins.estado} /></td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-outline-danger"
                                            disabled={ins.estado === 'cancelada' || ins.estado === 'rechazada'}
                                            onClick={() => cancelar(ins.id)}
                                        >
                                            Cancelar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}