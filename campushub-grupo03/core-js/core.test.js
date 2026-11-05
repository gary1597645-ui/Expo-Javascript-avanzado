import { test } from 'node:test';
import assert from 'node:assert/strict';
import { esCorreoUTP, esCodigoAlumno, esHora, esFecha, validarCorreo } from './validadores.js';
import { Laboratorio, Reserva, Usuario } from './modelos.js';
import { creadorGeneradorCodigo, contarReservasPorEstado } from './estadisticas.js';

test('1. Validadores: Correo institucional UTP válido', () => {
    assert.equal(esCorreoUTP('U20231234@utp.edu.pe'), true);
});

test('2. Validadores: Correo incorrecto es rechazado', () => {
    assert.equal(esCorreoUTP('admin@gmail.com'), false);
});

test('3. Validadores: Código de alumno válido con U y 8 dígitos', () => {
    assert.equal(esCodigoAlumno('U12345678'), true);
});

test('4. Validadores: Formato de hora correcto (HH:mm)', () => {
    assert.equal(esHora('08:30'), true);
    assert.equal(esHora('25:00'), false); // Hora inválida
});

test('4a. Validadores: Fecha y mensaje de error', () => {
    assert.equal(esFecha('2026-11-20'), true);
    assert.equal(esFecha('2026-13-20'), false);
    assert.throws(() => validarCorreo('admin@gmail.com'), /admin@gmail\.com.*correo institucional/);
});

test('4b. Modelos: Los getters exponen los datos de las entidades', () => {
    const usuario = new Usuario({
        id: 1, nombre: 'Ana', correo: 'ana@utp.edu.pe', codigo: 'U12345678', rol: 'estudiante', password: 'secreto'
    });
    const laboratorio = new Laboratorio({
        id: 2, nombre: 'Lab A-301', sede: 'Lima Centro', capacidad: 30, equipos: [], estado: 'disponible'
    });
    const reserva = new Reserva({
        id: 3, codigo: 'RES-0001', laboratorioId: 2, usuarioId: 1, fecha: '2026-11-20',
        horaInicio: '08:00', horaFin: '09:00', motivo: 'Clase'
    });

    assert.equal(usuario.nombre, 'Ana');
    assert.equal(laboratorio.capacidad, 30);
    assert.equal(reserva.estado, 'pendiente');
});

test('5. Modelos: Reservas contiguas no se cruzan', () => {
    const a = new Reserva({ laboratorioId: 1, fecha: '2026-11-20', horaInicio: '08:00', horaFin: '10:00' });
    const b = new Reserva({ laboratorioId: 1, fecha: '2026-11-20', horaInicio: '10:00', horaFin: '11:00' });
    assert.equal(a.seCruzaCon(b), false);
});

test('6. Modelos: Reservas en el mismo horario y lab se cruzan', () => {
    const a = new Reserva({ laboratorioId: 1, fecha: '2026-11-20', horaInicio: '09:00', horaFin: '11:00' });
    const b = new Reserva({ laboratorioId: 1, fecha: '2026-11-20', horaInicio: '10:00', horaFin: '12:00' });
    assert.equal(a.seCruzaCon(b), true);
});

test('7. Estadísticas: Generador de códigos incrementa usando closure', () => {
    const generar = creadorGeneradorCodigo('RES');
    assert.equal(generar(), 'RES-0001');
    assert.equal(generar(), 'RES-0002');
});

test('8. Estadísticas: reduce cuenta correctamente las reservas por estado', () => {
    const reservas = [{ estado: 'aprobada' }, { estado: 'pendiente' }, { estado: 'aprobada' }];
    const resultado = contarReservasPorEstado(reservas);
    assert.deepEqual(resultado, { aprobada: 2, pendiente: 1 });
});