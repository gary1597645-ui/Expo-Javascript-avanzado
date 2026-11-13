import { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { InscripcionesContext } from '../context/InscripcionesContext';
import { esCorreoUTP, esFecha } from '../core/validadores.js';
import { Evento } from '../core/modelos.js';

const hoy = () => {
    const fecha = new Date();
    fecha.setMinutes(fecha.getMinutes() - fecha.getTimezoneOffset());
    return fecha.toISOString().slice(0, 10);
};

export default function FormularioInscripcion({ evento }) {
    const { user } = useContext(AuthContext);
    const { inscripciones, crear } = useContext(InscripcionesContext);
    const correoRef = useRef(null);
    const [correo, setCorreo] = useState(user?.correo ?? '');
    const [fecha, setFecha] = useState(hoy());
    const [errores, setErrores] = useState({});
    const [exito, setExito] = useState('');

    useEffect(() => {
        correoRef.current?.focus();
    }, []);

    const enviar = (e) => {
        e.preventDefault();
        const nuevosErrores = {};
        if (!esCorreoUTP(correo)) nuevosErrores.correo = 'Ingresa un correo @utp.edu.pe válido.';
        else if (correo.toLowerCase() !== user.correo.toLowerCase()) {
            nuevosErrores.correo = 'Usa el correo de la sesión iniciada.';
        }
        if (!esFecha(fecha)) nuevosErrores.fecha = 'La fecha debe tener formato AAAA-MM-DD.';
        else if (fecha < hoy() || fecha > evento.fecha) {
            nuevosErrores.fecha = 'La fecha debe ser actual y no superar la fecha del evento.';
        }

        try {
            const eventoCore = new Evento(evento);
            if (!eventoCore.tieneCupo(inscripciones)) {
                nuevosErrores.aforo = 'El evento ya no tiene cupos disponibles.';
            } else if (inscripciones.some((inscripcion) => (
                inscripcion.eventoId === evento.id
                && inscripcion.estudianteId === user.id
                && inscripcion.estado !== 'cancelada'
            ))) {
                nuevosErrores.aforo = 'Ya tienes una inscripción activa en este evento.';
            }
        } catch (error) {
            nuevosErrores.aforo = error.message;
        }

        setErrores(nuevosErrores);
        setExito('');
        if (Object.keys(nuevosErrores).length > 0) return;

        try {
            const inscripcion = crear({ eventoId: evento.id, usuario: user, fechaInscripcion: fecha });
            setExito(`Inscripción ${inscripcion.codigo} registrada.`);
            setCorreo('');
            setFecha(hoy());
            correoRef.current?.focus();
        } catch (error) {
            setErrores({ fecha: error.message });
        }
    };

    if (!user) {
        return <div className="alert alert-warning">Debes <Link to="/login">iniciar sesión</Link> para inscribirte.</div>;
    }

    return (
        <div className="card shadow-sm mt-4">
            <div className="card-body">
                <h5 className="card-title">Registrar inscripción</h5>
                {exito && <div className="alert alert-success">{exito}</div>}
                {errores.aforo && <div className="alert alert-danger">{errores.aforo}</div>}
                <form onSubmit={enviar} noValidate>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="correo-inscripcion">Correo institucional</label>
                        <input
                            id="correo-inscripcion"
                            type="email"
                            ref={correoRef}
                            className={`form-control ${errores.correo ? 'is-invalid' : ''}`}
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                        />
                        {errores.correo && <div className="invalid-feedback">{errores.correo}</div>}
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="fecha-inscripcion">Fecha de inscripción</label>
                        <input
                            id="fecha-inscripcion"
                            type="date"
                            className={`form-control ${errores.fecha ? 'is-invalid' : ''}`}
                            value={fecha}
                            onChange={(e) => setFecha(e.target.value)}
                        />
                        {errores.fecha && <div className="invalid-feedback">{errores.fecha}</div>}
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Confirmar inscripción</button>
                </form>
            </div>
        </div>
    );
}
