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
}

export async function fetchBooks(
  searchTerm = "subject:fiction",
  maxResults = 10
): Promise<Book[]> {
  const apiUrl = "https://www.googleapis.com/books/v1/volumes";
  const params = new URLSearchParams({
    q: searchTerm.trim(),
    maxResults: maxResults.toString(),
  });

  try {
    const response = await fetch(`${apiUrl}?${params.toString()}`);

    if (!response.ok) {
      throw new Error(`Erro ao buscar livros: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.items) {
      console.warn("Nenhum item encontrado para a busca:", searchTerm);
      return [];
    }

    return data.items.map(mapGoogleBookToBook);
  } catch (error) {
    console.error("Erro ao buscar livros:", error);
    return [];
  }
}

function mapGoogleBookToBook(item: GoogleBook): Book {
  const {
    id,
    volumeInfo: {
      title,
      subtitle,
      authors,
      description,
      imageLinks,
      categories,
      pageCount,
      language,
    },
  } = item;

  return {
    id,
    title: title || "Título desconhecido",
    subtitle: subtitle || null,
    author: authors?.join(", ") || "Autor desconhecido",
    description: description || "Sem descrição disponível.",
    coverImage: imageLinks?.thumbnail || "",
    categories: categories?.join(", ") || "N/A",
    pageCount: pageCount || "N/A",
    language: language?.toUpperCase() || "N/A",
    price: Math.floor(Math.random() * 10) + 1,
  };
}
