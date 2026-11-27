import { useState, useEffect, useCallback } from 'react';
import {
    listarInscripcionesPorEstudiante,
    listarTodasInscripciones,
    crearInscripcionApi,
    cancelarInscripcionApi,
} from '../services/inscripcionesAxios';
//2Recibe el ID del estudiante y devuelve los datos,el estado de carga, el error y las funciones.
export const useInscripciones = (estudianteId, incluirTodas = false) => {
    const [datos, setDatos] = useState([]);
    const [todas, setTodas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    // . 1  Lo que hace es centralizar todas las operaciones de inscripciones: cargar, crear y cancelar.
    const cargar = useCallback(async (silencioso = false) => {
        if (!estudianteId) {
            setDatos([]);
            setTodas([]);
            setCargando(false);
            return;
        }
        if (!silencioso) setCargando(true);
        setError(null);
//Así las páginas no llaman al API directamente, solo llaman al hook.
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
        // Actualiza las inscripciones cada 15 segundos y limpia el intervalo al salir.
        const intervalo = setInterval(() => cargar(true), 15000);
        return () => clearInterval(intervalo);
    }, [cargar]);

    // Expone acciones para crear o cancelar sin repetir lógica en las páginas.
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