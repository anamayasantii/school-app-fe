// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: ["~/styles/tailwind.css"],
  modules: ['@pinia/nuxt', "@nuxtjs/google-fonts"],
  googleFonts: {
    families: {
      Manrope: [300, 400, 500, 600, 700],
    },
    display: 'swap',
    prefetch: true,
    preconnect: true,
    preload: true,
  },
   build: {
    transpile: ["pinia"],
  },
  devServer: {
    port: 3890,
  },
  pinia: {
    storesDirs: ["~/store/"],
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})