import { create } from 'zustand';

export type Author = {
  id: number;
  name: string;
};

type AuthorStore = {
  authors: Author[];
  addAuthor: (author: Omit<Author, 'id'> , AuthorId: number) => void;
  removeAuthor: (id: number) => void;
};

const useAuthorStore = create<AuthorStore>((set) => ({
  authors: [],
  addAuthor: (author, AuthorId) =>
    set((state) => ({
      authors: [...state.authors, { id: AuthorId, ...author }],
    })),
  removeAuthor: (id) =>
    set((state) => ({
      authors: state.authors.filter((author) => author.id !== id),
    })),
}));

export default useAuthorStore;