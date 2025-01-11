<template>
  <div class="flex justify-center items-center space-x-4 mt-6">
    <button
      :disabled="currentPage === 1"
      class="px-4 py-2 bg-gray-300 text-gray-600 rounded-md font-medium transition hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
      @click="prevPage"
    >
      <LucideChevronLeft class="w-4 h-4 inline-block mr-1" />
      Anterior
    </button>

    <span class="text-gray-600 font-medium">
      Página {{ currentPage }} de {{ totalPages }}
    </span>

    <button
      :disabled="currentPage === totalPages"
      class="px-4 py-2 bg-gray-300 text-gray-600 rounded-md font-medium transition hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
      @click="nextPage"
    >
      Próxima
      <LucideChevronRight class="w-4 h-4 inline-block ml-1" />
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  totalItems: {
    type: Number,
    required: true,
  },
  itemsPerPage: {
    type: Number,
    default: 10,
  },
  currentPage: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["pageChange"]);

const totalPages = computed(() =>
  Math.ceil(props.totalItems / props.itemsPerPage)
);

const nextPage = () => {
  if (props.currentPage < totalPages.value) {
    emit("pageChange", props.currentPage + 1);
  }
};

const prevPage = () => {
  if (props.currentPage > 1) {
    emit("pageChange", props.currentPage - 1);
  }
};
</script>
