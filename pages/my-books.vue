<template>
  <div class="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <h2 class="text-3xl font-bold mb-8 text-center">
        {{ $t("myBooks.title") }}
      </h2>

      <div v-if="isLoading" class="text-center">
        <div class="flex justify-center">
          <LucideLoader />
        </div>
      </div>

      <div
        v-else-if="rentalStore.activeRentals.length === 0"
        class="text-center"
      >
        <p class="text-xl text-gray-600">{{ $t("myBooks.noRentals") }}</p>
      </div>

      <div v-else>
        <RentedBookList
          :key="renderKey"
          :rented-books="rentalStore.activeRentals"
          @cancel-rental="removeRental"
          @renew-rental="renewRental"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRentalStore } from "@/stores/useRentalStore";

const rentalStore = useRentalStore();
const isLoading = ref(true);
const renderKey = ref(0);

onMounted(async () => {
  try {
    await rentalStore.initializeFromLocalStorage();
  } finally {
    isLoading.value = false;
  }
});

const removeRental = async (bookId: string) => {
  await rentalStore.removeRental(bookId);
  renderKey.value++;
  alert("Aluguel cancelado com sucesso.");
};

const renewRental = async (bookId: string) => {
  await rentalStore.renewRental(bookId);
  renderKey.value++;
  alert("Aluguel renovado com sucesso.");
};
</script>
