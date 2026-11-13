import { Link } from 'react-router-dom';
import BadgeEstado from './BadgeEstado';

export default function TarjetaEvento({ evento, inscritos }) {
    const disponibles = evento.capacidadMax - inscritos;
    const estado = disponibles <= 0
        ? 'agotado'
        : disponibles <= evento.capacidadMax * 0.1
            ? 'ultimos_cupos'
            : 'disponible';

    return (
        <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                        <h5 className="card-title text-truncate" title={evento.nombre}>
                            {evento.nombre}
                        </h5>
                        <BadgeEstado estado={estado} />
                    </div>
                    <h6 className="card-subtitle mb-2 text-muted">{evento.lugar}</h6>
                    <p className="card-text small mb-1">
                        <strong>Fecha:</strong> {evento.fecha}
                    </p>
                    <p className="card-text small mb-1">
                        <strong>Aforo:</strong> {inscritos} / {evento.capacidadMax}
                    </p>
                </div>
                <div className="card-footer bg-transparent border-top-0">
                    <Link to={`/catalogo/${evento.id}`} className="btn btn-outline-primary w-100">
                        Ver Detalle
                    </Link>
                </div>
            </div>
        </div>
    );
}