const BASE_URL = 'http://localhost:3000';

export const obtenerEventos = async () => {
    const response = await fetch(`${BASE_URL}/eventos`);
    if (!response.ok) {
        throw new Error(`Error ${response.status}: No se pudo cargar el catálogo de eventos.`);
    }
    return response.json();
};

export const obtenerEventoPorId = async (id) => {
    const response = await fetch(`${BASE_URL}/eventos/${id}`);
    if (!response.ok) {
        if (response.status === 404) {
            throw new Error('404: El evento solicitado no existe.');
        }
        throw new Error(`Error ${response.status}: No se pudo obtener el detalle del evento.`);
    }
    return response.json();
};