<template>
  <div class="text-center">
    <LucideCheck class="mx-auto h-12 w-12 text-green-500" />
    <h3 class="mt-4 text-lg font-medium text-gray-900">
      Pagamento Confirmado!
    </h3>
    <p class="mt-2 text-sm text-gray-600">
      Seu aluguel foi realizado com sucesso. Você receberá uma confirmação por
      email.
    </p>
    <div class="mt-6 flex justify-center">
      <Button variant="default" @click="close">Fechar</Button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits } from "vue";

const emit = defineEmits(["close"]);

const close = () => {
  emit("close");
};
</script>
