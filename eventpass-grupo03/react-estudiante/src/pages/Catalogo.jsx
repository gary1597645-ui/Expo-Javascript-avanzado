import { useContext, useEffect, useState } from 'react';
import ListaEventos from '../components/ListaEventos';
import db from '../data/db.json';
import { InscripcionesContext } from '../context/InscripcionesContext';
import { obtenerLugaresUnicos } from '../core/estadisticas.js';

export default function Catalogo() {
    useEffect(() => {
        document.title = 'Catálogo de eventos - EventPass';
    }, []);

    const { inscripciones } = useContext(InscripcionesContext);
    const [filtroTexto, setFiltroTexto] = useState('');
    const [filtroLugar, setFiltroLugar] = useState('');
    const lugares = obtenerLugaresUnicos(db.eventos);

    const eventosFiltrados = db.eventos.filter((evento) => {
        const coincideTexto = evento.nombre.toLowerCase().includes(filtroTexto.toLowerCase());
        const coincideLugar = filtroLugar === '' || evento.lugar === filtroLugar;
        return coincideTexto && coincideLugar;
    });

    return (
        <div>
            <h2 className="mb-4">Catálogo de eventos</h2>
            <div className="row g-3">
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
            <ListaEventos eventos={eventosFiltrados} inscripciones={inscripciones} />
        </div>
    );
}