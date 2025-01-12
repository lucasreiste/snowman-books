<template>
  <div class="flex flex-col items-center mb-8">
    <form class="w-full max-w-xl" @submit.prevent="emitSearchTerm">
      <div class="relative flex items-center gap-2">
        <div class="relative flex-1">
          <Input
            v-model="searchTerm"
            placeholder="Busque por título, autor ou categoria..."
            class="pl-10"
          >
            <template #leading>
              <LucideSearch class="h-4 w-4 text-muted-foreground" />
            </template>
          </Input>
        </div>
        <Button type="submit" class="gap-2">
          <LucideSearch class="w-4 h-4" />
          <span>Buscar</span>
        </Button>
        <Button
          type="button"
          variant="outline"
          class="gap-2"
          @click="clearSearchTerm"
        >
          <LucideX class="w-4 h-4" />
          <span>Limpar</span>
        </Button>
      </div>
      <div
        v-if="searchTerm"
        class="mt-2 text-sm text-muted-foreground text-center"
      >
        Pressione Enter para buscar ou clique no botão Buscar
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LucideSearch, LucideX } from "lucide-vue-next";

interface Emits {
  (e: "search-book", term: string): void;
  (e: "clear-search"): void;
}

const searchTerm = ref("");
const emits = defineEmits<Emits>();

function emitSearchTerm() {
  const trimmedTerm = searchTerm.value.trim();
  if (!trimmedTerm) return;
  emits("search-book", trimmedTerm);
}

function clearSearchTerm() {
  searchTerm.value = "";
  emits("clear-search");
}
</script>
