import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/vue";
import { createTestingPinia } from "@pinia/testing";
import RentalSuccessStep from "./RentalSuccessStep.vue";

describe("RentalSuccessStep", () => {
  const mockBook = {
    id: 1,
    title: "Test Book",
    coverImage: "test-image.jpg",
  };

  const renderComponent = () => {
    const pinia = createTestingPinia({
      createSpy: vi.fn,
      initialState: {
        rental: {
          selectedBook: mockBook,
        },
      },
    });

    return render(RentalSuccessStep, {
      global: {
        plugins: [pinia],
        stubs: {
          LucideCheck: true,
        },
      },
    });
  };

  it("should render success message", () => {
    renderComponent();
    expect(screen.getByTestId("success-title")).toHaveTextContent(
      "Aluguel Confirmado!"
    );
    expect(screen.getByTestId("success-message")).toHaveTextContent(
      "Seu aluguel foi realizado com sucesso. Você pode conferir os detalhes na página Meus Livros Alugados."
    );
  });

  it("should display book information", () => {
    renderComponent();
    expect(screen.getByTestId("book-title")).toHaveTextContent(mockBook.title);
    expect(screen.getByTestId("book-cover")).toHaveAttribute(
      "src",
      mockBook.coverImage
    );
  });
});
