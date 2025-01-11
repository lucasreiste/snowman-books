import type { Book } from "@/types/book";

interface GoogleBook {
  id: string;
  volumeInfo: {
    title: string;
    subtitle?: string;
    authors?: string[];
    description?: string;
    imageLinks?: {
      thumbnail: string;
    };
    categories?: string[];
    pageCount?: number;
    language: string;
  };
  saleInfo: {
    buyLink?: string;
  };
}

interface FetchBooksResult {
  books: Book[] | null;
  error: string | null;
}

export const fetchBooks = async (): Promise<FetchBooksResult> => {
  const response = await fetch(
    "https://www.googleapis.com/books/v1/volumes?q=subject:fiction&orderBy=relevance&printType=books&maxResults=5"
  );

  if (!response.ok) {
    return { books: null, error: `Erro na requisição: ${response.status}` };
  }

  const data = await response.json();

  if (!data.items) {
    return { books: null, error: "Nenhum livro encontrado." };
  }

  const books: Book[] = data.items.map(
    (item: GoogleBook): Book => ({
      id: item.id,
      title: item.volumeInfo.title,
      subtitle: item.volumeInfo.subtitle || null,
      author: item.volumeInfo.authors?.join(", ") || "Autor desconhecido",
      description: item.volumeInfo.description || "Sem descrição disponível.",
      coverImage: item.volumeInfo.imageLinks?.thumbnail || "",
      categories: item.volumeInfo.categories?.join(", ") || "N/A",
      pageCount: item.volumeInfo.pageCount || "N/A",
      language: item.volumeInfo.language.toUpperCase(),
      price: Math.floor(Math.random() * 100) + 10,
      buyLink: item.saleInfo.buyLink || null,
    })
  );

  return { books, error: null };
};
