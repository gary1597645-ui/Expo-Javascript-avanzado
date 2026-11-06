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
    inscripciones.filter(inscripcion => inscripcion.estado === 'confirmada').forEach(inscripcion => {
        ocupacion.set(inscripcion.eventoId, (ocupacion.get(inscripcion.eventoId) || 0) + 1);
    });
    return ocupacion;
};

// 3. Lugares únicos con Set
export const obtenerLugaresUnicos = (eventos) => {
    return [...new Set(eventos.map(evento => evento.lugar))];
};

// 4. Ranking por porcentaje de aforo confirmado
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