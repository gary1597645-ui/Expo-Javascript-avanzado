export default function BadgeEstado({ estado }) {
    // Renderizado condicional de clases CSS
    const badgeClass = estado === 'disponible' ? 'bg-success' : 'bg-danger';

    return (
        <span className={`badge ${badgeClass}`}>
            {estado.toUpperCase()}
        </span>
    );
}