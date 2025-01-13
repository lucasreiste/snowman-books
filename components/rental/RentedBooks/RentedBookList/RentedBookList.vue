<template>
  <section class="max-w-7xl mx-auto px-4 py-8 space-y-6">
    <header class="flex items-center justify-between">
      <h2 class="text-2xl font-bold tracking-tight">
        {{ t("rental.rentedBooks.title") }}
      </h2>
    </header>

    <div
      v-if="rentedBooks.length === 0"
      class="flex flex-col items-center justify-center py-12"
    >
      <LucideBookOpen class="h-12 w-12 text-muted-foreground mb-4" />
      <p class="text-xl text-muted-foreground">
        {{ t("rental.rentedBooks.empty") }}
      </p>
      <Button variant="outline" class="mt-4" as-child>
        <NuxtLink to="/books">{{
          t("rental.rentedBooks.exploreBooks")
        }}</NuxtLink>
      </Button>
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <RentedBookItem
        v-for="(rentalItem, index) in rentedBooks"
        :key="rentalItem.id || index"
        :rental-item="rentalItem"
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { RentalData } from "@/types/rental";
const { t } = useI18n();

defineProps<{
  rentedBooks: RentalData[];
}>();
</script>
