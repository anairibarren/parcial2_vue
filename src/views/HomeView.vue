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

    <MovieList v-if="movies.length" :movies="movies" @show-detail="openDetail" 
      @add-favorite="addToFavorites" />
    <p v-else>No hay películas para mostrar.</p>
    
    <MovieDetail v-if="selectedMovie" :movie="selectedMovie" @close="selectedMovie = null" />
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import MovieList from '../components/MovieList.vue'
import SearchBar from '../components/SearchBar.vue'
import Filter from '../components/Filter.vue'
import MovieDetail from '../views/MovieDetail.vue' 

const movies = ref([])
const selectedMovie = ref(null)

const apiKey = process.env.VUE_APP_TMDB_API_KEY

const fetchPopular = async () => {
  const apiKey = process.env.VUE_APP_TMDB_API_KEY
  const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=es-ES`)
  const data = await res.json()
  movies.value = data.results
}

const searchMovies = async (query) => {
  const apiKey = process.env.VUE_APP_TMDB_API_KEY
  if (!query) {
    fetchPopular()
    return
  }
  const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=es-ES&query=${query}`)
  const data = await res.json()
  movies.value = data.results
}

const filterByGenre = async (genreId) => {
  const apiKey = process.env.VUE_APP_TMDB_API_KEY
  let url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=es-ES`

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
    alert('Película agregada a favoritos!')
  }
}

onMounted(fetchPopular)
</script>
