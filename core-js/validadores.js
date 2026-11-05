// core-js/validadores.js

export const validarCorreo = (correo) => {
    const regex = /^[a-z0-9._%+-]+@utp\.edu\.pe$/i;
    if (!regex.test(correo)) {
        throw new Error(`Error: El correo "${correo}" no es válido. Debe pertenecer al dominio @utp.edu.pe`);
    }
    return true;
};

export const validarCodigoAlumno = (codigo) => {
    const regex = /^U\d{8}$/;
    if (!regex.test(codigo)) {
        throw new Error(`Error: El código "${codigo}" es incorrecto. Debe empezar con 'U' seguido de 8 dígitos.`);
    }
    return true;
};

export const validarFecha = (fecha) => {
    // Formato AAAA-MM-DD
    const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
    if (!regex.test(fecha)) {
        throw new Error(`Error: La fecha "${fecha}" no cumple el formato AAAA-MM-DD.`);
    }
    return true;
};

export const validarHora = (hora) => {
    // Formato HH:mm (24 horas)
    const regex = /^([01]\d|2[0-3]):[0-5]\d$/;
    if (!regex.test(hora)) {
        throw new Error(`Error: La hora "${hora}" no es válida. Debe usar el formato HH:mm.`);
    }
    return true;
};