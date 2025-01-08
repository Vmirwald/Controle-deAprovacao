import { createRouter, createWebHashHistory } from 'vue-router'
import DashBoardView from '../views/DashBoardView.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'Dash',
      component: DashBoardView,
    },
  ],
})

export default router
