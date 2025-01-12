import { defineStore } from "pinia";
import type { Book } from "@/types/book";
import type { RentalPersonalData, RentalDetails } from "@/types/rental";

interface RentalState {
  currentStep: number;
  selectedBook: Book | null;
  personalData: RentalPersonalData;
  rentalDetails: RentalDetails;
}

export const useRentalStore = defineStore("rental", {
  state: (): RentalState => ({
    currentStep: 1,
    selectedBook: null,
    personalData: {
      name: "",
      email: "",
      address: "",
    },
    rentalDetails: {
      duration: 7,
      totalPrice: 0,
    },
  }),

  actions: {
    setSelectedBook(book: Book) {
      this.selectedBook = book;
    },

    setPersonalData(data: Partial<RentalState["personalData"]>) {
      this.personalData = { ...this.personalData, ...data };
    },

    setRentalDetails(details: Partial<RentalState["rentalDetails"]>) {
      this.rentalDetails = { ...this.rentalDetails, ...details };
    },

    nextStep() {
      this.currentStep++;
    },

    previousStep() {
      this.currentStep--;
    },

    resetState() {
      this.$reset();
    },
  },
});
