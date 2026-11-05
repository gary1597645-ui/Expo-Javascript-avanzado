import { test } from 'node:test';
import assert from 'node:assert/strict';
import { esCorreoUTP, esCodigoAlumno, esHora } from './validadores.js';
import { Reserva } from './modelos.js';
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