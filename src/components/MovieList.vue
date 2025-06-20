<template>
  <div class="movie-list">
    <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
  </div>
</template>

<script>
import MovieCard from './MovieCard.vue'
export default {
  props: ['movies'],
  components: { MovieCard }
}
</script>