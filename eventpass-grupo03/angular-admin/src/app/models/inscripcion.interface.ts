export interface Inscripcion {
    id?: number;
    codigo: string;
    eventoId: number;
    estudianteId: number;
    estudianteNombre?: string;
    eventoNombre?: string;
    fechaInscripcion: string;
    estado: 'confirmada' | 'en_espera' | 'cancelada';
}