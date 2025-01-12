<template>
  <div>
    <div
      v-if="!selectedMethodId"
      class="grid grid-cols-2 gap-4 mb-6 justify-center"
    >
      <div
        v-for="method in paymentMethods"
        :key="method.id"
        class="cursor-pointer flex flex-col items-center p-4 hover:shadow transition-shadow"
        @click="selectPaymentMethod(method.id)"
      >
        <img
          :src="method.imgSrc"
          :alt="method.label"
          class="w-28 h-28 object-contain"
        />
        <span class="mt-3 text-lg font-semibold text-gray-600">
          {{ method.label }}
        </span>
      </div>
    </div>

    <div v-else-if="selectedMethodId === 1">
      <h2 class="text-lg font-bold mb-4 text-primary">
        Pagamento com Cartão de Crédito
      </h2>
      <form @submit.prevent="goToNextStep">
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700"
            >Número do Cartão</label
          >
          <Input
            v-model="formData.cardNumber"
            type="text"
            required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
        </div>
        <div class="mb-4 flex space-x-4">
          <div class="w-1/2">
            <label class="block text-sm font-medium text-gray-700"
              >Validade</label
            >
            <Input
              v-model="formData.expiry"
              type="text"
              required
              placeholder="MM/AA"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            />
          </div>
          <div class="w-1/2">
            <label class="block text-sm font-medium text-gray-700">CVV</label>
            <Input
              v-model="formData.cvv"
              type="text"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            />
          </div>
        </div>
        <div class="flex justify-end space-x-4 pt-4">
          <Button variant="secondary" @click="goBackToSelection">Voltar</Button>
          <Button variant="primary" type="submit">Avançar</Button>
        </div>
      </form>
    </div>

    <div v-else-if="selectedMethodId === 2">
      <h2 class="text-lg font-bold mb-2 text-primary">Pagamento via PIX</h2>
      <p class="mb-2">Escaneie o QR code ou copie o código abaixo:</p>
      <img
        src="@/assets/img/paymentmethods/qrcode.png"
        alt="QR code para pagamento PIX"
        class="mt-2 mb-2 h-40 w-40 object-contain mx-auto"
      />
      <textarea rows="3" class="border rounded w-full p-2 mb-4" readonly>
Aqui vai o código PIX a ser copiado
      </textarea>
      <div class="flex justify-end space-x-4">
        <Button variant="secondary" @click="goBackToSelection">Voltar</Button>
        <Button variant="primary" @click="goToNextStep"
          >Confirmar Pagamento</Button
        >
      </div>
    </div>

    <div v-else-if="selectedMethodId === 3">
      <h2 class="text-lg font-bold mb-2 text-primary">Pagamento via Boleto</h2>
      <p class="mb-2">Clique no botão abaixo para gerar seu boleto bancário.</p>
      <div class="flex justify-end space-x-4 mt-4">
        <Button variant="secondary" @click="goBackToSelection">Voltar</Button>
        <Button variant="primary" @click="goToNextStep">Gerar Boleto</Button>
      </div>
    </div>

    <div v-else-if="selectedMethodId === 4">
      <h2 class="text-lg font-bold mb-2 text-primary">Pagamento via Bitcoin</h2>
      <p class="mb-2">
        Envie a quantia exata de BTC para o endereço abaixo ou utilize o QR
        code:
      </p>
      <img
        src="@/assets/img/paymentmethods/qrcode.png"
        alt="QR code para pagamento Bitcoin"
        class="mt-2 mb-2 h-40 w-40 object-contain mx-auto"
      />
      <textarea rows="3" class="border rounded w-full p-2 mb-4" readonly>
Endereço de carteira Bitcoin
      </textarea>
      <div class="flex justify-end space-x-4">
        <Button variant="secondary" @click="goBackToSelection">Voltar</Button>
        <Button variant="primary" @click="goToNextStep"
          >Confirmar Pagamento</Button
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";
import pixImage from "@/assets/img/paymentmethods/pix.png";
import cardImage from "@/assets/img/paymentmethods/card.jpg";
import boletoImage from "@/assets/img/paymentmethods/boleto.jpg";
import bitcoinImage from "@/assets/img/paymentmethods/bitcoin.png";

const props = defineProps<{
  formData: {
    cardNumber: string;
    expiry: string;
    cvv: string;
  };
}>();

const emit = defineEmits(["prev-step", "next-step"]);

const paymentMethods = ref([
  { id: 1, label: "Cartão", imgSrc: cardImage },
  { id: 2, label: "PIX", imgSrc: pixImage },
  { id: 3, label: "Boleto", imgSrc: boletoImage },
  { id: 4, label: "Bitcoin", imgSrc: bitcoinImage },
]);

const selectedMethodId = ref<number | null>(null);

function selectPaymentMethod(methodId: number) {
  selectedMethodId.value = methodId;
}

function goBackToSelection() {
  selectedMethodId.value = null;
}

function goToNextStep() {
  emit("next-step");
}
</script>
