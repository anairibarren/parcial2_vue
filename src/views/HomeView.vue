<template>
  <div>
    <div class="banner-container">
      <div class="banner-overlay">
        <h1 class="banner-title">Cineverse</h1>
        <div class="search-filter-container">
          <SearchBar @search="searchMovies" />
          <Filter @filter="filterByGenre" />
        </div>
      </div>
    </div>

    <MovieList
      v-if="movies.length"
      :movies="movies"
      @show-detail="openDetail"
      @add-favorite="addToFavorites"
    />
    <p v-else>No hay películas para mostrar.</p>

    <MovieDetail
      v-if="selectedMovie"
      :movie="selectedMovie"
      @close="selectedMovie = null"
      @add-favorite="handleFavoriteNotification"
    />




    <Notification
      v-if="notification.message"
      :message="notification.message"
      :type="notification.type"
      @close="notification.message = ''"
    />

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import MovieList from '../components/MovieList.vue'
import SearchBar from '../components/SearchBar.vue'
import Filter from '../components/Filter.vue'
import MovieDetail from '../views/MovieDetail.vue'
import Notification from '../components/Notification.vue'


const movies = ref([])
const selectedMovie = ref(null)
const apiKey = process.env.VUE_APP_TMDB_API_KEY


const notification = ref({ message: '', type: 'success' })

const handleFavoriteNotification = (payload) => {
  notification.value = {
    message: payload.message,
    type: payload.type
  }
}


const fetchPopular = async () => {
  const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=9c9d0afa2300c644bc0efbf0f1e3701a&language=es-ES`)
  const data = await res.json()
  movies.value = data.results
}

const searchMovies = async (query) => {
  if (!query) {
    fetchPopular()
    return
  }
  const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=9c9d0afa2300c644bc0efbf0f1e3701a&language=es-ES&query=${query}`)
  const data = await res.json()
  movies.value = data.results
}

const filterByGenre = async (genreId) => {
  let url = `https://api.themoviedb.org/3/discover/movie?api_key=9c9d0afa2300c644bc0efbf0f1e3701a&language=es-ES`
  if (genreId) {
    url += `&with_genres=${genreId}`
  }
  const res = await fetch(url)
  const data = await res.json()
  movies.value = data.results
}

const openDetail = (movie) => {
  selectedMovie.value = movie
}

const addToFavorites = (movie) => {
  const stored = JSON.parse(localStorage.getItem('favorites')) || []
  if (!stored.find(m => m.id === movie.id)) {
    stored.push(movie)
    localStorage.setItem('favorites', JSON.stringify(stored))
    notification.value = {
      message: 'Película agregada a favoritos',
      type: 'success'
    }
  } else {
    notification.value = {
      message: 'Ya está en favoritos',
      type: 'error'
    }
  }
}

onMounted(fetchPopular)
</script>
