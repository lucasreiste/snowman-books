import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import RentalStepper from "./RentalStepper.vue";
import RentalStepperItem from "./RentalStepperItem.vue";
import { LucideCheck, LucideCircle, LucideDot } from "lucide-vue-next";

describe("RentalStepper", () => {
  const mockSteps = [
    { step: 1, title: "Step 1", description: "Description 1" },
    { step: 2, title: "Step 2", description: "Description 2" },
    { step: 3, title: "Step 3", description: "Description 3" },
  ];

  const createWrapper = (props = { steps: mockSteps, currentStep: 1 }) => {
    return mount(RentalStepper, {
      props,
      global: {
        components: {
          RentalStepperItem,
          LucideCheck,
          LucideCircle,
          LucideDot,
        },
        stubs: {
          RentalStepperItem: true,
        },
      },
    });
  };

  it("should render all steps correctly", () => {
    const wrapper = createWrapper();
    expect(wrapper.findAllComponents(RentalStepperItem)).toHaveLength(3);
  });

  it("should pass correct props to step items", () => {
    const wrapper = createWrapper({ steps: mockSteps, currentStep: 2 });
    const stepItems = wrapper.findAllComponents(RentalStepperItem);

    const secondStep = stepItems[1];
    expect(secondStep.props()).toMatchObject({
      currentStep: 2,
      step: 2,
      title: "Step 2",
      description: "Description 2",
    });
  });
});
