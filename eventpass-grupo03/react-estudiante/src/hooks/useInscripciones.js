import { useState, useEffect, useCallback } from 'react';
import {
    listarInscripcionesPorEstudiante,
    crearInscripcionApi,
    cancelarInscripcionApi,
} from '../services/inscripcionesAxios';

export const useInscripciones = (estudianteId) => {
    const [datos, setDatos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    const cargar = useCallback(async (silencioso = false) => {
        if (!estudianteId) {
            setDatos([]);
            setCargando(false);
            return;
        }
        if (!silencioso) setCargando(true);
        setError(null);

        try {
            const lista = await listarInscripcionesPorEstudiante(estudianteId);
            setDatos(lista);
        } catch (err) {
            setError(err.message);
        } finally {
            if (!silencioso) setCargando(false);
        }
    }, [estudianteId]);

    useEffect(() => {
        cargar(false);
        const intervalo = setInterval(() => cargar(true), 15000);
        return () => clearInterval(intervalo);
    }, [cargar]);

    const crear = async (payload) => {
        const creada = await crearInscripcionApi(payload);
        setDatos((prev) => [...prev, creada]);
        return creada;
    };

    const cancelar = async (id) => {
        await cancelarInscripcionApi(id);
        setDatos((prev) => prev.filter((item) => item.id !== id));
    };

    return { datos, cargando, error, crear, cancelar, recargar: () => cargar(false) };
};