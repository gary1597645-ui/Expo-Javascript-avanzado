<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import GrillaDisponibilidad from './components/GrillaDisponibilidad.vue';
import { construirGrillaDisponibilidad, obtenerLugaresUnicos } from './core/estadisticas.js';

const eventos = ref([]);
const inscripciones = ref([]);
const lugarSeleccionado = ref('');
const celdaActiva = ref(null);
const cargando = ref(true);
const error = ref('');
const ultimaActualizacion = ref('');
let intervalo = null;

const cargarDatos = async () => {
  try {
    error.value = '';
    const [resEv, resIns] = await Promise.all([
      fetch('http://localhost:3000/eventos'),
      fetch('http://localhost:3000/inscripciones'),
    ]);
    if (!resEv.ok || !resIns.ok) throw new Error('Error al consultar el API REST');

    eventos.value = await resEv.json();
    inscripciones.value = await resIns.json();
    ultimaActualizacion.value = new Date().toLocaleTimeString();
  } catch (err) {
    error.value = err.message;
  } finally {
    cargando.value = false;
  }
};

onMounted(() => {
  cargarDatos();
  intervalo = setInterval(cargarDatos, 30000);
});

onUnmounted(() => {
  if (intervalo) clearInterval(intervalo);
});

const lugares = computed(() => obtenerLugaresUnicos(eventos.value));

const eventosFiltrados = computed(() =>
  lugarSeleccionado.value
    ? eventos.value.filter((ev) => ev.lugar === lugarSeleccionado.value)
    : eventos.value
);

const grilla = computed(() =>
  construirGrillaDisponibilidad(eventosFiltrados.value, inscripciones.value, 7, 22)
);
</script>

<template>
  <div class="container-fluid py-4">
    <div class="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-2">
      <div>
        <h2 class="mb-0 text-dark">EventPass — Kiosko de Disponibilidad en Vivo</h2>
        <small class="text-muted">Actualización automática cada 30 s · Última: {{ ultimaActualizacion }}</small>
      </div>
      <div class="d-flex align-items-center gap-2">
        <label class="form-label mb-0 fw-semibold">Filtrar por lugar:</label>
        <select v-model="lugarSeleccionado" class="form-select" style="width: 240px;">
          <option value="">Todos los lugares</option>
          <option v-for="lugar in lugares" :key="lugar" :value="lugar">
            {{ lugar }}
          </option>
        </select>
      </div>
    </div>

    <div v-if="cargando" class="alert alert-info">Cargando disponibilidad del campus...</div>
    <div v-else-if="error" class="alert alert-danger">{{ error }}</div>

    <GrillaDisponibilidad
      v-else
      :horas="grilla.horas"
      :filas="grilla.filas"
      @ver-detalle="(celda) => (celdaActiva = celda)"
    />

    <!-- Panel de detalle al hacer @click en una celda -->
    <div v-if="celdaActiva" class="card border-primary mt-4 shadow-sm">
      <div class="card-body d-flex justify-content-between align-items-center">
        <div>
          <h5 class="card-title mb-1">
            {{ celdaActiva.eventoNombre }} — Franja {{ celdaActiva.hora }}
          </h5>
          <p class="mb-0">
            <strong>Lugar:</strong> {{ celdaActiva.lugar }} |
            <strong>Fecha:</strong> {{ celdaActiva.fecha }} |
            <strong>Aforo:</strong> {{ celdaActiva.inscritos }} / {{ celdaActiva.capacidadMax }} |
            <strong>Estado:</strong> <span class="text-uppercase fw-bold">{{ celdaActiva.estado }}</span>
          </p>
        </div>
        <button class="btn btn-outline-secondary btn-sm" @click="celdaActiva = null">
          Cerrar
        </button>
      </div>
    </div>
  </div>
</template>