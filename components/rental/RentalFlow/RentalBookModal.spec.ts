/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/vue";
import { nextTick } from "vue";
import { createTestingPinia } from "@pinia/testing";
import RentalBookModal from "./RentalBookModal.vue";
import { useRentalStore } from "@/stores/useRentalStore";

const DialogMock = {
  name: "Dialog",
  template: '<div v-if="open" data-testid="modal"><slot /></div>',
  props: ["open"],
  emits: ["close"],
};

const DialogContentMock = {
  template: '<div data-testid="modal-content"><slot /></div>',
};

const ButtonMock = {
  template: `
    <button 
      :data-testid="$attrs['data-testid']" 
      :disabled="disabled" 
      @click="$emit('click')"
    >
      <slot />
    </button>
  `,
  props: ["disabled", "variant"],
  emits: ["click"],
  inheritAttrs: true,
};

vi.mock("@/composables/useRental", () => ({
  useRental: () => ({
    validatePersonalData: (data: any) => Object.keys(data).length > 0,
  }),
}));

describe("RentalBookModal", () => {
  let pinia: any;

  const renderComponent = (props = {}) => {
    pinia = createTestingPinia({
      createSpy: vi.fn,
      initialState: {
        rental: {
          currentStep: 1,
          rentalDetails: {
            totalPrice: 0,
          },
          personalData: {},
        },
      },
    });

    return render(RentalBookModal, {
      props: {
        open: true,
        ...props,
      },
      global: {
        plugins: [pinia],
        stubs: {
          Dialog: DialogMock,
          DialogContent: DialogContentMock,
          Button: ButtonMock,
          RentalStepper: true,
          RentalConfirmationStep: true,
          RentalPersonalDataStep: true,
          RentalPaymentStep: true,
          RentalSuccessStep: true,
        },
      },
    });
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render correctly when open", () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });

  it("should not render when closed", () => {
    renderComponent({ open: false });
    expect(screen.queryByTestId("modal")).not.toBeInTheDocument();
  });

  it("should emit close event when close button is clicked", async () => {
    const { emitted } = renderComponent();
    const closeButton = screen.getByText("Fechar");
    await fireEvent.click(closeButton);
    expect(emitted().close).toBeTruthy();
  });

  it("should disable continue button on first step when total price is not set", () => {
    const store = useRentalStore();
    store.rentalDetails.totalPrice = 0;
    renderComponent();

    const continueButton = screen.getByText("Continuar");
    expect(continueButton).toBeDisabled();
  });

  it("should enable continue button on first step when total price is set", async () => {
    renderComponent();
    const store = useRentalStore(pinia);
    store.rentalDetails.totalPrice = 100;

    await nextTick();
    const continueButton = screen.getByText("Continuar");
    expect(continueButton).not.toBeDisabled();
  });

  it("should show back button after first step", async () => {
    renderComponent();
    const store = useRentalStore(pinia);
    store.currentStep = 2;

    await nextTick();
    expect(screen.getByText("Voltar")).toBeInTheDocument();
  });

  it("should move to next step when continue is clicked", async () => {
    const store = useRentalStore();
    store.rentalDetails.totalPrice = 100;
    renderComponent();

    const continueButton = screen.getByText("Continuar");
    await fireEvent.click(continueButton);
    expect(store.currentStep).toBe(2);
  });
});
