<template>
  <div class="flex flex-col md:flex-row">
    <div class="md:w-1/3 flex-shrink-0 mb-4 md:mb-0">
      <BookInfo :book="book" />
    </div>
    <div class="md:w-2/3 md:pl-6">
      <DialogHeader>
        <DialogTitle class="text-2xl font-bold">Alugar Livro</DialogTitle>
        <DialogDescription class="mt-2 text-gray-600">
          Tem certeza de que deseja alugar o livro
          <strong>{{ book.title }}</strong
          >?
        </DialogDescription>
      </DialogHeader>

      <div class="relative">
        <p
          v-if="!isDescriptionExpanded"
          class="text-gray-700 mb-2 line-clamp-3"
        >
          {{ book.description }}
        </p>
        <p v-else class="text-gray-700 mb-2">
          {{ book.description }}
        </p>
        <div v-if="hasLongDescription" class="text-center">
          <button
            class="text-blue-500 text-sm mt-1 focus:outline-none"
            @click="toggleDescription"
          >
            {{ isDescriptionExpanded ? "Mostrar menos" : "Mostrar mais" }}
          </button>
        </div>
      </div>

      <div class="flex items-center">
        <span class="text-xl font-semibold text-primary">
          {{ formattedPrice }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import BookInfo from "../BookInfo.vue";
import type { Book } from "@/stores/usePurchaseStore";

const props = defineProps<{
  book: Book;
}>();

const formattedPrice = computed(() =>
  props.book.price > 0 ? `R$ ${props.book.price.toFixed(2)}` : "Gratuito"
);

const isDescriptionExpanded = ref(false);

const MAX_DESCRIPTION_LENGTH = 150;
const hasLongDescription = computed(() => {
  return props.book.description.length > MAX_DESCRIPTION_LENGTH;
});

const toggleDescription = () => {
  isDescriptionExpanded.value = !isDescriptionExpanded.value;
};
</script>
