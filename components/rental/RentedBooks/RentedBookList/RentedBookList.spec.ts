import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/vue";
import RentedBookList from "./RentedBookList.vue";

vi.mock("vue-i18n", () => ({
  useI18n: () => ({
    t: (key: string) => key,
  }),
}));

const mockComponents = {
  LucideBookOpen: {
    template: '<div data-testid="book-open-icon"></div>',
  },
  Button: {
    template: "<button><slot /></button>",
  },
  NuxtLink: {
    template: "<a><slot /></a>",
  },
  RentedBookItem: {
    template: '<div data-testid="rented-book-item"><slot /></div>',
    props: ["rentalItem"],
  },
};

const mockRentedBooks = [
  {
    id: "1",
    book: {
      id: "1",
      title: "Livro Teste",
      coverImage: "test.jpg",
      author: "Autor Teste",
    },
    personalData: {
      name: "João",
      email: "joao@email.com",
    },
    rentalDetails: {
      duration: 7,
      totalPrice: 35.9,
    },
  },
];

describe("RentedBookList", () => {
  const renderComponent = (props = { rentedBooks: [] }) => {
    return render(RentedBookList, {
      props,
      global: {
        stubs: {
          ...mockComponents,
          RentedBookItem: true,
        },
      },
    });
  };

  it("should display empty state when there are no rented books", async () => {
    renderComponent();
    const emptyText = await screen.findByText("rental.rentedBooks.empty");
    const exploreButton = await screen.findByText(
      "rental.rentedBooks.exploreBooks"
    );

    expect(emptyText).toBeInTheDocument();
    expect(exploreButton).toBeInTheDocument();
  });

  it("should display rented books when they exist", async () => {
    renderComponent({ rentedBooks: mockRentedBooks });
    const title = await screen.findByText("rental.rentedBooks.title");
    expect(title).toBeInTheDocument();
    expect(
      screen.queryByText("rental.rentedBooks.empty")
    ).not.toBeInTheDocument();
  });
});
