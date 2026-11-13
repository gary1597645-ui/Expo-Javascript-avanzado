import { createContext, useState } from 'react';
import db from '../data/db.json';
import { Inscripcion } from '../core/modelos.js';

export const InscripcionesContext = createContext();

export function InscripcionesProvider({ children }) {
  const [inscripciones, setInscripciones] = useState(db.inscripciones);

  const crear = ({ eventoId, usuario, fechaInscripcion }) => {
    const id = Math.max(0, ...inscripciones.map((inscripcion) => Number(inscripcion.id) || 0)) + 1;
    const nueva = new Inscripcion({
      id,
      codigo: `INS-${String(id).padStart(4, '0')}`,
      eventoId,
      estudianteId: usuario.id,
      estudianteNombre: usuario.nombre,
      fechaInscripcion,
      estado: 'confirmada',
    });
    const registro = {
      id: nueva.id,
      codigo: nueva.codigo,
      eventoId: nueva.eventoId,
      estudianteId: nueva.estudianteId,
      estudianteNombre: nueva.estudianteNombre,
      fechaInscripcion: nueva.fechaInscripcion,
      estado: nueva.estado,
    };

    setInscripciones((actuales) => [...actuales, registro]);
    return registro;
  };

  const cancelar = (id) => {
    setInscripciones((actuales) => actuales.map((inscripcion) => (
      inscripcion.id === id ? { ...inscripcion, estado: 'cancelada' } : inscripcion
    )));
  };

  return (
    <InscripcionesContext.Provider value={{ inscripciones, crear, cancelar }}>
      {children}
    </InscripcionesContext.Provider>
  );
}
