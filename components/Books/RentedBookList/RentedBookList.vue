<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <div v-if="books.length === 0" class="text-center py-12">
      <LucideBookOpen class="h-16 w-16 text-gray-400 mx-auto mb-4" />
      <p class="text-xl text-gray-600">Nenhum livro alugado no momento.</p>
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div
        v-for="(book, index) in books"
        :key="index"
        class="bg-white shadow-lg rounded-lg overflow-hidden"
      >
        <div class="flex">
          <div class="relative w-1/2 bg-gray-50">
            <img
              :src="book.coverImage"
              :alt="book.title"
              class="object-cover object-center w-full h-full"
            />
          </div>
          <div class="w-2/3 p-4 flex flex-col justify-between">
            <div>
              <h3 class="font-semibold text-xl leading-tight">
                {{ book.title }}
              </h3>
              <p v-if="book.subtitle" class="text-sm text-gray-600 mt-1">
                {{ book.subtitle }}
              </p>

              <div class="mt-3 text-sm text-gray-600 space-y-1">
                <p class="flex items-center">
                  <LucideUser class="inline-block w-4 h-4 mr-1 text-gray-400" />
                  {{ book.author }}
                </p>
                <p class="flex items-center">
                  <LucideLayers
                    class="inline-block w-4 h-4 mr-1 text-gray-400"
                  />
                  {{ book.categories || "N/A" }}
                </p>
                <p class="flex items-center">
                  <LucideBook class="inline-block w-4 h-4 mr-1 text-gray-400" />
                  Páginas: {{ book.pageCount || "N/A" }}
                </p>
                <p class="flex items-center">
                  <LucideGlobe
                    class="inline-block w-4 h-4 mr-1 text-gray-400"
                  />
                  Idioma: {{ book.language?.toUpperCase() || "N/A" }}
                </p>
              </div>

              <p class="mt-3 text-gray-700 text-sm line-clamp-3">
                {{ book.description }}
              </p>
            </div>

            <div class="mt-4">
              <div class="flex items-center text-sm text-gray-700">
                <LucideCreditCard class="w-4 h-4 mr-1 text-gray-400" />
                <span class="font-medium mr-1">Forma de pagamento:</span>
                <span>{{ book.paymentMethod || "Não informado" }}</span>
              </div>
              <div class="flex items-center text-sm text-gray-700 mt-1">
                <LucideCalendar class="w-4 h-4 mr-1 text-gray-400" />
                <span class="font-medium mr-1">Data de devolução:</span>
                <span>{{ book.returnDate || "Não informado" }}</span>
              </div>
            </div>

            <div class="mt-4 flex justify-between items-center">
              <span class="font-semibold text-primary">
                {{
                  book.price > 0 ? `R$ ${book.price.toFixed(2)}` : "Gratuito"
                }}
              </span>
              <button
                class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm font-medium transition"
                @click="emitSomeAction(book)"
              >
                Renovar Aluguel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";
import type { Book } from "@/types/book";

interface Props {
  books: Array<
    Book & {
      paymentMethod?: string;
      returnDate?: string;
    }
  >;
}

const props = defineProps<Props>();

const emits = defineEmits<{
  (e: "some-action", book: Book): void;
}>();

const emitSomeAction = (book: Book) => {
  emits("some-action", book);
};
</script>
