import { useRequest } from 'alova/client';
import { getResumenInscripcionesMethod } from '../services/alovaInstance';
import { contarInscripcionesPorEstado } from '../core/estadisticas.js';

export function ResumenInscripciones({ usuarioId }) {
    const { loading, data, error, send } = useRequest(
        () => getResumenInscripcionesMethod(usuarioId),
        {
            initialData: [],
            immediate: Boolean(usuarioId),
            force: true,
        }
    );

    if (loading) {
        return <div className="alert alert-secondary py-2">Cargando resumen con Alova...</div>;
    }

    if (error) {
        return <div className="alert alert-danger py-2">{error.message}</div>;
    }

    const lista = data || [];
    const resumen = contarInscripcionesPorEstado(lista);

    const totalPendientes =
        (resumen.pendiente ?? 0) +
        (resumen.en_espera ?? 0) +
        lista.filter((i) => i.estado === 'pendiente' && !('pendiente' in resumen)).length;

    const totalAprobadas = (resumen.aprobada ?? 0) + (resumen.confirmada ?? 0);
    const totalRechazadas = (resumen.rechazada ?? 0) + (resumen.cancelada ?? 0);

    return (
        <div className="card border-primary mb-4">
            <div className="card-body d-flex flex-wrap justify-content-between align-items-center gap-2">
                <div>
                    <h6 className="card-title mb-1">Resumen de mis inscripciones (Alova Cache)</h6>
                    <div className="d-flex gap-2">
                        <span className="badge bg-warning text-dark">
                            Pendientes: {totalPendientes}
                        </span>
                        <span className="badge bg-success">
                            Aprobadas / Confirmadas: {totalAprobadas}
                        </span>
                        <span className="badge bg-danger">
                            Rechazadas / Canceladas: {totalRechazadas}
                        </span>
                    </div>
                </div>
                <button
                    type="button"
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => send()}
                >
                    Actualizar resumen
                </button>
            </div>
        </div>
    );
}