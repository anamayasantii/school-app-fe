// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: ["~/styles/tailwind.css"],
  modules: [
    '@pinia/nuxt',
  ],
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
