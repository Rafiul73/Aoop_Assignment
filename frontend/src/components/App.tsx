import { useState, useEffect } from 'react';
import { Book, bookService } from '../services/bookService';
import BookForm from './BookForm';
import BookList from './BookList';
import './App.css';

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [categories, setCategories] = useState<string[]>([]);
  const [filterStock, setFilterStock] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: 1000 });

  // Load all books
  const loadBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await bookService.getAllBooks();
      setBooks(data);
    } catch (err) {
      setError('Failed to load books');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Load categories
  const loadCategories = async () => {
    try {
      const cats = await bookService.getCategories();
      setCategories(cats);
    } catch (err) {
      console.error('Failed to load categories:', err);
    }
  };

  // Load books and categories on mount
  useEffect(() => {
    loadBooks();
    loadCategories();
  }, []);

  // Apply filters
  const applyFilters = async () => {
    try {
      setLoading(true);
      setError(null);
      let filteredBooks: Book[] = [];

      if (searchQuery.trim()) {
        filteredBooks = await bookService.searchBooks(searchQuery);
      } else if (selectedCategory) {
        filteredBooks = await bookService.filterByCategory(selectedCategory);
      } else if (filterStock !== 'all') {
        filteredBooks = await bookService.filterByStock(filterStock === 'true');
      } else {
        filteredBooks = await bookService.getAllBooks();
      }

      setBooks(filteredBooks);
    } catch (err) {
      setError('Failed to apply filters');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSelectedCategory('');
    setFilterStock('all');
  };

  // Handle category filter
  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    setSearchQuery('');
    setFilterStock('all');
  };

  // Handle stock filter
  const handleStockFilter = (stock: string) => {
    setFilterStock(stock);
    setSearchQuery('');
    setSelectedCategory('');
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setFilterStock('all');
    loadBooks();
  };

  // Handle create book
  const handleCreateBook = async (book: Book) => {
    try {
      setError(null);
      const newBook = await bookService.createBook(book);
      setBooks([...books, newBook]);
      setSelectedBook(null);
    } catch (err) {
      setError('Failed to create book');
      console.error(err);
    }
  };

  // Handle update book
  const handleUpdateBook = async (book: Book) => {
    if (!book.id) return;
    try {
      setError(null);
      const updatedBook = await bookService.updateBook(book.id, book);
      setBooks(books.map((b: Book) => (b.id === book.id ? updatedBook : b)));
      setSelectedBook(null);
    } catch (err) {
      setError('Failed to update book');
      console.error(err);
    }
  };

  // Handle delete book
  const handleDeleteBook = async (id: number) => {
    try {
      setError(null);
      await bookService.deleteBook(id);
      setBooks(books.filter((b: Book) => b.id !== id));
      if (selectedBook?.id === id) {
        setSelectedBook(null);
      }
    } catch (err) {
      setError('Failed to delete book');
      console.error(err);
    }
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setSelectedBook(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>📚 Book Management System</h1>
        <p>Advanced Object-Oriented Programming - Lab Test</p>
      </header>

      {error && <div className="error-message">{error}</div>}

      <div className="app-container">
        <section className="form-section">
          <BookForm
            book={selectedBook}
            onSubmit={selectedBook ? handleUpdateBook : handleCreateBook}
            onCancel={handleCancelEdit}
          />
        </section>

        <section className="list-section">
          {/* Search and Filter Panel */}
          <div className="filter-panel">
            <h3>🔍 Search & Filter</h3>
            
            <div className="search-box">
              <input
                type="text"
                placeholder="Search by title, author, or ISBN..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="search-input"
              />
            </div>

            <div className="filter-controls">
              <div className="filter-group">
                <label>Category:</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => handleCategoryFilter(e.target.value)}
                  className="filter-select"
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label>Stock Status:</label>
                <select
                  value={filterStock}
                  onChange={(e) => handleStockFilter(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All</option>
                  <option value="true">In Stock</option>
                  <option value="false">Out of Stock</option>
                </select>
              </div>

              <button
                className="btn btn-secondary"
                onClick={clearFilters}
              >
                ↻ Clear Filters
              </button>
            </div>
          </div>

          {/* Books List */}
          {loading ? (
            <div className="loading">Loading books...</div>
          ) : (
            <BookList
              books={books}
              onEdit={setSelectedBook}
              onDelete={handleDeleteBook}
            />
          )}
        </section>
      </div>
    </div>
  );
}

export default App;
