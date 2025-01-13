<template>
  <div
    class="relative flex w-full flex-col items-center justify-center"
    data-testid="stepper-item"
  >
    <div
      v-if="!lastStep"
      class="absolute left-[calc(50%+20px)] right-[calc(-50%+10px)] top-5 block h-0.5 shrink-0 rounded-full bg-muted"
      :class="{
        'bg-primary': state === 'completed',
      }"
      data-testid="stepper-line"
    />
    <Button
      :variant="buttonVariant"
      size="icon"
      class="z-10 rounded-full shrink-0"
      data-testid="stepper-button"
    >
      <LucideCheck
        v-if="state === 'completed'"
        class="size-5"
        data-testid="stepper-icon-completed"
      />
      <LucideCircle
        v-if="state === 'active'"
        data-testid="stepper-icon-active"
      />
      <LucideDot
        v-if="state === 'inactive'"
        data-testid="stepper-icon-inactive"
      />
    </Button>
    <div class="mt-5 flex flex-col items-center text-center">
      <h3
        :class="{ 'text-primary': state === 'active' }"
        class="text-sm font-semibold transition lg:text-base"
        data-testid="stepper-title"
      >
        {{ title }}
      </h3>
      <p
        :class="{ 'text-primary': state === 'active' }"
        class="sr-only text-xs text-muted-foreground transition md:not-sr-only lg:text-sm"
        data-testid="stepper-description"
      >
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, computed } from "vue";

const props = defineProps<{
  step: number;
  title: string;
  description: string;
  currentStep: number;
}>();

const state = computed(() => {
  if (props.step < props.currentStep) return "completed";
  if (props.step === props.currentStep) return "active";
  return "inactive";
});

const lastStep = computed(() => {
  return props.step === 4;
});

const buttonVariant = computed(() => {
  if (state.value === "completed" || state.value === "active") {
    return "default";
  }
  return "outline";
});
</script>
