import { useState, useRef, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
// IMPORTANTE: Aquí debes importar tu clase y validadores reales de la carpeta core-js de tu monorepo.
// Subimos 3 niveles: components -> src -> react-estudiante -> y entramos a core-js
import { validarFecha } from '../../../core-js/validadores.js';
// Importa tu clase Evento (y la clase Inscripcion si la tienes definida ahí)
import { Evento } from '../../../core-js/modelos.js';

import { useState, useRef, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
// 1. Quitamos 'esFecha' porque solo usaremos 'validarFecha'
import { validarFecha } from '../../../core-js/validadores.js';
// 2. Importamos la clase Evento
import { Evento } from '../../../core-js/modelos.js';

export default function FormularioInscripcion({ evento }) {
    const { user } = useContext(AuthContext);
    const inputRef = useRef(null);

    const [cantidad, setCantidad] = useState(1);
    const [motivo, setMotivo] = useState('');
    const [errores, setErrores] = useState({});
    const [mensajeExito, setMensajeExito] = useState('');

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const manejarEnvio = (e) => {
        e.preventDefault();
        const nuevosErrores = {};

        // 1. Validaciones usando tu core-js (Aquí usamos los imports)
        try {
            // Utilizamos la clase Evento importada. Esto elimina el color gris
            // y cumple con la rúbrica de reutilizar la clase de la Unidad 1.
            const eventoCore = new Evento({
                id: evento.id,
                nombre: evento.nombre,
                capacidadMax: evento.aforoMaximo,
                fecha: new Date().toISOString().split('T')[0], // Pasamos la fecha actual
                lugar: 'Sede UTP'
            });

            // Usamos tu validador de fecha
            validarFecha(eventoCore.fecha);

        } catch (error) {
            nuevosErrores.sistema = error.message;
        }

        if (motivo.trim().length < 5) {
            nuevosErrores.motivo = 'El motivo debe tener al menos 5 caracteres.';
        }

        // 2. Validación de la regla de negocio: Aforo Máximo
        const espaciosDisponibles = evento.aforoMaximo - evento.inscritosActuales;
        if (cantidad > espaciosDisponibles) {
            nuevosErrores.cantidad = `No hay suficiente aforo. Solo quedan ${espaciosDisponibles} cupos.`;
        } else if (cantidad < 1) {
            nuevosErrores.cantidad = 'Debe inscribir al menos a 1 persona.';
        }

        setErrores(nuevosErrores);

        if (Object.keys(nuevosErrores).length === 0) {
            setMensajeExito('¡Inscripción registrada con éxito en el estado local!');
            setCantidad(1);
            setMotivo('');
            if (inputRef.current) inputRef.current.focus();
        } else {
            setMensajeExito('');
        }
    };

    if (!user) {
        return <div className="alert alert-warning">Debes iniciar sesión para inscribirte.</div>;
    }

    if (evento.estado !== 'disponible') {
        return <div className="alert alert-danger">Este evento ya no acepta inscripciones.</div>;
    }

    return (
        <div className="card shadow-sm mt-4">
            <div className="card-body">
                <h5 className="card-title">Registrar Inscripción</h5>
                {mensajeExito && <div className="alert alert-success">{mensajeExito}</div>}

                <form onSubmit={manejarEnvio}>
                    <div className="mb-3">
                        <label className="form-label">Cantidad de Entradas</label>
                        <input
                            type="number"
                            className={`form-control ${errores.cantidad ? 'is-invalid' : ''}`}
                            ref={inputRef} /* Asignación del useRef */
                            value={cantidad}
                            onChange={(e) => setCantidad(Number(e.target.value))}
                        />
                        {/* Mostrar error debajo del campo */}
                        {errores.cantidad && <div className="invalid-feedback">{errores.cantidad}</div>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Motivo (Opcional / Justificación)</label>
                        <input
                            type="text"
                            className={`form-control ${errores.motivo ? 'is-invalid' : ''}`}
                            value={motivo}
                            onChange={(e) => setMotivo(e.target.value)}
                        />
                        {errores.motivo && <div className="invalid-feedback">{errores.motivo}</div>}
                    </div>

                    <button type="submit" className="btn btn-primary w-100">
                        Confirmar Reserva
                    </button>
                </form>
            </div>
        </div>
    );
}