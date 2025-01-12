<template>
  <img
    :src="book.coverImage"
    :alt="book.title"
    class="lg:w-full h-auto rounded-lg shadow-md"
  />
</template>

<script lang="ts" setup>
defineProps<{
  book: {
    coverImage: string;
    title: string;
  };
}>();
</script>
