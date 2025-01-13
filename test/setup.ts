import { config } from "@vue/test-utils";
import { createI18n } from "vue-i18n";
import "@testing-library/jest-dom";
import br from "@/locales/br.json";
import en from "@/locales/en.json";

const i18n = createI18n({
  locale: "br",
  legacy: false,
  globalInjection: true,
  messages: {
    br,
    en,
  },
});

config.global.plugins = [i18n];
