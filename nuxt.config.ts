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
    pageTransition: { name: 'page', mode: 'out-in' },
    /*head: {
      script: [
        {
          id: "fairlytics-id-ajcu6jd9k7ysd6",
          "data-fairlyticskey": "0927c3595bb8bc74dcb892103c7f3db3",
          src: "https://app.fairlytics.tech/tag/tag.js",
        }
      ],
    } */
  },
  nitro: {
    prerender: {
      routes: ['/', '/projets', '/projets/:id'],
      ignore: ['/WaitingScreenView', '/ProjectsListView', "/ProjectSingleView"]
    }
  },
  runtimeConfig: {
    public: {
      spotifyClientId: process.env.SPOTIFY_CLIENT_ID,
      spotifyClientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      spotifyRefreshToken: process.env.SPOTIFY_REFRESH_TOKEN,
    },
  },
})
