// core-js/modelos.js
import { validarCorreo, validarCodigoAlumno, validarFecha, validarHora } from './validadores.js';

// Función auxiliar provista en la rúbrica para convertir horas a minutos
const aMinutos = (hhmm) => {
    const [h, m] = hhmm.split(':').map(Number);
    return h * 60 + m;
};

export class Usuario {
    constructor({ id, nombre, correo, codigo, rol, password }) {
        // Usamos los validadores que creaste en el paso anterior
        validarCorreo(correo);
        validarCodigoAlumno(codigo);
        
        this.id = id;
        this.nombre = nombre;
        this.correo = correo;
        this.codigo = codigo;
        this.rol = rol;
        this.password = password;
    }
}

export class Laboratorio {
    constructor({ id, nombre, sede, capacidad, equipos, estado }) {
        if (capacidad < 1 || capacidad > 60) {
            throw new Error(`Error: La capacidad del laboratorio debe estar entre 1 y 60.`);
        }
        
        this.id = id;
        this.nombre = nombre;
        this.sede = sede;
        this.capacidad = capacidad;
        this.equipos = equipos;
        this.estado = estado; // 'disponible' | 'mantenimiento'
    }
}

export class Reserva {
    constructor({ id, codigo, laboratorioId, usuarioId, fecha, horaInicio, horaFin, motivo, estado = 'pendiente', creadoEn }) {
        validarFecha(fecha);
        validarHora(horaInicio);
        validarHora(horaFin);

        if (aMinutos(horaFin) <= aMinutos(horaInicio)) {
            throw new Error("Error: La hora de fin debe ser mayor que la hora de inicio.");
        }

        Object.assign(this, { id, codigo, laboratorioId, usuarioId, fecha, horaInicio, horaFin, motivo, estado, creadoEn });
    }

    duracionHoras() {
        return (aMinutos(this.horaFin) - aMinutos(this.horaInicio)) / 60;
    }

    // Se cruzan si es el mismo laboratorio, el mismo día y los intervalos se solapan
    seCruzaCon(otra) {
        return this.laboratorioId === otra.laboratorioId &&
               this.fecha === otra.fecha &&
               aMinutos(this.horaInicio) < aMinutos(otra.horaFin) &&
               aMinutos(otra.horaInicio) < aMinutos(this.horaFin);
    }
}