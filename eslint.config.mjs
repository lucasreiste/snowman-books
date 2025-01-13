// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt({
  rules: {
    "vue/html-self-closing": [
      "off",
      {
        html: {
          void: "always",
          normal: "always",
          component: "always",
        },
      },
    ],
  },
});
