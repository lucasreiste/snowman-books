import { ref, computed, type Ref } from "vue";
import type { Book } from "@/types/book";
import { fetchBooks } from "@/services/bookService";

interface UseBooksReturn {
  books: Ref<Book[]>;
  paginatedBooks: Ref<Book[]>;
  currentPage: Ref<number>;
  itemsPerPage: Ref<number>;
  isLoading: Ref<boolean>;
  error: Ref<string | null>;
  searchQuery: Ref<string>;
  totalPages: Ref<number>;
  loadBooks: (term?: string) => Promise<void>;
  clearSearch: () => void;
  handlePageChange: (page: number) => void;
}

export function useBooks(initialItemsPerPage = 10): UseBooksReturn {
  const books = ref<Book[]>([]);
  const originalBooks = ref<Book[]>([]);
  const currentPage = ref(1);
  const itemsPerPage = ref(initialItemsPerPage);
  const isLoading = ref(true);
  const error = ref<string | null>(null);
  const searchQuery = ref("");

  const paginatedBooks = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    return books.value.slice(start, start + itemsPerPage.value);
  });

  const totalPages = computed(() =>
    Math.ceil(books.value.length / itemsPerPage.value)
  );

  async function loadBooks(term?: string): Promise<void> {
    isLoading.value = true;
    error.value = null;
    books.value = [];

    const newBooks = await fetchBooks(term, 20);
    books.value = newBooks;

    if (!term) {
      originalBooks.value = newBooks;
    }

    currentPage.value = 1;
    isLoading.value = false;
  }

  function clearSearch() {
    searchQuery.value = "";
    books.value = originalBooks.value;
    currentPage.value = 1;
  }

  function handlePageChange(page: number) {
    currentPage.value = page;
  }

  return {
    books,
    paginatedBooks,
    currentPage,
    itemsPerPage,
    isLoading,
    error,
    searchQuery,
    totalPages,
    loadBooks,
    clearSearch,
    handlePageChange,
  };
}
