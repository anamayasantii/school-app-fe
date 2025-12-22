export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  css: ["~/styles/tailwind.css"],
  modules: ["@pinia/nuxt", "@nuxtjs/google-fonts"],
  googleFonts: {
    families: {
      Poppins: [300, 400, 500, 600, 700],
    },
    display: "swap",
    prefetch: true,
    preconnect: true,
    preload: true,
  },

  build: {
    transpile: ["pinia", "vue"],
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_BASE_URL || "",
      apiBaseUrlLocal: process.env.NUXT_PUBLIC_BASE_URL_LOCAL || "",
      appEnv: process.env.NUXT_APP_ENV || "production",
    },
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
});
