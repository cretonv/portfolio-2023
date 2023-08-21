import type { RouterConfig } from '@nuxt/schema'

// https://router.vuejs.org/api/interfaces/routeroptions.html
export default <RouterConfig> {
  routes: (_routes) => [
    {
      name: 'home',
      path: '/',
      component: () => import('~/pages/HomeView.vue')
    },
    {
      name: 'projects-list',
      path: '/projets',
      component: () => import('~/pages/ProjectsListView.vue')
    }
  ],
}
