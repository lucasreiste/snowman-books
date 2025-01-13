// https://nuxt.com/docs/api/configuration/nuxt-config
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
  ],
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
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
});
