<template>
  <div class="flex items-center">
    <label for="itemsPerPage" class="mr-2 text-sm text-gray-600">
      {{ t("search.itemsPerPage") }}:
    </label>
    <select
      id="itemsPerPage"
      v-model="selected"
      class="px-2 py-1 border border-gray-300 rounded-md text-sm"
      @change="onChange"
    >
      <option v-for="option in options" :key="option" :value="option">
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
const { t } = useI18n();

const props = defineProps<{
  modelValue: number;
}>();

const emits = defineEmits<{
  (e: "update:modelValue", value: number): void;
}>();

const options = [10, 20, 30, 40];
const selected = ref(10); // Valor inicial de 10 itens por página

function onChange() {
  emits("update:modelValue", selected.value);
}

watch(
  () => props.modelValue,
  (newValue) => {
    selected.value = newValue;
  }
);
</script>
