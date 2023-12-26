import { nanoid } from 'nanoid';
import { create } from 'zustand';

export type Book = {
  id: string;
  author: string;
  title: string;
  date_published: string;
  genre: string;
  cover: File;
  description?: string;
  date_added: string;
};

type BookStore = {
  books: Book[];
  addBook: (book: Omit<Book, 'id'>) => void;
  removeBook: (id: string) => void;
};

const useBookStore = create<BookStore>((set) => ({
  books: [],
  addBook: (book) =>
    set((state) => ({
      books: [...state.books, { id: nanoid(), ...book }],
    })),
  removeBook: (id) =>
    set((state) => ({
      books: state.books.filter((book) => book.id !== id),
    })),
}));

export default useBookStore;