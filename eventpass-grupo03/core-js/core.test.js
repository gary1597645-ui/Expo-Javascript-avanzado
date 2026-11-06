import { test } from 'node:test';
import assert from 'node:assert/strict';
import { esCorreoUTP, esCodigoAlumno, esHora, esFecha, validarCorreo } from './validadores.js';
import { Evento, Inscripcion, Usuario } from './modelos.js';
import {
    calcularAforoPorEvento,
    contarInscripcionesPorEstado,
    creadorGeneradorCodigo,
    obtenerLugaresUnicos,
    rankingEventosPorAforo
} from './estadisticas.js';

test('Validadores aceptan correo institucional y rechazan otros dominios', () => {
    assert.equal(esCorreoUTP('estudiante@utp.edu.pe'), true);
    assert.equal(esCorreoUTP('estudiante@gmail.com'), false);
    assert.throws(() => validarCorreo('estudiante@gmail.com'), /correo institucional/);
});

test('Validador acepta codigo de estudiante U mas 8 digitos', () => {
    assert.equal(esCodigoAlumno('U12345678'), true);
    assert.equal(esCodigoAlumno('A12345678'), false);
});

test('Validadores reconocen formatos de hora y fecha', () => {
    assert.equal(esHora('09:30'), true);
    assert.equal(esHora('25:00'), false);
    assert.equal(esFecha('2026-12-01'), true);
    assert.equal(esFecha('2026-13-01'), false);
});

test('Modelos exponen getters de usuario, evento e inscripcion', () => {
    const usuario = new Usuario({
        id: 1, nombre: 'Ana', correo: 'ana@utp.edu.pe', codigo: 'U12345678', rol: 'estudiante', password: 'test'
    });
    const evento = new Evento({
        id: 2, nombre: 'Conferencia JS', capacidadMax: 50, fecha: '2026-12-01', lugar: 'Auditorio'
    });
    const inscripcion = new Inscripcion({
        id: 3, codigo: 'INS-0001', eventoId: 2, estudianteId: 1, fechaInscripcion: '2026-11-01'
    });

    assert.equal(usuario.nombre, 'Ana');
    assert.equal(evento.capacidadMax, 50);
    assert.equal(inscripcion.estado, 'confirmada');
});

test('Evento rechaza aforo cero o negativo', () => {
    assert.throws(() => new Evento({
        nombre: 'Conferencia', capacidadMax: 0, fecha: '2026-12-01', lugar: 'Auditorio'
    }), /aforo/);
});

test('Evento e inscripcion rechazan fechas invalidas', () => {
    assert.throws(() => new Evento({
        nombre: 'Conferencia', capacidadMax: 10, fecha: '2026-13-01', lugar: 'Auditorio'
    }), /fecha/);
    assert.throws(() => new Inscripcion({
        eventoId: 1, fechaInscripcion: 'fecha invalida'
    }), /fecha/);
});

test('Evento permite inscripciones mientras haya aforo confirmado', () => {
    const evento = new Evento({ id: 1, nombre: 'Charla', capacidadMax: 2, fecha: '2026-12-01', lugar: 'Aula 1' });
    const inscripciones = [
        new Inscripcion({ eventoId: 1, fechaInscripcion: '2026-11-01', estado: 'confirmada' }),
        new Inscripcion({ eventoId: 1, fechaInscripcion: '2026-11-02', estado: 'cancelada' })
    ];
    assert.equal(evento.tieneCupo(inscripciones), true);
});

test('Evento no permite nuevas inscripciones cuando el aforo esta completo', () => {
    const evento = new Evento({ id: 1, nombre: 'Charla', capacidadMax: 2, fecha: '2026-12-01', lugar: 'Aula 1' });
    const inscripciones = [
        new Inscripcion({ eventoId: 1, fechaInscripcion: '2026-11-01', estado: 'confirmada' }),
        new Inscripcion({ eventoId: 1, fechaInscripcion: '2026-11-02', estado: 'confirmada' })
    ];
    assert.equal(evento.tieneCupo(inscripciones), false);
});

test('reduce cuenta las inscripciones por estado', () => {
    const resultado = contarInscripcionesPorEstado([
        { estado: 'confirmada' }, { estado: 'en_espera' }, { estado: 'confirmada' }
    ]);
    assert.deepEqual(resultado, { confirmada: 2, en_espera: 1 });
});

test('Map calcula solo inscripciones confirmadas por evento', () => {
    const aforo = calcularAforoPorEvento([
        { eventoId: 1, estado: 'confirmada' },
        { eventoId: 1, estado: 'cancelada' },
        { eventoId: 2, estado: 'confirmada' }
    ]);
    assert.equal(aforo.get(1), 1);
    assert.equal(aforo.get(2), 1);
});

test('Set obtiene lugares unicos', () => {
    assert.deepEqual(obtenerLugaresUnicos([
        { lugar: 'Auditorio' }, { lugar: 'Auditorio' }, { lugar: 'Sala A' }
    ]), ['Auditorio', 'Sala A']);
});

test('Ranking ordena eventos por porcentaje de aforo', () => {
    const ranking = rankingEventosPorAforo([
        { id: 1, nombre: 'A', capacidadMax: 10 },
        { id: 2, nombre: 'B', capacidadMax: 4 }
    ], [
        { eventoId: 1, estado: 'confirmada' },
        { eventoId: 1, estado: 'confirmada' },
        { eventoId: 2, estado: 'confirmada' },
        { eventoId: 2, estado: 'confirmada' }
    ]);
    assert.deepEqual(ranking.map(evento => evento.id), [2, 1]);
    assert.equal(ranking[0].porcentajeAforo, 50);
});

test('Generador crea codigos de inscripcion incrementales con padding', () => {
    const generar = creadorGeneradorCodigo();
    assert.equal(generar(), 'INS-0001');
    assert.equal(generar(), 'INS-0002');
});
