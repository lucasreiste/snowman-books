export interface Book {
  id: string;
  title: string;
  subtitle?: string | null;
  author: string;
  description: string;
  coverImage: string;
  categories: string;
  pageCount: number | string;
  language: string;
  price: number;
}
