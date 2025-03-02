// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["@/assets/css/tailwind.css"],
  modules: ["@nuxt/ui", "@nuxtjs/tailwindcss"],
  tailwindcss: {
    exposeConfig: true,
    configPath: "tailwind.config.js",
  },
  runtimeConfig: {
    public: {
      apiBase: "https://eventful-moments-api.onrender.com/api/v1",
    },
  },
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
});
