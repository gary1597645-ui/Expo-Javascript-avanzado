<script setup>
import CeldaHorario from './CeldaHorario.vue';

defineProps({
  horas: { type: Array, required: true },
  filas: { type: Array, required: true },
});

const emit = defineEmits(['ver-detalle']);
</script>

<template>
  <div v-if="filas.length === 0" class="alert alert-warning">
    No hay eventos disponibles para el lugar seleccionado.
  </div>

  <div v-else class="table-responsive shadow-sm">
    <table class="table table-bordered align-middle mb-0">
      <thead class="table-dark">
        <tr>
          <th style="min-width: 210px;">Evento / Lugar</th>
          <th v-for="hora in horas" :key="hora" class="text-center">
            {{ hora }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="fila in filas" :key="fila.evento.id">
          <td>
            <div class="fw-bold">{{ fila.evento.nombre }}</div>
            <small class="text-muted">
              {{ fila.evento.lugar }} · {{ fila.evento.fecha }}
              <span v-if="fila.evento.horaInicio && fila.evento.horaFin">
                · {{ fila.evento.horaInicio }}–{{ fila.evento.horaFin }}
              </span>
              <span v-else>· Todo el día</span>
            </small>
          </td>
          <CeldaHorario
            v-for="celda in fila.celdas"
            :key="celda.hora"
            :celda="celda"
            @seleccionar="(c) => emit('ver-detalle', c)"
          />
        </tr>
      </tbody>
    </table>
  </div>
</template>