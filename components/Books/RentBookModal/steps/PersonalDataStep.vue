<template>
  <form @submit.prevent="handleSubmit">
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700">Nome</label>
      <Input
        v-model="formData.name"
        type="text"
        required
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
      />
    </div>
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700">Email</label>
      <Input
        v-model="formData.email"
        type="email"
        required
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
      />
    </div>
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700">Endereço</label>
      <Input
        v-model="formData.address"
        type="text"
        required
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
      />
    </div>
    <div class="flex justify-end space-x-4">
      <Button variant="secondary" @click="prevStep">Voltar</Button>
      <Button variant="primary" type="submit">Avançar</Button>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps<{
  formData: {
    name: string;
    email: string;
    address: string;
  };
}>();

const emit = defineEmits(["prev-step", "next-step"]);

const handleSubmit = () => {
  emit("next-step");
};

const prevStep = () => {
  emit("prev-step");
};
</script>
