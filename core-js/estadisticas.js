// core-js/estadisticas.js

// 1. Reservas por estado con reduce
export const contarReservasPorEstado = (reservas) => {
    return reservas.reduce((acumulador, reserva) => {
        // Inicializa en 0 si no existe la propiedad, luego suma 1
        acumulador[reserva.estado] = (acumulador[reserva.estado] || 0) + 1;
        return acumulador;
    }, {}); // El valor inicial es un objeto vacío
};

// 2. Ocupación por laboratorio con Map
export const calcularOcupacionPorLaboratorio = (reservas) => {
    const ocupacion = new Map();
    
    reservas.forEach(reserva => {
        const totalActual = ocupacion.get(reserva.laboratorioId) || 0;
        ocupacion.set(reserva.laboratorioId, totalActual + 1);
    });
    
    return ocupacion;
};

// 3. Sedes únicas con Set
export const obtenerSedesUnicas = (laboratorios) => {
    // Mapeamos solo las sedes y el Set elimina los duplicados
    return [...new Set(laboratorios.map(lab => lab.sede))];
};

// 4. Ranking de laboratorios más reservados con sort y operador spread
export const obtenerRankingLaboratorios = (ocupacionMap, laboratorios) => {
    const ranking = laboratorios.map(lab => ({
        ...lab,
        totalReservas: ocupacionMap.get(lab.id) || 0
    }));
    
    // Usamos spread [...] para no mutar el arreglo original con sort()
    return [...ranking].sort((a, b) => b.totalReservas - a.totalReservas);
};

// 5. Generador de códigos con closure usando padStart
export const crearGeneradorCodigo = (prefijo = 'RES', inicio = 1) => {
    let contador = inicio; // Esta variable queda encapsulada (closure)
    
    return () => {
        // padStart(4, '0') asegura que siempre tenga 4 dígitos: 0001, 0002, etc.
        const codigo = `${prefijo}-${String(contador).padStart(4, '0')}`;
        contador++;
        return codigo;
    };
};