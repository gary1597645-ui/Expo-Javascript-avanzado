const aMinutos = (hhmm) => {
    const [h, m] = hhmm.split(':').map(Number);
    return h * 60 + m;
};

export class Usuario {
    constructor({ id, nombre, correo, codigo, rol, password }) {
        Object.assign(this, { id, nombre, correo, codigo, rol, password });
    }
}

export class Laboratorio {
    constructor({ id, nombre, sede, capacidad, equipos, estado }) {
        Object.assign(this, { id, nombre, sede, capacidad, equipos, estado });
    }
}

export class Reserva {
    constructor({ id, codigo, laboratorioId, usuarioId, fecha, horaInicio, horaFin, motivo, estado = 'pendiente', creadoEn }) {
        Object.assign(this, { id, codigo, laboratorioId, usuarioId, fecha, horaInicio, horaFin, motivo, estado, creadoEn });
    }

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