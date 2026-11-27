export default function BadgeEstado({ estado }) {
    const estilos = {
        pendiente: ['bg-warning text-dark', 'Pendiente'],
        aprobada: ['bg-success', 'Aprobada'],
        rechazada: ['bg-danger', 'Rechazada'],
        confirmada: ['bg-success', 'Confirmada'],
        en_espera: ['bg-warning text-dark', 'En espera'],
        cancelada: ['bg-danger', 'Cancelada'],
        disponible: ['bg-success', 'Disponible'],
        ultimos_cupos: ['bg-warning text-dark', 'Últimos cupos'],
        agotado: ['bg-danger', 'Agotado'],
    };
    const [badgeClass, texto] = estilos[estado] ?? ['bg-secondary', estado ?? 'Desconocido'];

    return (
        <span className={`badge ${badgeClass}`}>{texto}</span>
    );
}