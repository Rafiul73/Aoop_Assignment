package com.aoop.crudapi.controller;

import com.aoop.crudapi.entity.Book;
import com.aoop.crudapi.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "*", maxAge = 3600)
public class BookController {
    
    @Autowired
    private BookRepository bookRepository;
    
    // GET all books
    @GetMapping
    public ResponseEntity<List<Book>> getAllBooks() {
        List<Book> books = bookRepository.findAll();
        return ResponseEntity.ok(books);
    }
    
    // GET book by ID
    @GetMapping("/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable Long id) {
        Optional<Book> book = bookRepository.findById(id);
        return book.map(ResponseEntity::ok)
                   .orElseGet(() -> ResponseEntity.notFound().build());
    }
    
    // POST - Create new book
    @PostMapping
    public ResponseEntity<Book> createBook(@RequestBody Book book) {
        Book savedBook = bookRepository.save(book);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedBook);
    }
    
    // PUT - Update entire book
    @PutMapping("/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable Long id, @RequestBody Book bookDetails) {
        Optional<Book> existingBook = bookRepository.findById(id);
        
        if (existingBook.isPresent()) {
            Book book = existingBook.get();
            book.setTitle(bookDetails.getTitle());
            book.setAuthor(bookDetails.getAuthor());
            book.setIsbn(bookDetails.getIsbn());
            book.setPrice(bookDetails.getPrice());
            book.setPageCount(bookDetails.getPageCount());
            book.setDescription(bookDetails.getDescription());
            
            Book updatedBook = bookRepository.save(book);
            return ResponseEntity.ok(updatedBook);
        }
        
        return ResponseEntity.notFound().build();
    }
    
    // PATCH - Partially update book
    @PatchMapping("/{id}")
    public ResponseEntity<Book> partiallyUpdateBook(@PathVariable Long id, @RequestBody Book bookDetails) {
        Optional<Book> existingBook = bookRepository.findById(id);
        
        if (existingBook.isPresent()) {
            Book book = existingBook.get();
            
            if (bookDetails.getTitle() != null) {
                book.setTitle(bookDetails.getTitle());
            }
            if (bookDetails.getAuthor() != null) {
                book.setAuthor(bookDetails.getAuthor());
            }
            if (bookDetails.getIsbn() != null) {
                book.setIsbn(bookDetails.getIsbn());
            }
            if (bookDetails.getPrice() != null) {
                book.setPrice(bookDetails.getPrice());
            }
            if (bookDetails.getPageCount() != null) {
                book.setPageCount(bookDetails.getPageCount());
            }
            if (bookDetails.getDescription() != null) {
                book.setDescription(bookDetails.getDescription());
            }
            
            Book updatedBook = bookRepository.save(book);
            return ResponseEntity.ok(updatedBook);
        }
        
        return ResponseEntity.notFound().build();
    }
    
    // DELETE book
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable Long id) {
        Optional<Book> book = bookRepository.findById(id);
        
        if (book.isPresent()) {
            bookRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        
        return ResponseEntity.notFound().build();
    }
}
