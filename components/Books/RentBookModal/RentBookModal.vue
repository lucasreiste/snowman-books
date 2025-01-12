<template>
  <Dialog :open="open">
    <DialogContent class="sm:max-w-3xl p-6">
      <div class="flex flex-col">
        <Stepper :steps="steps" :current-step="currentStep" />
        <component
          :is="currentStepComponent"
          v-model:form-data="purchaseStore.formData"
          :book="purchaseStore.book"
          @close="onClose"
          @confirm="onConfirm"
        />

        <div class="mt-6 flex justify-end space-x-4">
          <Button v-if="currentStep > 1" variant="secondary" @click="onPrevStep"
            >Voltar</Button
          >
          <Button
            v-if="currentStep < steps.length"
            variant="primary"
            @click="onNextStep"
            >Continuar</Button
          >
          <Button
            v-if="currentStep === steps.length"
            variant="primary"
            @click="onConfirm"
            >Fechar</Button
          >
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";
import { usePurchaseStore } from "@/stores/usePurchaseStore";

import Stepper from "./Stepper.vue";
import ConfirmationStep from "./steps/ConfirmationStep.vue";
import PersonalDataStep from "./steps/PersonalDataStep.vue";
import PaymentStep from "./steps/PaymentStep.vue";
import SuccessStep from "./steps/SuccessStep.vue";

const props = defineProps<{
  open: boolean;
}>();

const emit = defineEmits(["close", "confirm"]);

const currentStep = ref(1);

const steps = [
  { step: 1, title: "Confirmação", description: "Confirme o aluguel do livro" },
  {
    step: 2,
    title: "Dados Pessoais",
    description: "Informe seus dados pessoais",
  },
  { step: 3, title: "Pagamento", description: "Realize o pagamento" },
  { step: 4, title: "Sucesso", description: "Aluguel realizado com sucesso" },
];

const stepComponents = {
  1: ConfirmationStep,
  2: PersonalDataStep,
  3: PaymentStep,
  4: SuccessStep,
};

const currentStepComponent = computed(() => stepComponents[currentStep.value]);

const purchaseStore = usePurchaseStore();


watch(
  () => props.open,
  (isOpen) => {
    if (isOpen) {
      currentStep.value = 1;
      purchaseStore.resetFormData();
    }
  }
);


function onNextStep() {
  if (currentStep.value < steps.length) {
    currentStep.value++;
    if (currentStep.value === 5 && purchaseStore.book) {
      emit("confirm", purchaseStore.book);
    }
  }
}


function onPrevStep() {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
}

function onConfirm() {
  if (purchaseStore.book) {
    emit("confirm", purchaseStore.book);
  }
  onClose();
}

function onClose() {
  emit("close");
}
</script>
