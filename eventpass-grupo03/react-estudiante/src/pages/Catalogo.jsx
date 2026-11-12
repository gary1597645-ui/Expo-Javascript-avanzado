import { useState, useEffect } from 'react';
import ListaEventos from '../components/ListaEventos';
import db from '../data/db.json';

export default function Catalogo() {
    // 1. Hook useEffect: Cumplimos con cambiar el título de la pestaña
    useEffect(() => {
        document.title = 'Catálogo de Eventos - EventPass';
    }, []); // El array vacío asegura que solo se ejecute al montar el componente

    // 2. Hook useState: Guardamos los criterios de búsqueda del usuario
    const [filtroTexto, setFiltroTexto] = useState('');
    const [filtroCategoria, setFiltroCategoria] = useState('');

    // 3. Lógica de filtrado
    const eventosFiltrados = db.eventos.filter((evento) => {
        const coincideTexto = evento.nombre.toLowerCase().includes(filtroTexto.toLowerCase());
        const coincideCategoria = filtroCategoria === '' || evento.categoria === filtroCategoria;
        return coincideTexto && coincideCategoria;
    });

    return (
        <div>
            <h2 className="mb-4">Catálogo de Eventos</h2>

            {/* Controles de Filtro */}
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
                        value={filtroCategoria}
                        onChange={(e) => setFiltroCategoria(e.target.value)}
                    >
                        <option value="">Todas las categorías</option>
                        <option value="Tecnología">Tecnología</option>
                        <option value="Negocios">Negocios</option>
                    </select>
                </div>
            </div>

            {/* Componente que renderiza la lista pasándole los datos filtrados por props */}
            <ListaEventos eventos={eventosFiltrados} />
        </div>
    );
}