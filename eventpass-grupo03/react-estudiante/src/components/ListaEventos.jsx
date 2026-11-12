import TarjetaEvento from './TarjetaEvento';

export default function ListaEventos({ eventos }) {
    // Renderizado condicional si no hay resultados
    if (eventos.length === 0) {
        return (
            <div className="alert alert-info text-center mt-4">
                No se encontraron eventos con esos filtros.
            </div>
        );
    }

    return (
        <div className="row mt-4">
            {eventos.map((ev) => (
                <TarjetaEvento key={ev.id} evento={ev} />
            ))}
        </div>
    );
}