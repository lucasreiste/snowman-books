<template>
  <div class="flex flex-col items-center gap-2">
    <div class="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        :disabled="currentPage === 1"
        @click="prevPage"
      >
        <LucideChevronLeft class="h-4 w-4" />
        <span class="ml-1">Anterior</span>
      </Button>

      <div class="flex items-center gap-1">
        <Button
          v-for="page in totalPages"
          :key="page"
          :variant="page === currentPage ? 'default' : 'outline'"
          size="sm"
          @click="emit('pageChange', page)"
        >
          {{ page }}
        </Button>
      </div>

      <Button
        variant="outline"
        size="sm"
        :disabled="currentPage === totalPages"
        @click="nextPage"
      >
        <span class="mr-1">Próxima</span>
        <LucideChevronRight class="h-4 w-4" />
      </Button>
    </div>

    <p class="text-sm text-muted-foreground">
      Mostrando {{ startItem }}-{{ endItem }} de {{ totalItems }} itens
    </p>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { LucideChevronLeft, LucideChevronRight } from "lucide-vue-next";
import { Button } from "@/components/ui/button";

interface Props {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
}

interface Emits {
  (e: "pageChange", page: number): void;
}

const props = withDefaults(defineProps<Props>(), {
  itemsPerPage: 10,
  currentPage: 1,
});

const emit = defineEmits<Emits>();

const totalPages = computed(() =>
  Math.ceil(props.totalItems / props.itemsPerPage)
);

const startItem = computed(() =>
  props.totalItems === 0 ? 0 : (props.currentPage - 1) * props.itemsPerPage + 1
);

const endItem = computed(() =>
  Math.min(props.currentPage * props.itemsPerPage, props.totalItems)
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
