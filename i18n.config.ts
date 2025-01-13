import en from "./locales/en.json";
import br from "./locales/br.json";

export default defineI18nConfig(() => ({
  legacy: false,
  locale: "br",
  messages: {
    br: br,
    en: en,
  },
}));
