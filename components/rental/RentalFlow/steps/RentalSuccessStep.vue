<template>
  <div class="text-center">
    <LucideCheck class="mx-auto h-12 w-12 text-green-500" />
    <h3 class="mt-4 text-lg font-medium text-gray-900">
      {{ t("rental.success.title") }}
    </h3>
    <p class="mt-2 text-sm text-gray-600">
      {{ t("rental.success.message") }}
    </p>
    <div class="mt-4">
      <img
        v-if="rentalStore.selectedBook?.coverImage"
        :src="rentalStore.selectedBook.coverImage"
        :alt="rentalStore.selectedBook.title"
        class="w-24 h-36 object-cover mx-auto mb-2"
      />
      <p
        v-if="rentalStore.selectedBook?.title"
        class="text-lg font-semibold text-gray-800"
      >
        {{ rentalStore.selectedBook.title }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRentalStore } from "@/stores/useRentalStore";

const rentalStore = useRentalStore();
const { t } = useI18n();
</script>
