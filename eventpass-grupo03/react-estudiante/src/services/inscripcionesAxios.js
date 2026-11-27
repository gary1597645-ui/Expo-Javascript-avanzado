import axios from 'axios';

// Reutiliza la URL base y el tiempo máximo de espera en las peticiones.
const api = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 5000,
});

// Convierte errores de red y HTTP en mensajes claros para  el usuario.
api.interceptors.response.use(
    (response) => response,
    (error) => {
        let mensaje = 'Error inesperado al conectar con el servidor.';
        if (!error.response) {
            mensaje = 'Sin conexión con json-server (puerto 3000).';
        } else if (error.response.status === 404) {
            mensaje = 'La inscripción solicitada no fue encontrada (404).';
        } else if (error.response.status >= 500) {
            mensaje = 'Error interno del servidor (500).';
        }
        return Promise.reject(new Error(mensaje));
    }
);

export const listarInscripcionesPorEstudiante = async (estudianteId) => {
    const { data } = await api.get(`/inscripciones?estudianteId=${estudianteId}`);
    return data;
};

export const listarTodasInscripciones = async () => {
    const { data } = await api.get('/inscripciones');
    return data;
};

export const crearInscripcionApi = async (nuevaInscripcion) => {
    const { data } = await api.post('/inscripciones', nuevaInscripcion);
    return data;
};

export const cancelarInscripcionApi = async (id) => {
    await api.delete(`/inscripciones/${id}`);
};