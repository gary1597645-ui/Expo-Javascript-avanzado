export const esCorreoUTP = (correo) => /^[a-z0-9._%+-]+@utp\.edu\.pe$/i.test(correo);
export const esCodigoAlumno = (codigo) => /^U\d{8}$/.test(codigo);
export const esHora = (hora) => /^([01]\d|2[0-3]):[0-5]\d$/.test(hora);
export const esFecha = (fecha) => /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(fecha);

export const mensajeErrorValidacion = (campo, valor) => `Error: El valor "${valor}" no es válido para el campo ${campo}.`;

const validar = (valido, campo, valor) => {
    if (!valido) {
        throw new Error(mensajeErrorValidacion(campo, valor));
    }
    return true;
};

export const validarCorreo = (correo) => validar(esCorreoUTP(correo), 'correo institucional (@utp.edu.pe)', correo);
export const validarCodigoAlumno = (codigo) => validar(esCodigoAlumno(codigo), 'código de alumno (U + 8 dígitos)', codigo);
export const validarHora = (hora) => validar(esHora(hora), 'hora (HH:mm)', hora);
export const validarFecha = (fecha) => validar(esFecha(fecha), 'fecha (AAAA-MM-DD)', fecha);