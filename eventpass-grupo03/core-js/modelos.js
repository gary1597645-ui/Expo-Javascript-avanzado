import { validarCorreo, validarCodigoAlumno, validarFecha } from './validadores.js';

export class Usuario {
    constructor({ id, nombre, correo, codigo, rol, password }) {
        validarCorreo(correo);
        validarCodigoAlumno(codigo);
        this._id = id;
        this._nombre = nombre;
        this._correo = correo;
        this._codigo = codigo;
        this._rol = rol;
        this._password = password;
    }

    get id() { return this._id; }
    get nombre() { return this._nombre; }
    get correo() { return this._correo; }
    get codigo() { return this._codigo; }
    get rol() { return this._rol; }
    get password() { return this._password; }
}

export class Evento {
    constructor({ id, nombre, capacidadMax, fecha, lugar, descripcion = '' }) {
        if (!Number.isInteger(capacidadMax) || capacidadMax < 1) {
            throw new Error('Error: El aforo debe ser un entero mayor que cero.');
        }
        validarFecha(fecha);
        this._id = id;
        this._nombre = nombre;
        this._capacidadMax = capacidadMax;
        this._fecha = fecha;
        this._lugar = lugar;
        this._descripcion = descripcion;
    }

    get id() { return this._id; }
    get nombre() { return this._nombre; }
    get capacidadMax() { return this._capacidadMax; }
    get fecha() { return this._fecha; }
    get lugar() { return this._lugar; }
    get descripcion() { return this._descripcion; }

    tieneCupo(inscripciones) {
        const confirmadas = inscripciones.filter(inscripcion =>
            inscripcion.eventoId === this.id && inscripcion.estado === 'confirmada'
        ).length;
        return confirmadas < this.capacidadMax;
    }
}

export class Inscripcion {
    constructor({ id, codigo, eventoId, estudianteId, estudianteNombre, fechaInscripcion, estado = 'confirmada' }) {
        validarFecha(fechaInscripcion);
        this._id = id;
        this._codigo = codigo;
        this._eventoId = eventoId;
        this._estudianteId = estudianteId;
        this._estudianteNombre = estudianteNombre;
        this._fechaInscripcion = fechaInscripcion;
        this._estado = estado;
    }

    get id() { return this._id; }
    get codigo() { return this._codigo; }
    get eventoId() { return this._eventoId; }
    get estudianteId() { return this._estudianteId; }
    get estudianteNombre() { return this._estudianteNombre; }
    get fechaInscripcion() { return this._fechaInscripcion; }
    get estado() { return this._estado; }
}