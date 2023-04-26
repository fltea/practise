import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  // 映射关系： path => component
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/login',
      component: () => import('@/pages/login.vue'),
    },
    {
      path: '/home',
      component: () => import('@/pages/home.vue'),
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('@/pages/404.vue'),
    },
  ],
})

export default router
