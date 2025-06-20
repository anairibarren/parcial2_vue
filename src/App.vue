<template>
   <div class="app-container">
    <header>
      <div class="logo-title">
        <img alt="Logo peliculas" class="logo" src="./assets/img/movies.png" />
      </div>
      <nav>
        <RouterLink to="/">Inicio</RouterLink>
        <RouterLink to="/favoritos">Favoritos</RouterLink>
      </nav>
    </header>


    <main>
      <router-view />
    </main>

    <footer>
      <p>Copyright © - Jazmin Carrion & Ana Delfina Iribarren - Aplicaciones para Dispositivos Móviles</p>
    </footer>
  </div>
</template>