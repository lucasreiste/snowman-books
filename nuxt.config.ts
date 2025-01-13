// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from "url";
import path from "path";

export default defineNuxtConfig({
  components: {
    dirs: [
      {
        path: "~/components",
        pathPrefix: false,
      },
    ],
  },
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: [
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
    "@nuxt/eslint",
    "shadcn-nuxt",
    "@nuxtjs/color-mode",
    "nuxt-lucide-icons",
    "@nuxtjs/i18n",
    "@nuxt/test-utils/module",
  ],
  shadcn: {
    prefix: "",
    componentDir: "./components/ui",
  },
  i18n: {
    locales: [
      { code: "en", language: "en-US" },
      { code: "br", language: "pt-BR" },
    ],
    defaultLocale: "br",
    strategy: "prefix_except_default",
    detectBrowserLanguage: false,
    vueI18n: "./i18n.config.ts",
  },
  vite: {
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./", import.meta.url)),
        "~": fileURLToPath(new URL("./", import.meta.url)),
        "@components": path.resolve(__dirname, "./components"),
        "@test": path.resolve(__dirname, "./test"),
        "@stores": path.resolve(__dirname, "./stores"),
        "@composables": path.resolve(__dirname, "./composables"),
        "@types": path.resolve(__dirname, "./types"),
      },
    },
  },
  app: {
    head: {
      title: "Snowman Books",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "description", content: "Sua biblioteca digital" },
        { name: "theme-color", content: "#000000" },
      ],
      link: [
        { rel: "icon", type: "image/png", href: "/logo-snow.png" },
        { rel: "apple-touch-icon", href: "/logo-snow.png" },
      ],
    },
  },
});
