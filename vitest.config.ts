import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath } from "url";
import path from "path";

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./test/setup.ts"],
    alias: {
      "@": fileURLToPath(new URL("./", import.meta.url)),
      "~": fileURLToPath(new URL("./", import.meta.url)),
      "@test": path.resolve(__dirname, "./test"),
      "@components": path.resolve(__dirname, "./components"),
      "@stores": path.resolve(__dirname, "./stores"),
      "@composables": path.resolve(__dirname, "./composables"),
      "@types": path.resolve(__dirname, "./types"),
      "assets/": fileURLToPath(new URL("./assets/", import.meta.url)),
      assets: fileURLToPath(new URL("./assets/", import.meta.url)),
    },
  },
});
