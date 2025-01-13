import { describe, it, expect, vi, beforeEach } from "vitest";
import { fetchBooks } from "./bookService";

describe("bookService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("fetchBooks", () => {
    it("should return an array of books when request is successful", async () => {
      const mockApiResponse = {
        items: [
          {
            id: "123",
            volumeInfo: {
              title: "Test Book",
              authors: ["Test Author"],
              description: "Test description",
              imageLinks: {
                thumbnail: "http://example.com/image.jpg",
              },
              categories: ["Fiction"],
              pageCount: 200,
              language: "en",
            },
          },
        ],
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockApiResponse),
      });

      const books = await fetchBooks();

      expect(books).toHaveLength(1);
      expect(books[0]).toMatchObject({
        id: "123",
        title: "Test Book",
        author: "Test Author",
        description: "Test description",
      });
    });

    it("should return empty array when no books are found", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ items: null }),
      });

      const books = await fetchBooks();
      expect(books).toEqual([]);
    });

    it("should return empty array when request fails", async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error("Network error"));

      const books = await fetchBooks();
      expect(books).toEqual([]);
    });

    it("should use default values for missing fields", async () => {
      const mockApiResponse = {
        items: [
          {
            id: "123",
            volumeInfo: {
              language: "en",
            },
          },
        ],
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockApiResponse),
      });

      const books = await fetchBooks();

      expect(books[0]).toMatchObject({
        title: "Título desconhecido",
        author: "Autor desconhecido",
        description: "Sem descrição disponível.",
        coverImage: "",
        categories: "N/A",
      });
    });

    it("should use search parameters correctly", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ items: [] }),
      });

      await fetchBooks("Harry Potter", 20);

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("q=Harry+Potter") &&
          expect.stringContaining("maxResults=20")
      );
    });
  });
});
