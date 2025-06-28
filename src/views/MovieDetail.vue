<template>
  <div class="movie-detail">
    <img :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" :alt="movie.title" />

    <div class="movie-detail-content">
      <h2>{{ movie.title }}</h2>
      <p><strong>Año:</strong> {{ movie.release_date?.substring(0, 4) || 'Desconocido' }}</p>
      <p>{{ movie.overview }}</p>

      <div class="buttons">
        <button
          v-if="!isFavorite"
          @click="addToFavorites"
          class="btn-favorite"
        >
          ☆ Agregar a favoritos
        </button>
        <button v-else disabled class="btn-favorite-added">
          ★ Ya fue añadido
        </button>

        <router-link to="/">
          <button class="btn-back">← Volver al inicio</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const emit = defineEmits(['add-favorite'])
const route = useRoute()
const movie = ref({})
const isFavorite = ref(false)

onMounted(async () => {
  const id = route.params.id
  const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=9c9d0afa2300c644bc0efbf0f1e3701a&language=es`)
  movie.value = await response.json()

  const stored = JSON.parse(localStorage.getItem('favorites') || '[]')
  isFavorite.value = stored.some(m => m.id === movie.value.id)
})

const addToFavorites = () => {
  const stored = JSON.parse(localStorage.getItem('favorites') || '[]')

  if (!stored.find(m => m.id === movie.value.id)) {
    stored.push(movie.value)
    localStorage.setItem('favorites', JSON.stringify(stored))
    isFavorite.value = true
    emit('add-favorite', {
      message: 'Película agregada a favoritos',
      type: 'success'
    })
  } else {
    emit('add-favorite', {
      message: 'Ya está en favoritos',
      type: 'error'
    })
  }
}
</script>
