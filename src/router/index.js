import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MovieDetails from '../views/MovieDetail.vue'
import FavoritesView from '../views/FavoritesView.vue'
import '../assets/style.css'


const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/movie/:id', name: 'MovieDetail', component: MovieDetails, props: true },
  { path: '/favoritos', name: 'Favoritos', component: FavoritesView }
]


const router = createRouter({
  history: createWebHistory(),
  routes
})



export default router
