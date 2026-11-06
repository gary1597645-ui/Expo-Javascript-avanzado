export interface Usuario {
    id?: number;
    nombre: string;
    correo: string;
    codigo: string;
    rol: 'estudiante' | 'admin';
    password?: string;
}
