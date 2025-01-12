<template>
  <div class="text-center">
    <LucideCheck class="mx-auto h-12 w-12 text-green-500" />

    <h3 class="mt-4 text-lg font-medium text-gray-900">Aluguel Confirmado!</h3>
    <p class="mt-2 text-sm text-gray-600">
      Seu aluguel foi realizado com sucesso. Você receberá uma confirmação por
      email.
    </p>

    <div class="mt-4">
      <img
        v-if="book && book.coverImage"
        :src="book.coverImage"
        :alt="book.title"
        class="w-24 h-36 object-cover mx-auto mb-2"
      />
      <p v-if="book && book.title" class="text-lg font-semibold text-gray-800">
        {{ book.title }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { usePurchaseStore } from "@/stores/usePurchaseStore";

const purchaseStore = usePurchaseStore();

const book = computed(() => purchaseStore.book);
</script>
