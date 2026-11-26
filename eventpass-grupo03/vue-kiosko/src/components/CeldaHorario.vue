<script setup>
const props = defineProps({
  celda: { type: Object, required: true },
});

const emit = defineEmits(['seleccionar']);

const claseEstado = (estado) => ({
  'bg-success text-white': estado === 'libre',
  'bg-warning text-dark': estado === 'pendiente',
  'bg-danger text-white': estado === 'ocupada',
});
</script>

<template>
  <td
    class="text-center align-middle"
    style="cursor: pointer; min-width: 72px;"
    :class="claseEstado(celda.estado)"
    @click="emit('seleccionar', celda)"
  >
    <small class="fw-bold text-uppercase">{{ celda.estado }}</small>
  </td>
</template>