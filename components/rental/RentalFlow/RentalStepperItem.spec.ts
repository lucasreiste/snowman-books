import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/vue";
import RentalStepperItem from "./RentalStepperItem.vue";

const ButtonMock = {
  name: "Button",
  template: `<button :data-testid="$attrs['data-testid']" :variant="variant" :size="size"><slot /></button>`,
  props: ["variant", "size"],
  inheritAttrs: true,
};

describe("RentalStepperItem", () => {
  const renderComponent = (props = {}) => {
    return render(RentalStepperItem, {
      props: {
        step: 1,
        title: "Informações Pessoais",
        description: "Preencha seus dados",
        currentStep: 1,
        ...props,
      },
      global: {
        stubs: {
          Button: ButtonMock,
          LucideCheck: true,
          LucideCircle: true,
          LucideDot: true,
        },
      },
    });
  };

  it("should render correctly", () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });

  it("should display title and description correctly", () => {
    renderComponent({
      title: "Teste",
      description: "Descrição teste",
    });

    expect(screen.getByTestId("stepper-title")).toHaveTextContent("Teste");
    expect(screen.getByTestId("stepper-description")).toHaveTextContent(
      "Descrição teste"
    );
  });

  it("should show completed state correctly", () => {
    renderComponent({
      step: 1,
      currentStep: 2,
    });

    expect(screen.getByTestId("stepper-icon-completed")).toBeInTheDocument();
    expect(screen.queryByTestId("stepper-icon-active")).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("stepper-icon-inactive")
    ).not.toBeInTheDocument();
  });

  it("should show active state correctly", () => {
    renderComponent({
      step: 2,
      currentStep: 2,
    });

    expect(
      screen.queryByTestId("stepper-icon-completed")
    ).not.toBeInTheDocument();
    expect(screen.getByTestId("stepper-icon-active")).toBeInTheDocument();
    expect(
      screen.queryByTestId("stepper-icon-inactive")
    ).not.toBeInTheDocument();
  });

  it("should show inactive state correctly", () => {
    renderComponent({
      step: 3,
      currentStep: 2,
    });

    expect(
      screen.queryByTestId("stepper-icon-completed")
    ).not.toBeInTheDocument();
    expect(screen.queryByTestId("stepper-icon-active")).not.toBeInTheDocument();
    expect(screen.getByTestId("stepper-icon-inactive")).toBeInTheDocument();
  });

  it("should not show connector line on last step", () => {
    renderComponent({
      step: 4,
      currentStep: 1,
    });

    const stepperLine = screen.queryByTestId("stepper-line");
    expect(stepperLine).not.toBeInTheDocument();
  });

  it("should show connector line for non-last steps", () => {
    renderComponent({
      step: 2,
      currentStep: 1,
    });

    const stepperLine = screen.getByTestId("stepper-line");
    expect(stepperLine).toBeInTheDocument();
  });

  it("should apply correct button variant for completed state", () => {
    renderComponent({
      step: 1,
      currentStep: 2,
    });

    const button = screen.getByTestId("stepper-button");
    expect(button).toHaveAttribute("variant", "default");
  });

  it("should apply correct button variant for inactive state", () => {
    renderComponent({
      step: 3,
      currentStep: 1,
    });

    const button = screen.getByTestId("stepper-button");
    expect(button).toHaveAttribute("variant", "outline");
  });
});
