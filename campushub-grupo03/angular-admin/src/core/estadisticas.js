// 1. Reservas por estado con reduce (el valor inicial es un objeto {})
export const contarReservasPorEstado = (reservas) => {
    return reservas.reduce((acc, reserva) => {
        acc[reserva.estado] = (acc[reserva.estado] || 0) + 1;
        return acc;
    }, {});
};

// 2. Ocupación por laboratorio con Map
export const calcularOcupacionPorLab = (reservas) => {
    const ocupacion = new Map();
    reservas.forEach(r => {
        const horas = r.duracionHoras ? r.duracionHoras() : 0;
        ocupacion.set(r.laboratorioId, (ocupacion.get(r.laboratorioId) || 0) + horas);
    });
    return ocupacion;
};

// 3. Sedes únicas con Set
export const obtenerSedesUnicas = (laboratorios) => {
    return [...new Set(laboratorios.map(lab => lab.sede))];
};

// 4. Ranking de laboratorios más reservados con sort y operador spread
export const rankingLaboratorios = (reservas) => {
    const conteo = reservas.reduce((acc, r) => {
        acc[r.laboratorioId] = (acc[r.laboratorioId] || 0) + 1;
        return acc;
    }, {});

    return [...Object.entries(conteo)]
        .map(([id, total]) => ({ id: Number(id), total }))
        .sort((a, b) => b.total - a.total);
};

// 5. Generador de códigos con closure usando padStart
export const creadorGeneradorCodigo = (prefijo = 'RES') => {
    let contador = 0;
    return () => {
        contador++; // Recuerda el valor en cada llamada
        return `${prefijo}-${contador.toString().padStart(4, '0')}`;
    };
};