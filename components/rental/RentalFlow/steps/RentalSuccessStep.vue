<template>
  <div class="text-center">
    <LucideCheck class="mx-auto h-12 w-12 text-green-500" />
    <h3
      data-testid="success-title"
      class="mt-4 text-lg font-medium text-gray-900"
    >
      {{ t("rental.success.title") }}
    </h3>
    <p data-testid="success-message" class="mt-2 text-sm text-gray-600">
      {{ t("rental.success.message") }}
    </p>
    <div class="mt-4">
      <img
        v-if="rentalStore.selectedBook?.coverImage"
        :src="rentalStore.selectedBook.coverImage"
        :alt="rentalStore.selectedBook.title"
        data-testid="book-cover"
        class="w-24 h-36 object-cover mx-auto mb-2"
      />
      <p
        v-if="rentalStore.selectedBook?.title"
        data-testid="book-title"
        class="text-lg font-semibold text-gray-800"
      >
        {{ rentalStore.selectedBook.title }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRentalStore } from "@/stores/useRentalStore";
import { useI18n } from "vue-i18n";

const rentalStore = useRentalStore();
const { t } = useI18n();
</script>
