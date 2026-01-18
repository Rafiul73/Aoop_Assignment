import axios from 'axios';

// Use /api for dev (proxies to backend), full URL for production
const API_URL = '/api/books';

export interface Book {
  id?: number;
  title: string;
  author: string;
  isbn: string;
  price?: number;
  pageCount?: number;
  description?: string;
  category?: string;
  stockQuantity?: number;
  inStock?: boolean;
  rating?: number;
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

  // SEARCH - Search books
  searchBooks: async (query: string): Promise<Book[]> => {
    const response = await apiClient.get<Book[]>('/search', {
      params: { query },
    });
    return response.data;
  },

  // FILTER - Filter by category
  filterByCategory: async (category: string): Promise<Book[]> => {
    const response = await apiClient.get<Book[]>('/filter/category', {
      params: { category },
    });
    return response.data;
  },

  // FILTER - Filter by stock status
  filterByStock: async (inStock: boolean): Promise<Book[]> => {
    const response = await apiClient.get<Book[]>('/filter/stock', {
      params: { inStock },
    });
    return response.data;
  },

  // FILTER - Filter by price range
  filterByPriceRange: async (minPrice: number, maxPrice: number): Promise<Book[]> => {
    const response = await apiClient.get<Book[]>('/filter/price', {
      params: { minPrice, maxPrice },
    });
    return response.data;
  },

  // FILTER - Filter by rating
  filterByRating: async (minRating: number): Promise<Book[]> => {
    const response = await apiClient.get<Book[]>('/filter/rating', {
      params: { minRating },
    });
    return response.data;
  },

  // GET all categories
  getCategories: async (): Promise<string[]> => {
    const response = await apiClient.get<string[]>('/categories');
    return response.data;
  },

  // MANAGE STOCK - Update stock
  updateStock: async (id: number, quantity: number): Promise<Book> => {
    const response = await apiClient.put<Book>(`/${id}/stock`, null, {
      params: { quantity },
    });
    return response.data;
  },

  // MANAGE STOCK - Buy book
  buyBook: async (id: number, quantity: number): Promise<Book> => {
    const response = await apiClient.post<Book>(`/${id}/buy`, null, {
      params: { quantity },
    });
    return response.data;
  },

  // MANAGE RATING - Update rating
  updateRating: async (id: number, rating: number): Promise<Book> => {
    const response = await apiClient.put<Book>(`/${id}/rating`, null, {
      params: { rating },
    });
    return response.data;
  },
};
