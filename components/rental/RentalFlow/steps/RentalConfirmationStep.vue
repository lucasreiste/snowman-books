<template>
  <div class="flex flex-col md:flex-row overflow-y-auto">
    <div class="md:w-1/3 flex justify-center mb-4 md:mb-0 max-h-96">
      <RentalBookInfo
        v-if="rentalStore.selectedBook"
        :book="rentalStore.selectedBook"
      />
    </div>
    <div class="md:w-2/3 md:pl-6">
      <DialogHeader>
        <DialogTitle class="text-2xl font-bold">{{
          t("rental.confirmation.title")
        }}</DialogTitle>
        <DialogDescription class="mt-2 text-gray-600">
          {{ t("rental.confirmation.subtitle") }}
          <strong>{{ rentalStore.selectedBook?.title }}</strong
          >?
        </DialogDescription>
      </DialogHeader>
      <div v-if="rentalStore.selectedBook" class="relative">
        <p
          v-if="!isDescriptionExpanded"
          class="text-gray-700 mb-2 line-clamp-3"
        >
          {{ rentalStore.selectedBook.description }}
        </p>
        <p v-else class="text-gray-700 mb-2 max-h-96 overflow-y-auto">
          {{ rentalStore.selectedBook.description }}
        </p>
        <div v-if="hasLongDescription" class="text-center">
          <button
            class="text-blue-500 text-sm mt-1 focus:outline-none"
            @click="toggleDescription"
          >
            {{
              t(
                isDescriptionExpanded
                  ? "rental.confirmation.showLess"
                  : "rental.confirmation.showMore"
              )
            }}
          </button>
        </div>
      </div>
      <div class="flex flex-col gap-4 mt-4">
        <div class="flex items-center">
          <label for="rentalDuration" class="mr-2">
            {{ t("rental.confirmation.duration") }}
          </label>
          <select
            id="rentalDuration"
            v-model="duration"
            class="border border-gray-300 rounded-md px-2 py-1"
            required
          >
            <option value="7">
              {{ t("rental.confirmation.weekOptions.one") }}
            </option>
            <option value="14">
              {{ t("rental.confirmation.weekOptions.two") }}
            </option>
            <option value="21">
              {{ t("rental.confirmation.weekOptions.three") }}
            </option>
          </select>
        </div>
        <div class="flex flex-col gap-2">
          <p class="text-sm text-gray-600">
            {{ t("rental.confirmation.pricePerWeek") }}
            {{ formatPrice(rentalStore.selectedBook?.price || 0) }}
          </p>
          <p class="text-xl font-semibold text-primary">
            {{ t("rental.confirmation.totalPrice") }}
            {{ formatPrice(rentalStore.rentalDetails.totalPrice) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted } from "vue";
import { useRental } from "@/composables/useRental";
import { useRentalStore } from "@/stores/useRentalStore";
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();

const rentalStore = useRentalStore();
const rental = useRental();

const formatPrice = (value: number) => {
  return new Intl.NumberFormat(locale.value === "br" ? "pt-BR" : "en-US", {
    style: "currency",
    currency: locale.value === "br" ? "BRL" : "USD",
  }).format(value);
};

const duration = computed({
  get: () => rentalStore.rentalDetails.duration,
  set: (value: number) => {
    const weeks = value / 7;
    const price = rental.calculatePrice(
      rentalStore.selectedBook?.price || 0,
      weeks
    );
    rentalStore.setRentalDetails({
      duration: value,
      totalPrice: price,
    });
  },
});

const isDescriptionExpanded = ref(false);
const MAX_DESCRIPTION_LENGTH = 150;
const hasLongDescription = computed(() => {
  return rentalStore.selectedBook?.description?.length > MAX_DESCRIPTION_LENGTH;
});

const toggleDescription = () => {
  isDescriptionExpanded.value = !isDescriptionExpanded.value;
};

// Inicializa o preço quando o componente é montado
onMounted(() => {
  if (rentalStore.selectedBook) {
    const weeks = rentalStore.rentalDetails.duration / 7;
    const price = rental.calculatePrice(rentalStore.selectedBook.price, weeks);
    rentalStore.setRentalDetails({
      duration: rentalStore.rentalDetails.duration,
      totalPrice: price,
    });
  }
});
</script>
