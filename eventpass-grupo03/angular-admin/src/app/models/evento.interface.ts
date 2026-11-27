export interface Evento {
    id?: number;
    nombre: string;
    capacidadMax: number;
    fecha: string;
    lugar: string;
    horaInicio?: string;
    horaFin?: string;
    descripcion?: string;
}