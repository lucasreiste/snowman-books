<template>
  <Dialog :open="open" @close="handleClose">
    <DialogContent class="lg:max-w-2xl p-6">
      <div class="flex flex-col">
        <RentalStepper :steps="steps" :current-step="rentalStore.currentStep" />
        <component :is="currentStepComponent" />
        <div class="mt-6 flex justify-end space-x-4">
          <Button
            v-if="rentalStore.currentStep === 1"
            variant="secondary"
            @click="handleClose"
          >
            {{ t("rental.buttons.close") }}
          </Button>
          <Button
            v-if="rentalStore.currentStep > 1"
            variant="secondary"
            @click="rentalStore.previousStep"
          >
            {{ t("rental.buttons.back") }}
          </Button>
          <Button
            v-if="rentalStore.currentStep < steps.length"
            variant="default"
            :disabled="isStepInvalid"
            @click="handleNextStep"
          >
            {{ t("rental.buttons.continue") }}
          </Button>
          <Button
            v-if="rentalStore.currentStep === steps.length"
            variant="default"
            @click="handleConfirm"
          >
            {{ t("rental.buttons.close") }}
          </Button>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>

<script lang="ts" setup>
import { useRental } from "@/composables/useRental";
import { useRentalStore } from "@/stores/useRentalStore";
import RentalConfirmationStep from "./steps/RentalConfirmationStep.vue";
import RentalPersonalDataStep from "./steps/RentalPersonalDataStep.vue";
import RentalPaymentStep from "./steps/RentalPaymentStep.vue";
import RentalSuccessStep from "./steps/RentalSuccessStep.vue";

interface Step {
  step: number;
  title: string;
  description: string;
}

const props = defineProps<{
  open: boolean;
}>();

const emit = defineEmits<{
  (e: "close"): void;
}>();

const rentalStore = useRentalStore();
const rental = useRental();
const { t } = useI18n();

const steps: Step[] = [
  {
    step: 1,
    title: t("rental.steps.confirmation.title"),
    description: t("rental.steps.confirmation.description"),
  },
  {
    step: 2,
    title: t("rental.steps.personalData.title"),
    description: t("rental.steps.personalData.description"),
  },
  {
    step: 3,
    title: t("rental.steps.payment.title"),
    description: t("rental.steps.payment.description"),
  },
  {
    step: 4,
    title: t("rental.steps.success.title"),
    description: t("rental.steps.success.description"),
  },
];

const stepComponents: {
  [key: number]:
    | typeof RentalConfirmationStep
    | typeof RentalPersonalDataStep
    | typeof RentalPaymentStep
    | typeof RentalSuccessStep;
} = {
  1: RentalConfirmationStep,
  2: RentalPersonalDataStep,
  3: RentalPaymentStep,
  4: RentalSuccessStep,
};

const currentStepComponent = computed(
  () => stepComponents[rentalStore.currentStep]
);

const isStepInvalid = computed(() => {
  if (rentalStore.currentStep === 1 && !rentalStore.rentalDetails.totalPrice) {
    return true;
  }
  if (
    rentalStore.currentStep === 2 &&
    !rental.validatePersonalData(rentalStore.personalData)
  ) {
    return true;
  }
  return false;
});

async function handleNextStep() {
  rentalStore.nextStep();
}

async function handleConfirm() {
  const success = await rental.saveRental({
    book: rentalStore.selectedBook,
    personalData: rentalStore.personalData,
    rentalDetails: rentalStore.rentalDetails,
  });

  if (success) {
    handleClose();
  }
}

function handleClose() {
  emit("close");
}

watch(
  () => props.open,
  (isOpen) => {
    if (!isOpen) {
      rentalStore.resetState();
    }
  }
);
</script>
