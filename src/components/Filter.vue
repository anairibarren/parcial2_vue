<template>
  <select @change="onFilter($event.target.value)">
    <option disabled selected>Filtrar por género</option>
    <option value="">Todos</option>
    <option value="35">Comedia</option>
    <option value="18">Drama</option>
    <option value="28">Acción</option>
  </select>
</template>

<script setup>
const emit = defineEmits(['filter'])
const onFilter = (genreId) => emit('filter', genreId)
</script>
