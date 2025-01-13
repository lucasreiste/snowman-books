<template>
  <header class="sticky top-0 bg-black shadow-lg border-b z-50 border-gray-800">
    <div class="container mx-auto flex items-center justify-between px-4 py-3">
      <!-- Logo -->
      <NuxtLink to="/" class="flex-shrink-0">
        <img
          :src="logoSnow"
          alt="Snowman Books Logo"
          class="h-24 w-auto rounded-lg transition-transform duration-200 hover:scale-105"
        />
      </NuxtLink>

      <!-- Desktop -->
      <nav class="hidden md:flex items-center space-x-6">
        <NuxtLink
          v-for="item in menuItems"
          :key="item.path"
          :to="localePath(item.path)"
          class="text-gray-300 hover:text-blue-400 transition-colors duration-200 font-medium"
        >
          {{ item.label }}
        </NuxtLink>
        <LanguageSwitcher />
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
          <NuxtLink
            v-for="item in menuItems"
            :key="item.path"
            :to="localePath(item.path)"
            class="text-gray-300 hover:text-blue-400 transition-colors duration-200 font-medium"
          >
            {{ item.label }}
          </NuxtLink>
          <div class="pt-2">
            <LanguageSwitcher />
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
import logoSnow from "@/assets/logosnowof.png";
const { t } = useI18n();
const localePath = useLocalePath();

const isMobileMenuOpen = ref(false);

const menuItems = computed(() => [
  { label: t("books.title"), path: "/" },
  { label: t("myBooks.title"), path: "/my-books" },
]);
</script>
