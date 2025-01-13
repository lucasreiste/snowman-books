import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/vue";

import RentalPaymentStep from "./RentalPaymentStep.vue";

describe("RentalPaymentStep", () => {
  const renderComponent = () => {
    return render(RentalPaymentStep, {
      global: {
        stubs: {
          Input: {
            template:
              '<input :value="modelValue" @input="$emit(\'update:modelValue\', $event.target.value)" />',
            props: ["modelValue"],
            emits: ["update:modelValue"],
          },
        },
      },
    });
  };

  it("should render all payment methods", () => {
    renderComponent();
    expect(screen.getAllByRole("img")).toHaveLength(4);
  });

  it("should show credit card form when selecting card payment", async () => {
    renderComponent();
    const cardMethod = screen.getByTestId("payment-method-card");
    await fireEvent.click(cardMethod);
    expect(screen.getByTestId("card-title")).toBeInTheDocument();
  });

  it("should show PIX information when selecting PIX", async () => {
    renderComponent();
    const pixMethod = screen.getByTestId("payment-method-pix");
    await fireEvent.click(pixMethod);
    expect(screen.getByTestId("pix-title")).toBeInTheDocument();
  });

  it("should handle credit card form input", async () => {
    renderComponent();
    const cardMethod = screen.getByTestId("payment-method-card");
    await fireEvent.click(cardMethod);

    const numberInput = screen.getByTestId("card-number-input");
    await fireEvent.update(numberInput, "4111111111111111");
    expect(numberInput).toHaveValue("4111111111111111");
  });
});
