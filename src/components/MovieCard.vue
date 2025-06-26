<template>
  <div class="movie-card" :class="{ 'favorite-style': showOnlyFavorite }">
    <img :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" :alt="movie.title" />

    <div v-if="!showOnlyFavorite">
      <h3>{{ movie.title }}</h3>
      <div class="buttons">
        <router-link :to="`/movie/${movie.id}`">
          <button class="details">Detalle</button>
        </router-link>
        <button class="favorites" @click="addToFavorites">Favoritos</button>
      </div>
    </div>

    <div v-else class="favorite-content">
      <h3>{{ movie.title }}</h3>
      <button class="remove" @click="$emit('remove-favorite', movie)">Eliminar de favoritos</button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  movie: Object,
  showOnlyFavorite: { type: Boolean, default: false }
})

const emit = defineEmits(['add-favorite'])

const addToFavorites = () => {
  emit('add-favorite', props.movie)
}
</script>