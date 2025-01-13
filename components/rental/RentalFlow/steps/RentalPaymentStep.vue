<template>
  <div>
    Pagamento não disponível no momento, simulação do flow de pagamento:
    <div
      v-if="!selectedMethodId"
      class="grid grid-cols-2 gap-4 mb-6 justify-center"
    >
      <div
        v-for="method in paymentMethods"
        :key="method.id"
        class="cursor-pointer flex flex-col items-center p-4 hover:shadow transition-shadow"
        :data-testid="`payment-method-${method.key}`"
        @click="selectPaymentMethod(method.id)"
      >
        <img
          :src="method.imgSrc"
          :alt="method.label"
          class="w-28 h-28 object-contain"
        />
        <span class="mt-3 text-lg font-semibold text-gray-600">
          {{ t(`rental.payment.methods.${method.key}`) }}
        </span>
      </div>
    </div>
    <div v-else-if="selectedMethodId === 1">
      <h2 class="text-lg font-bold mb-4 text-primary" data-testid="card-title">
        Cartão de Crédito
      </h2>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700">
          Número do Cartão
        </label>
        <Input
          v-model="cardInfo.number"
          type="text"
          required
          class="mt-1 block w-full"
          data-testid="card-number-input"
        />
      </div>
      <div class="mb-4 flex space-x-4">
        <div class="w-1/2">
          <label class="block text-sm font-medium text-gray-700"
            >Validade</label
          >
          <Input
            v-model="cardInfo.expiry"
            type="text"
            required
            placeholder="MM/AA"
            class="mt-1 block w-full"
          />
        </div>
        <div class="w-1/2">
          <label class="block text-sm font-medium text-gray-700">CVV</label>
          <Input
            v-model="cardInfo.cvv"
            type="text"
            required
            class="mt-1 block w-full"
          />
        </div>
      </div>
    </div>
    <div v-else-if="selectedMethodId === 2">
      <h2 class="text-lg font-bold mb-2 text-primary" data-testid="pix-title">
        Pagamento via PIX
      </h2>
      <p class="mb-2">Escaneie o QR code ou copie o código abaixo:</p>
      <img
        :src="qrcodeImage"
        alt="QR code para pagamento PIX"
        class="mt-2 mb-2 h-40 w-40 object-contain mx-auto"
      />
      <textarea rows="3" class="border rounded w-full p-2 mb-4" readonly>
Código PIX ...
      </textarea>
    </div>
    <div v-else-if="selectedMethodId === 3">
      <h2 class="text-lg font-bold mb-2 text-primary">Pagamento via Boleto</h2>
      <p class="mb-2">Use o código abaixo para pagar o boleto:</p>
      <textarea rows="3" class="border rounded w-full p-2 mb-4" readonly>
Código do Boleto ...
      </textarea>
    </div>
    <div v-else-if="selectedMethodId === 4">
      <h2 class="text-lg font-bold mb-2 text-primary">Pagamento via Bitcoin</h2>
      <p class="mb-2">Use o endereço abaixo para pagar com Bitcoin:</p>
      <textarea rows="3" class="border rounded w-full p-2 mb-4" readonly>
Endereço Bitcoin ...
      </textarea>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import qrcodeImage from "~/assets/img/paymentmethods/qrcode.png";
import pixImage from "~/assets/img/paymentmethods/pix.png";
import cardImage from "~/assets/img/paymentmethods/card.jpg";
import boletoImage from "~/assets/img/paymentmethods/boleto.jpg";
import bitcoinImage from "~/assets/img/paymentmethods/bitcoin.png";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const cardInfo = reactive({
  number: "",
  expiry: "",
  cvv: "",
});

const paymentMethods = [
  { id: 1, key: "card", imgSrc: cardImage },
  { id: 2, key: "pix", imgSrc: pixImage },
  { id: 3, key: "boleto", imgSrc: boletoImage },
  { id: 4, key: "bitcoin", imgSrc: bitcoinImage },
];

const selectedMethodId = ref<number | null>(null);

function selectPaymentMethod(methodId: number) {
  selectedMethodId.value = methodId;
}
</script>
