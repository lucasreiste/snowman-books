import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/vue";
import { createTestingPinia } from "@pinia/testing";
import RentalPersonalDataStep from "./RentalPersonalDataStep.vue";

describe("RentalPersonalDataStep", () => {
  const renderComponent = () => {
    const pinia = createTestingPinia({
      createSpy: vi.fn,
      initialState: {
        rental: {
          personalData: {
            name: "",
            email: "",
            address: "",
          },
        },
      },
    });

    return render(RentalPersonalDataStep, {
      global: {
        plugins: [pinia],
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

  it("should render all form fields", async () => {
    renderComponent();
    expect(await screen.findByTestId("input-name")).toBeInTheDocument();
    expect(await screen.findByTestId("input-email")).toBeInTheDocument();
    expect(await screen.findByTestId("input-address")).toBeInTheDocument();
  });

  it("should update store when form is filled", async () => {
    renderComponent();

    const nameInput = await screen.findByTestId("input-name");
    const emailInput = await screen.findByTestId("input-email");
    const addressInput = await screen.findByTestId("input-address");

    await fireEvent.update(nameInput, "John Doe");
    await fireEvent.update(emailInput, "john@example.com");
    await fireEvent.update(addressInput, "123 Main St");

    expect(nameInput).toHaveValue("John Doe");
    expect(emailInput).toHaveValue("john@example.com");
    expect(addressInput).toHaveValue("123 Main St");
  });
});
