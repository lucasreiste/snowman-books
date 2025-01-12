import { defineStore } from "pinia";
import { ref } from "vue";
import type { Book } from "@/types/book";

interface FormData {
  name: string;
  email: string;
  address: string;
  cardNumber?: string;
  expiry?: string;
  cvv?: string;
}

export const usePurchaseStore = defineStore("purchase", () => {
  // Armazena os dados do livro
  const book = ref<Book | null>(null);

  // Armazena dados do formulário
  const formData = ref<FormData>({
    name: "",
    email: "",
    address: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  // Ações (setters e reset)
  function setBook(newBook: Book) {
    book.value = newBook;
  }

  function resetFormData() {
    formData.value = {
      name: "",
      email: "",
      address: "",
      cardNumber: "",
      expiry: "",
      cvv: "",
    };
  }

  return {
    book,
    formData,
    setBook,
    resetFormData,
  };
});
