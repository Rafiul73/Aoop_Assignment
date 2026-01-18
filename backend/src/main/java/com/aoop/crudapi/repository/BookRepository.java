package com.aoop.crudapi.repository;

import com.aoop.crudapi.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    // Search by title
    List<Book> findByTitleContainingIgnoreCase(String title);
    
    // Search by author
    List<Book> findByAuthorContainingIgnoreCase(String author);
    
    // Search by ISBN
    Optional<Book> findByIsbn(String isbn);
    
    // Filter by category
    List<Book> findByCategory(String category);
    
    // Filter by stock status
    List<Book> findByInStock(Boolean inStock);
    
    // Filter by price range
    @Query("SELECT b FROM Book b WHERE b.price BETWEEN :minPrice AND :maxPrice")
    List<Book> findByPriceRange(@Param("minPrice") Double minPrice, @Param("maxPrice") Double maxPrice);
    
    // Filter by rating
    @Query("SELECT b FROM Book b WHERE b.rating >= :minRating")
    List<Book> findByMinimumRating(@Param("minRating") Double minRating);
    
    // Complex search - title or author or ISBN
    @Query("SELECT b FROM Book b WHERE " +
           "LOWER(b.title) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(b.author) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(b.isbn) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Book> searchBooks(@Param("query") String query);
    
    // Get all categories
    @Query("SELECT DISTINCT b.category FROM Book b WHERE b.category IS NOT NULL")
    List<String> findAllCategories();
}
