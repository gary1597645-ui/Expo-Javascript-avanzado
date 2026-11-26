export interface Inscripcion {
    id?: number | string;
    codigo: string;
    eventoId: number;
    estudianteId: number;
    estudianteNombre?: string;
    eventoNombre?: string;
    fechaInscripcion: string;
    estado: 'pendiente' | 'aprobada' | 'rechazada' | 'confirmada' | 'en_espera' | 'cancelada';
}