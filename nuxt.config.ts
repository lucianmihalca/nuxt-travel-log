import "dotenv/config";
import tailwindcss from "@tailwindcss/vite";

import "./lib/env";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    "@nuxt/eslint",
    "@nuxt/icon",
    "@nuxtjs/color-mode",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@nuxtjs/i18n",
    "@vee-validate/nuxt",
    "nuxt-csurf",
  ],
  i18n: {
    defaultLocale: "en",
    langDir: "locales/",
    locales: [
      { code: "en", iso: "en-GB", name: "English", file: "en.json" },
      { code: "es", iso: "es-ES", name: "Español", file: "es.json" },
    ],
    strategy: "prefix_except_default",
  },
  css: ["./app/assets/css/main.css"],
  eslint: {
    config: {
      standalone: false,
    },
  },
  vite: {
    plugins: [
      tailwindcss() as any,
    ],

  },
  colorMode: {
    dataValue: "theme",
    classSuffix: "",
  },
});
