export interface Laboratorio {
    id?: number;
    nombre: string;
    sede: string;
    capacidad: number;
    equipos: string[];
    estado: 'disponible' | 'mantenimiento';
}