<template>
  <div class="flex w-full items-start gap-2 mb-6">
    <StepperItem
      v-for="step in steps"
      :key="step.step"
      :step="step.step"
      :title="step.title"
      :description="step.description"
      :current-step="currentStep"
    />
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import StepperItem from "./StepperItem.vue";

const props = defineProps<{
  steps: Array<{
    step: number;
    title: string;
    description: string;
  }>;
  currentStep: number;
}>();
</script>
