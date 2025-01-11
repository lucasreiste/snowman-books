<template>
  <header class="sticky top-0 bg-black shadow-lg border-b border-gray-800">
    <div class="container mx-auto flex items-center justify-between px-4 py-3">
      <!-- Logo -->
      <a href="/" class="flex-shrink-0">
        <img
          :src="logoSnow"
          alt="Snowman Books Logo"
          class="h-24 w-auto rounded-lg transition-transform duration-200 hover:scale-105"
        />
      </a>

      <!-- Desktop -->
      <nav class="hidden md:flex items-center space-x-6">
        <a
          v-for="item in menuItems"
          :key="item.path"
          :href="item.path"
          class="text-gray-300 hover:text-blue-400 transition-colors duration-200 font-medium"
        >
          {{ item.label }}
        </a>
        <a
          href="/catalogo"
          class="text-blue-400 border border-blue-500 px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition-colors duration-200 font-medium"
        >
          Catálogo
        </a>
        <div v-if="isLoggedIn" class="text-gray-300">Minha Conta</div>
        <div v-else class="flex items-center space-x-4">
          <a href="/login" class="text-gray-300 hover:text-blue-400">Login</a>
          <a
            href="/cadastrar"
            class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
          >
            Cadastrar
          </a>
        </div>
      </nav>

      <!-- Mobile Menu Button -->
      <button
        class="md:hidden text-gray-300"
        @click="isMobileMenuOpen = !isMobileMenuOpen"
      >
        <LucideMenu v-if="!isMobileMenuOpen" class="h-6 w-6" />
        <LucideX v-else class="h-6 w-6" />
      </button>
    </div>

    <!-- Mobile Menu -->
    <div
      v-show="isMobileMenuOpen"
      class="md:hidden bg-black border-t border-gray-800"
    >
      <div class="container mx-auto px-4 py-4 space-y-4">
        <nav class="flex flex-col space-y-4">
          <a
            v-for="item in menuItems"
            :key="item.path"
            :href="item.path"
            class="text-gray-300 hover:text-blue-400 transition-colors duration-200 font-medium"
          >
            {{ item.label }}
          </a>
          <a
            href="/catalogo"
            class="text-blue-400 border border-blue-500 px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition-colors duration-200 font-medium"
          >
            Catálogo
          </a>
        </nav>
        <div class="flex flex-col space-y-3">
          <a
            href="/login"
            class="text-gray-300 border border-blue-500 px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white text-center transition-colors duration-200"
          >
            Login
          </a>
          <a
            href="/cadastrar"
            class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center transition-colors duration-200"
          >
            Cadastrar
          </a>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue";
import logoSnow from "@/assets/logosnowof.png";

const isMobileMenuOpen = ref(false);
const isLoggedIn = ref(false);

const menuItems = [
  { label: "Início", path: "/" },
  { label: "Meus Livros", path: "/my-books" },
];
</script>
