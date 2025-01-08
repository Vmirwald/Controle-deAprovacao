<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <div id="app">
    <header class="app-header">
      <nav class="app-nav">
        <RouterLink to="/" class="nav-link">Dashboard</RouterLink>
      </nav>
    </header>
    <main class="app-main">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
/* #app ocupa toda a altura da viewport */
#app {
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* Header responsivo */
.app-header {
  background-color: #f8f9fa;
  padding: 1rem;
  border-bottom: 1px solid #dee2e6;
  text-align: center;
}

/* Navigation links */
.app-nav {
  display: flex;
  justify-content: center;
}

.nav-link {
  color: var(--color-text, #007bff);
  text-decoration: none;
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  border-radius: 5px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.nav-link.router-link-exact-active {
  font-weight: bold;
  background-color: var(--color-primary, #e9ecef);
  color: var(--color-primary-dark, #0056b3);
}

.nav-link:hover {
  background-color: var(--color-primary-light, #f1f3f5);
}


</style>
