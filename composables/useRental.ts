import type { Book } from "@/types/book";
import type { RentalPersonalData } from "@/types/rental";

export function useRental() {
  function calculatePrice(price: number, weeks: number): number {
    return price * weeks;
  }

  function formatPrice(price: number): string {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  }

  function validatePersonalData(data: RentalPersonalData): boolean {
    const { name, email, address } = data;
    return Boolean(name && address && email);
  }

  function initializeRental(
    book: Book,
    duration: number = 7
  ): { duration: number; totalPrice: number } {
    const price = calculatePrice(book.price, duration);
    return {
      duration,
      totalPrice: price,
    };
  }

  return {
    calculatePrice,
    formatPrice,
    validatePersonalData,
    initializeRental,
  };
}
