import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/vue";
import RentalBookInfo from "./RentalBookInfo.vue";

const mockBook = {
  id: "1",
  title: "Test Book",
  coverImage: "test-cover.jpg",
};

describe("RentalBookInfo", () => {
  it("should render book cover image correctly", async () => {
    render(RentalBookInfo, {
      props: {
        book: mockBook,
      },
    });

    const img = await screen.findByTestId("book-cover");
    expect(img).toHaveAttribute("src", mockBook.coverImage);
    expect(img).toHaveAttribute("alt", mockBook.title);
  });

  it("should apply correct classes to image", async () => {
    render(RentalBookInfo, {
      props: {
        book: mockBook,
      },
    });

    const img = await screen.findByTestId("book-cover");
    expect(img).toHaveClass("rounded-lg", "shadow-md");
  });
});
