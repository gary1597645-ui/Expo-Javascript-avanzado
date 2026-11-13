import { useContext, useEffect, useState } from 'react';
import db from '../data/db.json';
import BadgeEstado from '../components/BadgeEstado';
import ContadorRegresivo from '../components/ContadorRegresivo';
import { AuthContext } from '../context/AuthContext';
import { InscripcionesContext } from '../context/InscripcionesContext';

export default function MisInscripciones() {
    const { user } = useContext(AuthContext);
    const { inscripciones, cancelar } = useContext(InscripcionesContext);
    const [fechaActual] = useState(() => new Date().toISOString().slice(0, 10));

    useEffect(() => {
        document.title = 'Mis inscripciones - EventPass';
    }, []);

    const mias = inscripciones.filter((inscripcion) => inscripcion.estudianteId === user.id);
    const buscarEvento = (id) => db.eventos.find((evento) => evento.id === id);
    const proxima = mias
        .filter((inscripcion) => inscripcion.estado === 'confirmada')
        .map((inscripcion) => buscarEvento(inscripcion.eventoId))
        .filter((evento) => evento && evento.fecha >= fechaActual)
        .sort((a, b) => a.fecha.localeCompare(b.fecha))[0];

    return (
        <div>
            <h2 className="mb-4">Mis inscripciones</h2>
            {proxima && <ContadorRegresivo fecha={proxima.fecha} nombre={proxima.nombre} />}
            {mias.length === 0 ? (
                <div className="alert alert-info">Aún no tienes inscripciones.</div>
            ) : (
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
                                            disabled={ins.estado === 'cancelada'}
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