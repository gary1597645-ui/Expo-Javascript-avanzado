import { useState, useEffect } from 'react';
import db from '../data/db.json';
import BadgeEstado from '../components/BadgeEstado';

export default function MisInscripciones() {
    const [inscripciones, setInscripciones] = useState([]);

    useEffect(() => {
        // PROTECCIÓN: Si db.inscripciones no existe, intentará buscar db.reservas. 
        // Si ninguno existe, usará un arreglo vacío [] para no romper la pantalla.
        const datos = db.inscripciones || db.reservas || [];
        setInscripciones(datos);
    }, []);

    return (
        <div>
            <h2 className="mb-4">Mis Inscripciones</h2>

            {inscripciones.length === 0 ? (
                <div className="alert alert-info">
                    No tienes inscripciones activas o no se encontró el arreglo correspondiente en el db.json.
                </div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-hover shadow-sm">
                        <thead className="table-light">
                            <tr>
                                <th>Código</th>
                                <th>Evento ID</th>
                                <th>Fecha Solicitud</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inscripciones.map((ins, index) => (
                                // Usamos ins.id si existe, sino el index como key de respaldo
                                <tr key={ins.id || index}>
                                    <td><strong>{ins.codigo}</strong></td>
                                    {/* Soporte por si en tu json se llama eventoId o laboratorioId */}
                                    <td>{ins.eventoId || ins.laboratorioId}</td>
                                    {/* Soporte por si tiene la fecha de creación */}
                                    <td>{ins.creadoEn ? ins.creadoEn.split('T')[0] : ins.fecha}</td>
                                    <td><BadgeEstado estado={ins.estado || 'pendiente'} /></td>
                                    <td>
                                        <button className="btn btn-sm btn-outline-danger">Cancelar</button>
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