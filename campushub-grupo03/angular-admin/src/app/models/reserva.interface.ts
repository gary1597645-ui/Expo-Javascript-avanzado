export interface Reserva {
    id?: number;
    codigo: string;
    laboratorioId: number;
    usuarioId: number;
    fecha: string;
    horaInicio: string;
    horaFin: string;
    motivo: string;
    estado: 'pendiente' | 'aprobada' | 'rechazada';
    creadoEn: string;
}