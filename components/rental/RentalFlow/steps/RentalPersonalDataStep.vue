<template>
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700">{{
        t("rental.personalData.name")
      }}</label>
      <Input
        v-model="formData.name"
        type="text"
        required
        class="mt-1 block w-full"
        data-testid="input-name"
      />
    </div>
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700">{{
        t("rental.personalData.email")
      }}</label>
      <Input
        v-model="formData.email"
        type="email"
        required
        class="mt-1 block w-full"
        data-testid="input-email"
      />
    </div>
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700">{{
        t("rental.personalData.address")
      }}</label>
      <Input
        v-model="formData.address"
        type="text"
        required
        class="mt-1 block w-full"
        data-testid="input-address"
      />
    </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRentalStore } from "@/stores/useRentalStore";
import { useI18n } from "vue-i18n";

const rentalStore = useRentalStore();
const formData = computed({
  get: () => rentalStore.personalData,
  set: (value) => rentalStore.setPersonalData(value),
});

const { t } = useI18n();
</script>
