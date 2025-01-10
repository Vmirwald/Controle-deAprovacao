<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { ref, onMounted } from 'vue';

const auth = getAuth();
const isAuthenticated = ref(false); // Estado de autenticação

// Verificar se o usuário está autenticado
onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    isAuthenticated.value = !!user; // Atualiza o estado com base no usuário logado
  });
});

// Método para deslogar
function handleLogout() {
  signOut(auth)
    .then(() => {
      alert('Você saiu com sucesso!');
      window.location.href = '/login'; // Redireciona para a tela de login
    })
    .catch((error) => {
      console.error('Erro ao sair:', error.message);
    });
}
</script>

<template>
  <div id="app">
    <header class="app-header">
      <nav class="app-nav">
        <RouterLink to="/" class="nav-link">Dashboard</RouterLink>
        <!-- Exibir o botão "Sair" somente quando autenticado -->
        <button
          v-if="isAuthenticated"
          class="logout-button"
          @click="handleLogout"
        >
          Sair
        </button>
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
  display: flex;
  justify-content: space-between; /* Espaço entre links e botão */
  align-items: center;
}

/* Navigation links */
.app-nav {
  display: flex;
  align-items: center;
  width: 100%;
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

/* Botão de Logout */
.logout-button {
  margin-left: auto; /* Empurra o botão para o lado direito */
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: #ffffff;
  background-color: var(--color-danger, #dc3545);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.logout-button:hover {
  background-color: var(--color-danger-dark, #c82333);
}
</style>
