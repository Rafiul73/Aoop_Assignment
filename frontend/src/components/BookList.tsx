import { Book } from '../services/bookService';

interface BookListProps {
  books: Book[];
  onEdit: (book: Book) => void;
  onDelete: (id: number) => void;
}

function BookList({ books, onEdit, onDelete }: BookListProps) {
  const getStockStatus = (inStock: boolean | undefined) => {
    return inStock ? '✅ In Stock' : '❌ Out of Stock';
  };

  const getRatingStars = (rating: number | undefined) => {
    if (!rating) return '☆☆☆☆☆';
    const stars = Math.round(rating);
    return '★'.repeat(stars) + '☆'.repeat(5 - stars);
  };

  if (books.length === 0) {
    return (
      <div className="book-list empty">
        <div className="empty-state">
          <p>📖 No books found</p>
          <p className="empty-subtitle">Start by adding a new book!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="book-list">
      <h2>📚 Your Books ({books.length})</h2>
      <div className="books-grid">
        {books.map((book) => (
          <div key={book.id} className="book-card">
            <div className="book-card-header">
              <h3>{book.title}</h3>
              <div className="book-meta">
                {book.category && <span className="badge category">{book.category}</span>}
                <span className={`badge stock ${book.inStock ? 'in-stock' : 'out-stock'}`}>
                  {getStockStatus(book.inStock)}
                </span>
              </div>
            </div>
            <div className="book-card-body">
              <p>
                <strong>Author:</strong> {book.author}
              </p>
              <p>
                <strong>ISBN:</strong> {book.isbn}
              </p>
              {book.price && (
                <p>
                  <strong>Price:</strong> ${book.price.toFixed(2)}
                </p>
              )}
              {book.pageCount && (
                <p>
                  <strong>Pages:</strong> {book.pageCount}
                </p>
              )}
              {book.stockQuantity !== undefined && (
                <p>
                  <strong>Stock:</strong> {book.stockQuantity} units
                </p>
              )}
              {book.rating && book.rating > 0 && (
                <p>
                  <strong>Rating:</strong> {getRatingStars(book.rating)} ({book.rating.toFixed(1)}/5)
                </p>
              )}
              {book.description && (
                <p className="description">
                  <strong>Description:</strong> {book.description}
                </p>
              )}
            </div>
            <div className="book-card-footer">
              <button
                className="btn btn-edit"
                onClick={() => onEdit(book)}
                title="Edit book"
              >
                ✏️ Edit
              </button>
              <button
                className="btn btn-delete"
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete this book?')) {
                    onDelete(book.id!);
                  }
                }}
                title="Delete book"
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookList;
