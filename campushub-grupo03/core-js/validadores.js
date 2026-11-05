export const esCorreoUTP = (correo) => /^[a-z0-9._%+-]+@utp\.edu\.pe$/i.test(correo);
export const esCodigoAlumno = (codigo) => /^U\d{8}$/.test(codigo);
export const esHora = (hora) => /^([01]\d|2[0-3]):[0-5]\d$/.test(hora);
export const esFecha = (fecha) => /^\d{4}-\d{2}-\d{2}$/.test(fecha);

export const mensajeErrorValidacion = (campo, valor) => `Error: El valor "${valor}" no es válido para el campo ${campo}.`;