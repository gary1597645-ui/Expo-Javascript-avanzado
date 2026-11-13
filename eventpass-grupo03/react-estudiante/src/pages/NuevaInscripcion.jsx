import { useEffect, useState } from 'react';
import db from '../data/db.json';
import FormularioInscripcion from '../components/FormularioInscripcion';

export default function NuevaInscripcion() {
    const [eventoId, setEventoId] = useState('');
    const evento = db.eventos.find((item) => item.id === Number(eventoId));

    useEffect(() => {
        document.title = 'Nueva inscripción - EventPass';
    }, []);

    return (
        <div>
            <h2 className="mb-4">Nueva inscripción</h2>
            <label className="form-label" htmlFor="evento-inscripcion">Elige un evento</label>
            <select
                id="evento-inscripcion"
                className="form-select"
                value={eventoId}
                onChange={(e) => setEventoId(e.target.value)}
            >
                <option value="">Selecciona un evento</option>
                {db.eventos.map((item) => (
                    <option key={item.id} value={item.id}>{item.nombre} ({item.fecha})</option>
                ))}
            </select>
            {evento
                ? <FormularioInscripcion key={evento.id} evento={evento} />
                : <div className="alert alert-info mt-4">Selecciona un evento para continuar.</div>}
        </div>
    );
}