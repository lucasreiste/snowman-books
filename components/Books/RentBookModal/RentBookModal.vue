<template>
  <Dialog :open="true">
    <DialogTrigger as-child>
      <slot name="trigger">
        <Button> Alugar</Button>
      </slot>
    </DialogTrigger>
    <DialogContent class="sm:max-w-3xl p-6">
      <div class="flex flex-col">
        <Stepper :steps="steps" :current-step="currentStep" />

        <component
          :is="currentStepComponent"
          v-model:form-data="formData"
          :book="book"
          @close="close"
          @next-step="nextStep"
          @prev-step="prevStep"
          @confirm="confirmAction"
        />
      </div>
    </DialogContent>
  </Dialog>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";
import Stepper from "./Stepper.vue";
import ConfirmationStep from "./steps/ConfirmationStep.vue";
import PersonalDataStep from "./steps/PersonalDataStep.vue";
// import PaymentStep from "./steps/PaymentStep.vue";
// import SuccessStep from "./steps/SuccessStep.vue";

const props = defineProps<{
  book: {
    id: number;
    coverImage: string;
    title: string;
    subtitle?: string;
    author: string;
    categories?: string;
    pageCount?: number;
    language: string;
    description: string;
    price: number;
    buyLink?: string;
    rentLink?: string;
  };
  actionType: "rent" | "buy";
}>();

const emit = defineEmits(["confirm", "close"]);

const open = ref(false);

//Stepper Logic
const currentStep = ref(1);

const steps = [
  {
    step: 1,
    title: "Confirmação",
    description: "Confirme o aluguel do livro",
  },
  {
    step: 2,
    title: "Dados Pessoais",
    description: "Informe seus dados pessoais e de endereço",
  },
  {
    step: 3,
    title: "Pagamento",
    description: "Realize o pagamento do aluguel",
  },
  {
    step: 4,
    title: "Confirmação",
    description: "Aluguel realizado com sucesso",
  },
];

const stepComponents = {
  1: ConfirmationStep,
  2: PersonalDataStep,
  // 3: PaymentStep,
  // 4: SuccessStep,
};

const currentStepComponent = computed(() => stepComponents[currentStep.value]);

const formData = ref({
  name: "",
  email: "",
  address: "",
});

const nextStep = () => {
  if (currentStep.value < steps.length) {
    currentStep.value += 1;
    if (currentStep.value === 4) {
      emit("confirm", props.book);
    }
  }
};

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value -= 1;
  }
};

const confirmAction = () => {
  emit("confirm", props.book);
  close();
};

const close = () => {
  emit("close");
  open.value = false;
};
</script>
