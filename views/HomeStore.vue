<template>
  <div>
    <Header />

    <div class="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-3xl font-bold mb-8 text-center">Resultados da Busca</h2>

        <div v-if="isLoading" class="text-center">
          <p class="text-xl text-gray-600">Carregando livros...</p>
        </div>

        <div v-else-if="error" class="text-center text-red-500">
          <p class="text-xl">Erro ao carregar livros: {{ error }}</p>
        </div>

        <div v-else>
          <BookList :books="paginatedBooks" />

          <Pagination
            :total-items="books.length"
            :items-per-page="itemsPerPage"
            :current-page="currentPage"
            @page-change="handlePageChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Pagination from "@/components/Pagination/Pagination.vue";
import BookList from "@/components/Books/BookList/BookList.vue";
import type { Book } from "@/types/book";
import { fetchBooks } from "@/services/bookService";

const books = ref<Book[]>([]);
const currentPage = ref<number>(1);
const itemsPerPage = ref<number>(10);
const isLoading = ref<boolean>(false);
const error = ref<string | null>(null);

const loadBooks = async () => {
  isLoading.value = true;
  const result = await fetchBooks();

  if (result.error) {
    error.value = result.error;
  } else if (result.books) {
    books.value = result.books;
  }

  isLoading.value = false;
};

const paginatedBooks = computed<Book[]>(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return books.value.slice(start, end);
});

const handlePageChange = (page: number) => {
  currentPage.value = page;
};

onMounted(loadBooks);
</script>
