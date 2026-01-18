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

  // Load books on mount
  useEffect(() => {
    loadBooks();
  }, []);

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
