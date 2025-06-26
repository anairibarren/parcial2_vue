<template>
  <div>
    <h1>Favoritos</h1>
    <div v-if="favorites.length === 0" class="empty-favorites">
      <h2>¡Ups! No hay películas agregadas.</h2>
      <p>Por favor, vuelve al inicio para agregar tus películas favoritas.</p>
      <router-link to="/" class="btn-back">
        ← Volver al inicio
      </router-link>
    </div>

    <div v-else class="favorites-container">
      <MovieCard
        v-for="movie in favorites"
        :key="movie.id"
        :movie="movie"
        :showOnlyFavorite="true"
        @remove-favorite="removeFromFavorites"
      />
    </div>
  </div>

  <Notification
  v-if="notification.message"
  :message="notification.message"
  :type="notification.type"
  />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import MovieCard from '../components/MovieCard.vue'
import Notification from '../components/Notification.vue'
const notification = ref({ message: '', type: 'success' })

const favorites = ref([])

const loadFavorites = () => {
  favorites.value = JSON.parse(localStorage.getItem('favorites') || '[]')
}

const removeFromFavorites = (movieToRemove) => {
  const currentCount = favorites.value.length

  favorites.value = favorites.value.filter(m => m.id !== movieToRemove.id)
  localStorage.setItem('favorites', JSON.stringify(favorites.value))

  if (currentCount > 1) {
    notification.value = {
      message: 'Película eliminada con éxito',
      type: 'success'
    }
  }
}


onMounted(loadFavorites)
</script>