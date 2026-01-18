import { useState, useEffect } from 'react';
import { Book, bookService } from '../services/bookService';

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
    category: '',
    stockQuantity: 0,
    inStock: true,
    rating: 0,
  });

  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    loadCategories();
  }, []);

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
        category: '',
        stockQuantity: 0,
        inStock: true,
        rating: 0,
      });
    }
  }, [book]);

  const loadCategories = async () => {
    try {
      const cats = await bookService.getCategories();
      setCategories(cats);
    } catch (err) {
      console.error('Failed to load categories:', err);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' 
        ? (e.target as HTMLInputElement).checked 
        : name === 'price' || name === 'pageCount' || name === 'stockQuantity' || name === 'rating'
          ? (value ? parseFloat(value) : undefined)
          : value,
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
      category: '',
      stockQuantity: 0,
      inStock: true,
      rating: 0,
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
      category: '',
      stockQuantity: 0,
      inStock: true,
      rating: 0,
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
        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          value={formData.category || ''}
          onChange={handleChange}
        >
          <option value="">Select a category...</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="stockQuantity">Stock Quantity</label>
          <input
            type="number"
            id="stockQuantity"
            name="stockQuantity"
            value={formData.stockQuantity || 0}
            onChange={handleChange}
            placeholder="0"
            min="0"
          />
        </div>

        <div className="form-group">
          <label htmlFor="rating">Rating (0-5)</label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={formData.rating || 0}
            onChange={handleChange}
            placeholder="0"
            min="0"
            max="5"
            step="0.1"
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="inStock">
          <input
            type="checkbox"
            id="inStock"
            name="inStock"
            checked={formData.inStock || false}
            onChange={handleChange}
          />
          {' '}In Stock
        </label>
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
