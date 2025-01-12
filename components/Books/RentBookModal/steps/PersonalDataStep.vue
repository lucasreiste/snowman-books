<template>
  <form @submit.prevent="handleSubmit">
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700">Nome</label>
      <Input
        v-model="formData.name"
        type="text"
        required
        class="mt-1 block w-full"
      />
    </div>
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700">Email</label>
      <Input
        v-model="formData.email"
        type="email"
        required
        class="mt-1 block w-full"
      />
    </div>
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700">Endereço</label>
      <Input
        v-model="formData.address"
        type="text"
        required
        class="mt-1 block w-full"
      />
    </div>
  </form>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

const props = defineProps<{
  formData: {
    name: string;
    email: string;
    address: string;
  };
}>();
</script>
