import { validarCorreo, validarCodigoAlumno, validarFecha, validarHora } from './validadores.js';

const aMinutos = (hhmm) => {
    const [h, m] = hhmm.split(':').map(Number);
    return h * 60 + m;
};

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

export class Laboratorio {
    constructor({ id, nombre, sede, capacidad, equipos, estado }) {
        if (!Number.isInteger(capacidad) || capacidad < 1 || capacidad > 60) {
            throw new Error('Error: La capacidad del laboratorio debe ser un entero entre 1 y 60.');
        }
        this._id = id;
        this._nombre = nombre;
        this._sede = sede;
        this._capacidad = capacidad;
        this._equipos = equipos;
        this._estado = estado;
    }

    get id() { return this._id; }
    get nombre() { return this._nombre; }
    get sede() { return this._sede; }
    get capacidad() { return this._capacidad; }
    get equipos() { return this._equipos; }
    get estado() { return this._estado; }
}

export class Reserva {
    constructor({ id, codigo, laboratorioId, usuarioId, fecha, horaInicio, horaFin, motivo, estado = 'pendiente', creadoEn }) {
        validarFecha(fecha);
        validarHora(horaInicio);
        validarHora(horaFin);
        if (aMinutos(horaFin) <= aMinutos(horaInicio)) {
            throw new Error('Error: La hora de fin debe ser mayor que la hora de inicio.');
        }
        this._id = id;
        this._codigo = codigo;
        this._laboratorioId = laboratorioId;
        this._usuarioId = usuarioId;
        this._fecha = fecha;
        this._horaInicio = horaInicio;
        this._horaFin = horaFin;
        this._motivo = motivo;
        this._estado = estado;
        this._creadoEn = creadoEn;
    }

    get id() { return this._id; }
    get codigo() { return this._codigo; }
    get laboratorioId() { return this._laboratorioId; }
    get usuarioId() { return this._usuarioId; }
    get fecha() { return this._fecha; }
    get horaInicio() { return this._horaInicio; }
    get horaFin() { return this._horaFin; }
    get motivo() { return this._motivo; }
    get estado() { return this._estado; }
    get creadoEn() { return this._creadoEn; }

    duracionHoras() {
        return (aMinutos(this.horaFin) - aMinutos(this.horaInicio)) / 60;
    }

    seCruzaCon(otra) {
        return this.laboratorioId === otra.laboratorioId &&
            this.fecha === otra.fecha &&
            aMinutos(this.horaInicio) < aMinutos(otra.horaFin) &&
            aMinutos(otra.horaInicio) < aMinutos(this.horaFin);
    }
}