import type { Book } from "@/types/book";

export interface RentalPersonalData {
  name: string;
  email: string;
  address: string;
}

export interface RentalDetails {
  duration: number;
  totalPrice: number;
}

export interface RentalData {
  book: Book;
  personalData: RentalPersonalData;
  rentalDetails: RentalDetails;
}

export interface RentalDetails {
  duration: number;
  totalPrice: number;
}

export interface PaymentDetails {
  method: string | null;
  details: Record<string, any>;
}

export interface RentalData {
  personalData: RentalPersonalData;
  rentalDetails: RentalDetails;
  payment: PaymentDetails;
}
