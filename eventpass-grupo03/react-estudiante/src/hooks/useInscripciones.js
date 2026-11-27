import { useState, useEffect, useCallback } from 'react';
import {
    listarInscripcionesPorEstudiante,
    listarTodasInscripciones,
    crearInscripcionApi,
    cancelarInscripcionApi,
} from '../services/inscripcionesAxios';

export const useInscripciones = (estudianteId, incluirTodas = false) => {
    const [datos, setDatos] = useState([]);
    const [todas, setTodas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    const cargar = useCallback(async (silencioso = false) => {
        if (!estudianteId) {
            setDatos([]);
            setTodas([]);
            setCargando(false);
            return;
        }
        if (!silencioso) setCargando(true);
        setError(null);

        try {
            const [lista, listaCompleta] = incluirTodas
                ? await Promise.all([
                    listarInscripcionesPorEstudiante(estudianteId),
                    listarTodasInscripciones(),
                ])
                : [await listarInscripcionesPorEstudiante(estudianteId), []];
            setDatos(lista);
            if (incluirTodas) setTodas(listaCompleta);
        } catch (err) {
            setError(err.message);
        } finally {
            if (!silencioso) setCargando(false);
        }
    }, [estudianteId, incluirTodas]);

    useEffect(() => {
        cargar(false);
        const intervalo = setInterval(() => cargar(true), 15000);
        return () => clearInterval(intervalo);
    }, [cargar]);

    const crear = async (payload) => {
        const creada = await crearInscripcionApi(payload);
        setDatos((prev) => [...prev, creada]);
        if (incluirTodas) setTodas((prev) => [...prev, creada]);
        return creada;
    };

    const cancelar = async (id) => {
        await cancelarInscripcionApi(id);
        setDatos((prev) => prev.filter((item) => item.id !== id));
        if (incluirTodas) setTodas((prev) => prev.filter((item) => item.id !== id));
    };

    return { datos, todas, cargando, error, crear, cancelar, recargar: () => cargar(false) };
};