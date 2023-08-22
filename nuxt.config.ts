// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    "~/assets/main.css",
    "~/assets/lenis.css",
    "~/public/fonts/fonts.css"
  ],
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/prismic'
  ],
  prismic: { endpoint: 'https://vincent-creton.cdn.prismic.io/api/v2', modern: true, preview: false, toolbar: false },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  nitro: {
    prerender: {
      routes: ['/', '/projets'],
      ignore: ['/WaitingScreenView', '/ProjectsListView']
    }
  },
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/public/svg/favicon.svg' }
  ]
})
