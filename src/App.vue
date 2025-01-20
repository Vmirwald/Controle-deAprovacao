<script setup>
import { RouterLink, RouterView } from 'vue-router';

</script>

<template>
  <div id="app">
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
</style>
