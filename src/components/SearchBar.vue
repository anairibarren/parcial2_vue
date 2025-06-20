<template>
  <div class="search-bar-container">
    <input
      v-model="query"
      @keyup.enter="emitSearch"
      placeholder="Buscar película..."
      type="search"
    />
    <button @click="emitSearch">Buscar</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const emit = defineEmits(['search'])
const query = ref('')
const emitSearch = () => emit('search', query.value)
</script>
