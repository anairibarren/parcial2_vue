<template>
  <div>
    <h1>Favoritos</h1>

    <!-- Si no hay favoritos -->
    <div v-if="favorites.length === 0" class="empty-favorites">
      <h2>¡Ups! No hay películas agregadas.</h2>
      <p>Por favor, vuelve al inicio para agregar tus películas favoritas.</p>
      <router-link to="/" class="btn-back">
        ← Volver al inicio
      </router-link>
    </div>

    <!-- Si hay favoritos -->
    <div v-else class="favorites-container">
      <MovieCard
        v-for="movie in favorites"
        :key="movie.id"
        :movie="movie"
        :showOnlyFavorite="true"
        @remove-favorite="removeFromFavorites"
      />
    </div>

    <!-- Cartel flotante -->
    <Notification
      v-if="notification.message"
      :message="notification.message"
      :type="'black'"  
      @close="notification.message = ''"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import MovieCard from '../components/MovieCard.vue'
import Notification from '../components/Notification.vue'

const favorites = ref([])
const notification = ref({ message: '', type: 'black' })

const loadFavorites = () => {
  favorites.value = JSON.parse(localStorage.getItem('favorites') || '[]')
}

const removeFromFavorites = (movieToRemove) => {
  favorites.value = favorites.value.filter(m => m.id !== movieToRemove.id)
  localStorage.setItem('favorites', JSON.stringify(favorites.value))

  notification.value = {
    message: 'Película eliminada con éxito',
    type: 'black'
  }

  // Ocultar mensaje luego de 3 segundos
  setTimeout(() => {
    notification.value.message = ''
  }, 3000)
}

onMounted(loadFavorites)
</script>
