<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <div class="flex justify-end mb-4">
      <ItemsPerPage
        :model-value="itemsPerPage"
        @update:model-value="handleItemsPerPageChange"
      />
    </div>

    <div v-if="books.length === 0" class="text-center py-12">
      <LucideBookOpen class="h-16 w-16 text-gray-400 mx-auto mb-4" />
      <p class="text-xl text-gray-600">{{ $t("books.notFound") }}</p>
    </div>

    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      <Card
        v-for="book in books"
        :key="book.id"
        class="overflow-hidden transition hover:shadow-lg flex flex-col h-full"
      >
        <div class="relative bg-gray-100 aspect-[2/3]">
          <img
            :src="book.coverImage"
            :alt="book.title"
            class="w-full h-full object-cover object-center"
          />
        </div>

        <CardHeader class="min-h-[80px]">
          <CardTitle class="line-clamp-2 text-lg">{{ book.title }}</CardTitle>
          <CardDescription v-if="book.subtitle" class="line-clamp-1">
            {{ book.subtitle }}
          </CardDescription>
        </CardHeader>

        <CardContent class="flex-1 space-y-2 min-h-[220px]">
          <div class="text-sm text-muted-foreground space-y-1">
            <p class="flex items-center">
              <LucideUser class="w-4 h-4 mr-1" />
              {{ $t("books.details.author") }}: {{ book.author }}
            </p>
            <p class="flex items-center">
              <LucideLayers class="w-4 h-4 mr-1" />
              {{ $t("books.details.categories") }}:
              {{ book.categories || "N/A" }}
            </p>
            <p class="flex items-center">
              <LucideBook class="w-4 h-4 mr-1" />
              {{ $t("books.details.pages") }}: {{ book.pageCount || "N/A" }}
            </p>
            <p class="flex items-center">
              <LucideGlobe class="w-4 h-4 mr-1" />
              {{ $t("books.details.language") }}:
              {{ book.language.toUpperCase() || "N/A" }}
            </p>
          </div>
          <p class="text-sm text-muted-foreground line-clamp-3 mt-2">
            {{ book.description }}
          </p>
        </CardContent>

        <CardFooter
          class="p-4 flex flex-col sm:flex-row justify-between items-center border-t gap-3 min-h-[80px]"
        >
          <span class="font-semibold text-primary text-sm">
            {{
              $t("books.details.pricePerWeek", {
                price: book.price.toFixed(2),
              })
            }}
          </span>
          <Button
            class="w-full sm:w-auto"
            variant="default"
            @click="emitRentBook(book)"
          >
            {{ $t("books.rentButton") }}
          </Button>
        </CardFooter>
      </Card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Book } from "@/types/book";

interface Props {
  books: Book[];
  itemsPerPage: number;
}

interface Emits {
  (e: "rent-book", book: Book): void;
  (e: "update:itemsPerPage", value: number): void;
}

const props = withDefaults(defineProps<Props>(), {
  itemsPerPage: 10,
});

const emits = defineEmits<Emits>();

const emitRentBook = (book: Book) => {
  emits("rent-book", book);
};

const handleItemsPerPageChange = (value: number) => {
  emits("update:itemsPerPage", value);
};
</script>
