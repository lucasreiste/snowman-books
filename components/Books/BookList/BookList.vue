<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <div v-if="books.length === 0" class="text-center py-12">
      <LucideBookOpen class="h-16 w-16 text-gray-400 mx-auto mb-4" />
      <p class="text-xl text-gray-600">Nenhum livro encontrado</p>
    </div>

    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <div
        v-for="book in books"
        :key="book.id"
        class="flex flex-col shadow-lg rounded-lg overflow-hidden transition hover:shadow-2xl bg-white"
      >
        <div class="relative bg-gray-100 aspect-[2/3]">
          <img
            :src="book.coverImage"
            :alt="book.title"
            class="w-full h-full object-cover object-center"
          />
          <span
            v-if="book.price === 0"
            class="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full"
          >
            Gratuito
          </span>
        </div>

        <div class="p-4 flex flex-col flex-grow">
          <div>
            <h3 class="font-semibold text-lg leading-tight line-clamp-2">
              {{ book.title }}
            </h3>
            <p v-if="book.subtitle" class="text-sm text-gray-600 mt-1">
              {{ book.subtitle }}
            </p>
            <p class="text-sm text-gray-500 flex items-center mt-2">
              <LucideUser class="inline-block w-4 h-4 mr-1 text-gray-400" />
              {{ book.author }}
            </p>
          </div>

          <div class="text-sm text-gray-500">
            <p>
              <LucideLayers class="inline-block w-4 h-4 mr-1 text-gray-400" />
              {{ book.categories || "N/A" }}
            </p>
            <p>
              <LucideBook class="inline-block w-4 h-4 mr-1 text-gray-400" />
              Páginas: {{ book.pageCount || "N/A" }}
            </p>
            <p>
              <LucideGlobe class="inline-block w-4 h-4 mr-1 text-gray-400" />
              Idioma: {{ book.language.toUpperCase() || "N/A" }}
            </p>
            <p class="mt-2 text-gray-700 text-sm line-clamp-3">
              {{ book.description }}
            </p>
          </div>
        </div>

        <div class="p-4 border-t flex justify-between items-center">
          <span class="font-semibold text-primary">
            {{ book.price > 0 ? `R$ ${book.price.toFixed(2)}` : "Gratuito" }}
          </span>
          <button
            v-if="book.buyLink"
            class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm font-medium transition"
            @click="emitRentBook(book)"
          >
            Alugar Livro
          </button>
          <button
            v-else
            class="px-4 py-2 bg-gray-300 text-gray-600 rounded-md cursor-not-allowed text-sm font-medium"
            disabled
          >
            Indisponível
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Book } from "@/types/book";

interface Props {
  books: Book[];
}

const props = defineProps<Props>();

const emits = defineEmits<{
  (e: "rent-book", book: Book): void;
}>();

const emitRentBook = (book: Book) => {
  emits("rent-book", book);
};
</script>
