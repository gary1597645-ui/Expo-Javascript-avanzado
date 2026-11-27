// 1. Inscripciones por estado con reduce
export const contarInscripcionesPorEstado = (inscripciones) => {
    return inscripciones.reduce((acc, inscripcion) => {
        acc[inscripcion.estado] = (acc[inscripcion.estado] || 0) + 1;
        return acc;
    }, {});
};

// 2. Aforo ocupado por evento con Map
export const calcularAforoPorEvento = (inscripciones) => {
    const ocupacion = new Map();
    const estadosQueOcupanCupo = ['confirmada', 'aprobada'];

    inscripciones
        .filter((inscripcion) => estadosQueOcupanCupo.includes(inscripcion.estado))
        .forEach((inscripcion) => {
            const key = Number(inscripcion.eventoId);
            ocupacion.set(key, (ocupacion.get(key) || 0) + 1);
        });
    return ocupacion;
};

// 3. Lugares únicos con Set
export const obtenerLugaresUnicos = (eventos) => {
    return [...new Set(eventos.map(evento => evento.lugar))];
};

// 4. Ranking por porcentaje de aforo ocupado
export const rankingEventosPorAforo = (eventos, inscripciones) => {
    const aforoPorEvento = calcularAforoPorEvento(inscripciones);
    return [...eventos]
        .map(evento => {
            const inscritos = aforoPorEvento.get(evento.id) || 0;
            return {
                ...evento,
                inscritos,
                porcentajeAforo: Math.round((inscritos / evento.capacidadMax) * 100)
            };
        })
        .sort((a, b) => b.porcentajeAforo - a.porcentajeAforo);
};

// 5. Generador de códigos con closure usando padStart
export const creadorGeneradorCodigo = (prefijo = 'INS') => {
    let contador = 0;
    return () => {
        contador++; // Recuerda el valor en cada llamada
        return `${prefijo}-${contador.toString().padStart(4, '0')}`;
    };
};

// 6. Grilla bidimensional evento x hora (07:00 a 22:00) para vue-kiosko
export const construirGrillaDisponibilidad = (eventos = [], inscripciones = [], horaInicio = 7, horaFin = 22) => {
    const horas = [];
    for (let h = horaInicio; h <= horaFin; h++) {
        horas.push(`${String(h).padStart(2, '0')}:00`);
    }

    const filas = eventos.map((evento) => {
        const inscripcionesEvento = inscripciones.filter(
            (ins) => Number(ins.eventoId) === Number(evento.id) &&
                !['cancelada', 'rechazada'].includes(ins.estado)
        );
        const aprobadas = inscripcionesEvento.filter((i) =>
            ['confirmada', 'aprobada'].includes(i.estado)
        ).length;
        const pendientes = inscripcionesEvento.filter((i) =>
            ['pendiente', 'en_espera'].includes(i.estado)
        ).length;

        const celdas = horas.map((hora) => {
            // Si el evento tiene franja horaria (horaInicio/horaFin), se evalúa por hora; si no, aplica al día del evento
            const hNum = Number(hora.slice(0, 2));
            const evIni = evento.horaInicio ? Number(evento.horaInicio.slice(0, 2)) : 7;
            const evFin = evento.horaFin ? Number(evento.horaFin.slice(0, 2)) : 23;
            const dentroDeHorario = hNum >= evIni && hNum < evFin;

            let estado = 'libre';
            if (dentroDeHorario) {
                if (aprobadas >= (evento.capacidadMax || 1)) {
                    estado = 'ocupada';
                } else if (pendientes > 0) {
                    estado = 'pendiente';
                }
            }

            return {
                eventoId: evento.id,
                eventoNombre: evento.nombre,
                lugar: evento.lugar,
                fecha: evento.fecha,
                hora,
                estado, // 'libre' | 'pendiente' | 'ocupada'
                inscritos: aprobadas + pendientes,
                capacidadMax: evento.capacidadMax,
            };
        });

        return { evento, celdas };
    });

    return { horas, filas };
};