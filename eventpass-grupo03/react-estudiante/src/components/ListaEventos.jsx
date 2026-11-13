import TarjetaEvento from './TarjetaEvento';
import { calcularAforoPorEvento } from '../core/estadisticas.js';

export default function ListaEventos({ eventos, inscripciones }) {
    if (eventos.length === 0) {
        return (
            <div className="alert alert-info text-center mt-4">
                No se encontraron eventos con esos filtros.
            </div>
        );
    }

    const aforoPorEvento = calcularAforoPorEvento(inscripciones);

    return (
        <div className="row mt-4">
            {eventos.map((ev) => (
                <TarjetaEvento
                    key={ev.id}
                    evento={ev}
                    inscritos={aforoPorEvento.get(ev.id) || 0}
                />
            ))}
        </div>
    );
}