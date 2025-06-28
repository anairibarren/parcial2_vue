<template>
  <div class="movie-card">
    <img :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" :alt="movie.title" />

    <div>
      <h3>{{ movie.title }}</h3>
      <div class="buttons">
        <template v-if="showOnlyFavorite">
          <button class="favorites" @click="remove">Eliminar de favoritos</button>
        </template>
        <template v-else>
          <router-link :to="`/movie/${movie.id}`" class="full-button-link">
            <button class="details">Detalle</button>
          </router-link>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  movie: Object,
  showOnlyFavorite: { type: Boolean, default: false }
})

const emit = defineEmits(['remove-favorite'])

const remove = () => {
  emit('remove-favorite', props.movie)
}
</script>
