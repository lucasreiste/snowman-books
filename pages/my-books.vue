<template>
  <div>
    <div class="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-3xl font-bold mb-8 text-center">Livros Alugados</h2>

        <div v-if="rentedBooks.length === 0" class="text-center">
          <p class="text-xl text-gray-600">Nenhum livro alugado.</p>
        </div>

        <div v-else>
          <RentedBookList
            :books="rentedBooks"
            @some-action="handleSomeAction"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Book } from "@/types/book";

const rentedBooks = ref<
  Array<
    Book & {
      paymentMethod?: string;
      returnDate?: string;
    }
  >
>([]);

onMounted(() => {
  const rentalInfo = localStorage.getItem("rentalInfo");
  if (rentalInfo) {
    const parsedInfo = JSON.parse(rentalInfo);

    rentedBooks.value = [
      {
        ...parsedInfo.book,
        paymentMethod: parsedInfo.paymentMethod,
        returnDate: parsedInfo.returnDate,
      },
    ];
  }
});

const handleSomeAction = (book: Book) => {
  alert(`Ação no livro: ${book.title}`);
};
</script>
