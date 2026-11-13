import { useState, useRef, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { validarFecha } from '../../../core-js/validadores.js';
import { Evento } from '../../../core-js/modelos.js';

export default function FormularioInscripcion({ evento }) {

    // Obtenemos los datos del usuario autenticado desde el contexto.
    const { user } = useContext(AuthContext);

    // Referencia para acceder al input de cantidad y enfocarlo automáticamente.
    const inputRef = useRef(null);

    // Estados para almacenar los datos del formulario, errores y mensaje de éxito.
    const [cantidad, setCantidad] = useState(1);
    const [motivo, setMotivo] = useState('');
    const [errores, setErrores] = useState({});
    const [mensajeExito, setMensajeExito] = useState('');

    // Al cargar el componente, colocamos el cursor en el campo de cantidad.
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    // Procesa el envío del formulario y ejecuta las validaciones.
    const manejarEnvio = (e) => {
        e.preventDefault();

        const nuevosErrores = {};

        // Validamos la información del evento utilizando la clase y el validador de core-js.
        try {
            const eventoCore = new Evento({
                id: evento.id,
                nombre: evento.nombre,
                capacidadMax: evento.aforoMaximo,
                fecha: new Date().toISOString().split('T')[0],
                lugar: 'Sede UTP'
            });

            validarFecha(eventoCore.fecha);

        } catch (error) {
            nuevosErrores.sistema = error.message;
        }

        // El motivo es opcional, pero si se completa debe tener al menos 5 caracteres.
        const motivoLimpio = motivo.trim();

        if (motivoLimpio.length > 0 && motivoLimpio.length < 5) {
            nuevosErrores.motivo = 'El motivo debe tener al menos 5 caracteres.';
        }

        // Comprobamos que la cantidad solicitada no supere el aforo disponible.
        const espaciosDisponibles = evento.aforoMaximo - evento.inscritosActuales;

        if (cantidad > espaciosDisponibles) {
            nuevosErrores.cantidad = `No hay suficiente aforo. Solo quedan ${espaciosDisponibles} cupos.`;
        } else if (cantidad < 1) {
            nuevosErrores.cantidad = 'Debe inscribir al menos a 1 persona.';
        }

        // Actualizamos el estado de errores con los resultados de las validaciones.
        setErrores(nuevosErrores);

        // Si no existen errores, mostramos la confirmación y reiniciamos el formulario.
        if (Object.keys(nuevosErrores).length === 0) {
            setMensajeExito('¡Inscripción registrada con éxito en el estado local!');
            setCantidad(1);
            setMotivo('');

            // Devolvemos el foco al campo de cantidad.
            if (inputRef.current) inputRef.current.focus();

        } else {
            setMensajeExito('');
        }
    };

    // Impedimos mostrar el formulario si el usuario no ha iniciado sesión.
    if (!user) {
        return <div className="alert alert-warning">
            Debes iniciar sesión para inscribirte.
        </div>;
    }

    // Comprobamos que el evento permita recibir nuevas inscripciones.
    if (evento.estado !== 'disponible') {
        return <div className="alert alert-danger">
            Este evento ya no acepta inscripciones.
        </div>;
    }

    return (
        <div className="card shadow-sm mt-4">
            <div className="card-body">
                <h5 className="card-title">Registrar Inscripción</h5>

                {/* Mensaje que aparece cuando la inscripción es correcta. */}
                {mensajeExito && (
                    <div className="alert alert-success">
                        {mensajeExito}
                    </div>
                )}

                {/* Muestra los errores producidos durante las validaciones del sistema. */}
                {errores.sistema && (
                    <div className="alert alert-danger">
                        {errores.sistema}
                    </div>
                )}

                <form onSubmit={manejarEnvio}>

                    {/* Campo para indicar la cantidad de entradas solicitadas. */}
                    <div className="mb-3">
                        <label className="form-label">Cantidad de Entradas</label>

                        <input
                            type="number"
                            className={`form-control ${errores.cantidad ? 'is-invalid' : ''}`}
                            ref={inputRef}
                            value={cantidad}
                            onChange={(e) => setCantidad(Number(e.target.value))}
                        />

                        {errores.cantidad && (
                            <div className="invalid-feedback">
                                {errores.cantidad}
                            </div>
                        )}
                    </div>

                    {/* Campo opcional para indicar el motivo de la inscripción. */}
                    <div className="mb-3">
                        <label className="form-label">
                            Motivo (Opcional / Justificación)
                        </label>

                        <input
                            type="text"
                            className={`form-control ${errores.motivo ? 'is-invalid' : ''}`}
                            value={motivo}
                            onChange={(e) => setMotivo(e.target.value)}
                        />

                        {errores.motivo && (
                            <div className="invalid-feedback">
                                {errores.motivo}
                            </div>
                        )}
                    </div>

                    {/* Envía el formulario para ejecutar las validaciones. */}
                    <button type="submit" className="btn btn-primary w-100">
                        Confirmar Reserva
                    </button>

                </form>
            </div>
        </div>
    );
}