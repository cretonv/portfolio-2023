// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/prismic'
  ],
  prismic: { endpoint: 'https://vincent-creton.cdn.prismic.io/api/v2', modern: true, preview: false },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  nitro: {
    prerender: {
      routes: ['/', '/projets'],
      ignore: ['/WaitingScreenView', '/ProjectsListView']
    }
  }
})
