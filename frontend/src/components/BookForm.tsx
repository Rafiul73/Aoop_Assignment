import { useState, useEffect } from 'react';
import { Book } from '../services/bookService';

interface BookFormProps {
  book: Book | null;
  onSubmit: (book: Book) => void;
  onCancel: () => void;
}

function BookForm({ book, onSubmit, onCancel }: BookFormProps) {
  const [formData, setFormData] = useState<Book>({
    title: '',
    author: '',
    isbn: '',
    price: undefined,
    pageCount: undefined,
    description: '',
  });

  useEffect(() => {
    if (book) {
      setFormData(book);
    } else {
      setFormData({
        title: '',
        author: '',
        isbn: '',
        price: undefined,
        pageCount: undefined,
        description: '',
      });
    }
  }, [book]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'price' || name === 'pageCount' ? (value ? parseFloat(value) : undefined) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.author || !formData.isbn) {
      alert('Please fill in all required fields');
      return;
    }
    onSubmit(formData);
    setFormData({
      title: '',
      author: '',
      isbn: '',
      price: undefined,
      pageCount: undefined,
      description: '',
    });
  };

  const handleCancel = () => {
    setFormData({
      title: '',
      author: '',
      isbn: '',
      price: undefined,
      pageCount: undefined,
      description: '',
    });
    onCancel();
  };

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <h2>{book ? '✏️ Edit Book' : '➕ Add New Book'}</h2>

      <div className="form-group">
        <label htmlFor="title">Title *</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter book title"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="author">Author *</label>
        <input
          type="text"
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="Enter author name"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="isbn">ISBN *</label>
        <input
          type="text"
          id="isbn"
          name="isbn"
          value={formData.isbn}
          onChange={handleChange}
          placeholder="Enter ISBN"
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="price">Price ($)</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price || ''}
            onChange={handleChange}
            placeholder="0.00"
            step="0.01"
          />
        </div>

        <div className="form-group">
          <label htmlFor="pageCount">Pages</label>
          <input
            type="number"
            id="pageCount"
            name="pageCount"
            value={formData.pageCount || ''}
            onChange={handleChange}
            placeholder="0"
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter book description"
          rows={4}
        />
      </div>

      <div className="form-buttons">
        <button type="submit" className="btn btn-primary">
          {book ? '💾 Update Book' : '➕ Add Book'}
        </button>
        {book && (
          <button type="button" className="btn btn-secondary" onClick={handleCancel}>
            ❌ Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default BookForm;
