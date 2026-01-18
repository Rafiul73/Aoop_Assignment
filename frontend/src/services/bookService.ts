import axios from 'axios';

const API_URL = 'http://localhost:8080/api/books';

export interface Book {
  id?: number;
  title: string;
  author: string;
  isbn: string;
  price?: number;
  pageCount?: number;
  description?: string;
}

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const bookService = {
  // GET all books
  getAllBooks: async (): Promise<Book[]> => {
    const response = await apiClient.get<Book[]>('');
    return response.data;
  },

  // GET single book by ID
  getBookById: async (id: number): Promise<Book> => {
    const response = await apiClient.get<Book>(`/${id}`);
    return response.data;
  },

  // POST - Create new book
  createBook: async (book: Book): Promise<Book> => {
    const response = await apiClient.post<Book>('', book);
    return response.data;
  },

  // PUT - Update entire book
  updateBook: async (id: number, book: Book): Promise<Book> => {
    const response = await apiClient.put<Book>(`/${id}`, book);
    return response.data;
  },

  // PATCH - Partially update book
  patchBook: async (id: number, book: Partial<Book>): Promise<Book> => {
    const response = await apiClient.patch<Book>(`/${id}`, book);
    return response.data;
  },

  // DELETE book
  deleteBook: async (id: number): Promise<void> => {
    await apiClient.delete(`/${id}`);
  },
};
