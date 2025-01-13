import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/vue";
import "@testing-library/jest-dom";
import RentedBookItem from "./RentedBookItem.vue";

vi.mock("@/composables/useRental", () => ({
  useRental: () => ({
    formatPrice: (value: number) => `R$ ${value.toFixed(2)}`,
  }),
}));

const mockRentalItem = {
  id: "1",
  book: {
    id: "1",
    title: "Livro Teste",
    subtitle: "Subtítulo Teste",
    coverImage: "test.jpg",
    author: "Autor Teste",
    categories: "Ficção",
    pageCount: 200,
    language: "pt",
    description: "Descrição do livro teste",
  },
  personalData: {
    name: "João",
    email: "joao@email.com",
    address: "Rua Teste, 123",
  },
  rentalDetails: {
    duration: 7,
    totalPrice: 35.9,
  },
};

describe("RentedBookItem", () => {
  const renderComponent = (props = { rentalItem: mockRentalItem }) => {
    return render(RentedBookItem, {
      props,
      global: {
        stubs: {
          Card: {
            template: '<div class="card"><slot /></div>',
          },
          CardContent: {
            template: '<div class="card-content"><slot /></div>',
          },
          CardTitle: {
            template: '<h3 class="card-title"><slot /></h3>',
            props: ["title"],
          },
          CardDescription: {
            template: '<p class="card-description"><slot /></p>',
            props: ["title"],
          },
          Button: {
            template: "<button><slot /></button>",
          },
          LucideUser: {
            template: '<span class="icon">user</span>',
          },
          LucideLayers: {
            template: '<span class="icon">layers</span>',
          },
          LucideBook: {
            template: '<span class="icon">book</span>',
          },
          LucideGlobe: {
            template: '<span class="icon">globe</span>',
          },
          LucideMail: {
            template: '<span class="icon">mail</span>',
          },
          LucideMapPin: {
            template: '<span class="icon">map-pin</span>',
          },
          LucideClock: {
            template: '<span class="icon">clock</span>',
          },
        },
      },
    });
  };

  beforeEach(() => {
    vi.spyOn(window, "confirm").mockImplementation(() => true);
  });

  it("should render book information correctly", () => {
    renderComponent();
    expect(screen.getByText(mockRentalItem.book.title)).toBeInTheDocument();
    expect(screen.getByText(mockRentalItem.book.subtitle)).toBeInTheDocument();
    expect(screen.getByText(mockRentalItem.book.author)).toBeInTheDocument();
  });

  it("should render rental details correctly", () => {
    renderComponent();
    expect(screen.queryByText("Nome:")).toBeInTheDocument();
    expect(screen.getByText("Email:")).toBeInTheDocument();
    expect(screen.getByText("Endereço:")).toBeInTheDocument();
    expect(
      screen.getByText(mockRentalItem.personalData.name)
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockRentalItem.personalData.email)
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockRentalItem.personalData.address)
    ).toBeInTheDocument();
  });

  it("should emit cancel-rental event when cancel button is clicked and confirmed", async () => {
    const { emitted } = renderComponent();
    const cancelButton = screen.getByRole("button", {
      name: /Cancelar/i,
    });
    await fireEvent.click(cancelButton);

    expect(window.confirm).toHaveBeenCalled();
    expect(emitted()["cancel-rental"]).toBeTruthy();
    expect(emitted()["cancel-rental"][0]).toEqual([mockRentalItem.book.id]);
  });

  it("should emit renew-rental event when renew button is clicked", async () => {
    const { emitted } = renderComponent();
    const renewButton = screen.getByRole("button", {
      name: /Renovar/i,
    });
    await fireEvent.click(renewButton);

    expect(emitted()["renew-rental"]).toBeTruthy();
    expect(emitted()["renew-rental"][0]).toEqual([mockRentalItem.book.id]);
  });
});
