import { useEffect, useState } from 'react';
import ListaEventos from '../components/ListaEventos';
import { obtenerEventos } from '../services/eventosFetch';
import { listarTodasInscripciones } from '../services/inscripcionesAxios';
import { obtenerLugaresUnicos } from '../core/estadisticas.js';

export default function Catalogo() {
    const [eventos, setEventos] = useState([]);
    const [inscripciones, setInscripciones] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [filtroTexto, setFiltroTexto] = useState('');
    const [filtroLugar, setFiltroLugar] = useState('');

    useEffect(() => {
        document.title = 'Catálogo de eventos - EventPass';
        let activo = true;

        const cargarCatalogo = async () => {
            setCargando(true);
            setError(null);
            try {
                const [listaEventos, listaInscripciones] = await Promise.all([
                    obtenerEventos(),
                    listarTodasInscripciones(),
                ]);
                if (activo) {
                    setEventos(listaEventos);
                    setInscripciones(listaInscripciones);
                }
            } catch (err) {
                if (activo) setError(err.message);
            } finally {
                if (activo) setCargando(false);
            }
        };

        cargarCatalogo();
        return () => { activo = false; };
    }, []);

    const lugares = obtenerLugaresUnicos(eventos);

    const eventosFiltrados = eventos.filter((evento) => {
        const coincideTexto = evento.nombre.toLowerCase().includes(filtroTexto.toLowerCase());
        const coincideLugar = filtroLugar === '' || evento.lugar === filtroLugar;
        return coincideTexto && coincideLugar;
    });

    return (
        <div>
            <h2 className="mb-4">Catálogo de eventos</h2>
            <div className="row g-3 mb-4">
                <div className="col-md-8">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Buscar evento por nombre..."
                        value={filtroTexto}
                        onChange={(e) => setFiltroTexto(e.target.value)}
                    />
                </div>
                <div className="col-md-4">
                    <select
                        className="form-select"
                        value={filtroLugar}
                        onChange={(e) => setFiltroLugar(e.target.value)}
                    >
                        <option value="">Todos los lugares</option>
                        {lugares.map((lugar) => <option key={lugar} value={lugar}>{lugar}</option>)}
                    </select>
                </div>
            </div>

            {cargando && (
                <div className="text-center my-4">
                    <div className="spinner-border text-primary" role="status" />
                    <p className="mt-2">Cargando catálogo de eventos...</p>
                </div>
            )}

            {!cargando && error && <div className="alert alert-danger">{error}</div>}

            {!cargando && !error && eventosFiltrados.length === 0 && (
                <div className="alert alert-warning">No hay eventos que coincidan con tu búsqueda.</div>
            )}

            {!cargando && !error && eventosFiltrados.length > 0 && (
                <ListaEventos eventos={eventosFiltrados} inscripciones={inscripciones} />
            )}
        </div>
    );
}