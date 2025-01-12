<template>
  <img
    :src="book.coverImage"
    :alt="book.title"
    class="w-full h-auto rounded-lg shadow-md"
  />
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
const props = defineProps<{
  book: {
    coverImage: string;
    title: string;
  };
}>();
</script>
