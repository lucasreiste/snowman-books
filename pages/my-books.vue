<template>
  <div>
    <div class="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-3xl font-bold mb-8 text-center">
          {{ $t("myBooks.title") }}
        </h2>

        <div v-if="activeRentals.length === 0" class="text-center">
          <p class="text-xl text-gray-600">{{ $t("myBooks.noRentals") }}</p>
        </div>

        <div v-else>
          <RentedBookList :rented-books="activeRentals" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { RentalData } from "@/types/rental";

const activeRentals = ref<RentalData[]>([]);

onMounted(() => {
  const storedRentals = localStorage.getItem("activeRentals");
  if (storedRentals) {
    activeRentals.value = JSON.parse(storedRentals);
  }
});
</script>
