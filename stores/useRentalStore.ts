import { defineStore } from "pinia";
import type { Book } from "@/types/book";
import type {
  RentalPersonalData,
  RentalDetails,
  RentalData,
} from "@/types/rental";

interface RentalState {
  currentStep: number;
  selectedBook: Book | null;
  personalData: RentalPersonalData;
  rentalDetails: RentalDetails;
  activeRentals: RentalData[];
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
    activeRentals: [],
  }),

  getters: {
    rentedBookIds: (state) =>
      state.activeRentals.map((rental) => rental.book.id),
  },

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

    resetFormState() {
      this.currentStep = 1;
      this.selectedBook = null;
      this.personalData = {
        name: "",
        email: "",
        address: "",
      };
      this.rentalDetails = {
        duration: 7,
        totalPrice: 0,
      };
    },

    initializeFromLocalStorage() {
      const storedRentals = localStorage.getItem("activeRentals");
      if (storedRentals) {
        this.activeRentals = JSON.parse(storedRentals);
      }
    },

    addRental(rental: RentalData) {
      this.activeRentals.push(rental);

      localStorage.setItem("activeRentals", JSON.stringify(this.activeRentals));
    },

    removeRental(bookId: string) {
      this.activeRentals = this.activeRentals.filter(
        (rental) => rental.book.id !== bookId
      );
      localStorage.setItem("activeRentals", JSON.stringify(this.activeRentals));
    },
  },
});
