import { createAlova } from 'alova';
import adapterFetch from 'alova/fetch';
import ReactHook from 'alova/react';

export const alovaInstance = createAlova({
    baseURL: 'http://localhost:3000',
    statesHook: ReactHook,
    requestAdapter: adapterFetch(),
    responded: async (response) => {
        if (!response.ok) {
            throw new Error(`Error ${response.status} al obtener el resumen desde Alova.`);
        }
        return response.json();
    },
});

export const getResumenInscripcionesMethod = (estudianteId) =>
    alovaInstance.Get(`/inscripciones?estudianteId=${estudianteId}`);