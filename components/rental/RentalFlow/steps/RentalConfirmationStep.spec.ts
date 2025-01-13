import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/vue";
import { nextTick } from "vue";
import { createTestingPinia } from "@pinia/testing";
import RentalConfirmationStep from "./RentalConfirmationStep.vue";

vi.mock("@/composables/useRental", () => ({
  useRental: () => ({
    calculatePrice: vi.fn((price, weeks) => price * weeks),
  }),
}));

describe("RentalConfirmationStep", () => {
  const mockBook = {
    id: 1,
    title: "Test Book",
    description: "Harry Potter",
    price: 100,
    coverImage: "test-image.jpg",
  };

  const renderComponent = () => {
    const pinia = createTestingPinia({
      createSpy: vi.fn,
      initialState: {
        rental: {
          selectedBook: mockBook,
          rentalDetails: {
            duration: 7,
            totalPrice: 100,
          },
        },
      },
    });

    return render(RentalConfirmationStep, {
      global: {
        plugins: [pinia],
        stubs: {
          RentalBookInfo: {
            template: '<div data-testid="book-info">{{ book.title }}</div>',
            props: ["book"],
          },
          DialogHeader: {
            template: "<div><slot /></div>",
          },
          DialogTitle: {
            template: '<h2 class="text-2xl font-bold"><slot /></h2>',
          },
          DialogDescription: {
            template: '<p class="mt-2 text-gray-600"><slot /></p>',
          },
        },
        mocks: {
          t: (key: string) => {
            const translations = {
              "rental.confirmation.title": "Alugar Livro",
              "rental.confirmation.subtitle":
                "Tem certeza de que deseja alugar o livro",
              "rental.confirmation.duration": "Duração do Aluguel:",
              "rental.confirmation.showMore": "Ver mais",
              "rental.confirmation.showLess": "Ver menos",
              "rental.confirmation.pricePerWeek": "Preço por semana:",
              "rental.confirmation.totalPrice": "Preço total:",
            };
            return translations[key] || key;
          },
          formatPrice: (value: number) => `R$ ${value}`,
        },
      },
    });
  };

  it("should render book details correctly", async () => {
    renderComponent();
    await nextTick();

    const bookInfo = screen.getByTestId("book-info");
    expect(bookInfo).toHaveTextContent(mockBook.title);

    const description = screen.getByText((content, element) => {
      return (
        element?.tagName.toLowerCase() === "strong" &&
        content === mockBook.title
      );
    });
    expect(description).toBeInTheDocument();

    expect(screen.getByText(mockBook.description)).toBeInTheDocument();

    expect(screen.getByText("Duração do Aluguel:")).toBeInTheDocument();
    expect(screen.getByText("Preço por semana: R$ 100")).toBeInTheDocument();
    expect(screen.getByText("Preço total: R$ 100")).toBeInTheDocument();
  });

  it("should handle duration change", async () => {
    renderComponent();
    await nextTick();
    const select = screen.getByRole("combobox");
    await fireEvent.update(select, "14");
    expect(select).toHaveValue("14");
  });
});
