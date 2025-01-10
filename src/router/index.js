import { createRouter, createWebHashHistory } from 'vue-router';
import DashBoardView from '../views/DashBoardView.vue';
import LoginPage from '../views/LoginPage.vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: LoginPage,
    },
    {
      path: '/',
      name: 'Dash',
      component: DashBoardView,
      meta: { requiresAuth: true }, // Proteção de rota
    },
  ],
});

// Verificação de autenticação antes de cada navegação
router.beforeEach((to, from, next) => {
  const auth = getAuth();
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth) {
    onAuthStateChanged(auth, user => {
      if (user) {
        next(); // Usuário autenticado, permite navegação
      } else {
        next('/login'); // Redireciona para o login se não autenticado
      }
    });
  } else {
    next(); // Navegação permitida para rotas públicas
  }
});

export default router;
