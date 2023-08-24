// https://nuxt.com/docs/api/configuration/nuxt-config
console.log(process.env.SPOTIFY_CLIENT_ID)
console.log(process.env.SPOTIFY_CLIENT_SECRET)
console.log(process.env.SPOTIFY_REFRESH_TOKEN)

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
  runtimeConfig: {
    public: {
      spotifyClientId: process.env.SPOTIFY_CLIENT_ID,
      spotifyClientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      spotifyCode: process.env.SPOTIFY_CODE,
      spotifyAccessToken: process.env.SPOTIFY_ACCESS_TOKEN,
      spotifyRefreshToken: process.env.SPOTIFY_REFRESH_TOKEN,
    },
  },
})
