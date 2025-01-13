import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/vue";
import Pagination from "./Pagination.vue";

const ButtonMock = {
  name: "Button",
  template: `<button :data-testid="$attrs['data-testid']" :disabled="disabled" @click="$emit('click')"><slot /></button>`,
  props: ["disabled", "variant", "size"],
  emits: ["click"],
  inheritAttrs: true,
};

describe("Pagination", () => {
  const renderComponent = (props = {}) => {
    return render(Pagination, {
      props: {
        totalItems: 100,
        itemsPerPage: 10,
        currentPage: 1,
        ...props,
      },
      global: {
        stubs: {
          Button: ButtonMock,
          LucideChevronLeft: true,
          LucideChevronRight: true,
        },
      },
    });
  };

  it("should render correctly", () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });

  it("should render correctly with default props", () => {
    renderComponent();
    const itemsInfo = screen.getByTestId("items-info");
    expect(itemsInfo).toHaveTextContent("Mostrando 1-10 de 100 itens");
  });

  it("should emit pageChange event when clicking a page", async () => {
    const { emitted } = renderComponent();
    const pageButton = screen.getByTestId("page-button-2");
    await fireEvent.click(pageButton);

    expect(emitted()["pageChange"]).toBeTruthy();
    expect(emitted()["pageChange"][0]).toEqual([2]);
  });

  it("should disable previous button on first page", () => {
    renderComponent();
    const prevButton = screen.getByTestId("prev-button");
    expect(prevButton).toBeDisabled();
  });

  it("should disable next button on last page", () => {
    renderComponent({
      totalItems: 30,
      itemsPerPage: 10,
      currentPage: 3,
    });

    const nextButton = screen.getByTestId("next-button");
    expect(nextButton).toBeDisabled();
  });

  it("should display correct item range for middle page", () => {
    renderComponent({
      totalItems: 100,
      itemsPerPage: 10,
      currentPage: 5,
    });

    const itemsInfo = screen.getByTestId("items-info");
    expect(itemsInfo).toHaveTextContent("Mostrando 41-50 de 100 itens");
  });

  it("should handle zero items correctly", () => {
    renderComponent({
      totalItems: 0,
      itemsPerPage: 10,
      currentPage: 1,
    });

    const itemsInfo = screen.getByTestId("items-info");
    expect(itemsInfo).toHaveTextContent("Mostrando 0-0 de 0 itens");
  });
});
