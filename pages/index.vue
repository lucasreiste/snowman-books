<template>
  <div>
    <section class="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <SearchBook @search-book="handleSearch" @clear-search="clearSearch" />
        <h2 class="text-3xl font-bold mb-8 text-center">
          {{ searchQuery ? $t("books.searchResults") : $t("books.title") }}
        </h2>

        <template v-if="isLoading">
          <BookSkeleton />
        </template>

        <template v-else>
          <div v-if="error" class="text-center text-red-500">
            <p class="text-xl">{{ $t("books.loadError") }} {{ error }}</p>
          </div>
          <div v-else-if="books.length > 0">
            <BookList
              v-model:items-per-page="itemsPerPage"
              :books="paginatedBooks"
              :rented-book-ids="rentalStore.rentedBookIds"
              @rent-book="handleRentBook"
            />

            <Pagination
              :total-items="books.length"
              :items-per-page="itemsPerPage"
              :current-page="currentPage"
              @page-change="handlePageChange"
            />
          </div>

          <div v-else class="text-center text-gray-600">
            <p class="text-xl">{{ $t("books.notFound") }}</p>
          </div>
        </template>
      </div>
    </section>

    <RentalBookModal
      :open="isModalOpen"
      @confirm="handleConfirmRental"
      @close="closeModal"
    />
  </div>
</template>

<script lang="ts" setup>
import { useBooks } from "@/composables/useBooks";
import { useRentalStore } from "@/stores/useRentalStore";
import { useRental } from "@/composables/useRental";
import type { Book } from "@/types/book";

const {
  books,
  paginatedBooks,
  currentPage,
  itemsPerPage,
  isLoading,
  error,
  searchQuery,
  loadBooks,
  clearSearch,
  handlePageChange,
} = useBooks(10);

const rentalStore = useRentalStore();
const rental = useRental();
const isModalOpen = ref(false);

onMounted(() => {
  loadBooks();
  rentalStore.initializeFromLocalStorage();
});

const handleSearch = async (term: string) => {
  searchQuery.value = term;
  await loadBooks(term);
};

const handleRentBook = (book: Book) => {
  rentalStore.setSelectedBook(book);
  rentalStore.setRentalDetails(rental.initializeRental(book));
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const handleConfirmRental = () => {
  const selectedBook = rentalStore.selectedBook;
  const rentalDetails = rentalStore.rentalDetails;
  const personalData = rentalStore.personalData;

  if (selectedBook && rentalDetails && personalData) {
    rentalStore.addRental({
      book: selectedBook,
      personalData,
      rentalDetails: {
        duration: rentalDetails.duration,
        totalPrice: rentalDetails.totalPrice,
      },
    });
  }

  closeModal();
};
</script>
