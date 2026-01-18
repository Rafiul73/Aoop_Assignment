package com.aoop.crudapi.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "books")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String title;
    
    @Column(nullable = false)
    private String author;
    
    @Column(nullable = false, unique = true)
    private String isbn;
    
    private Double price;
    
    private Integer pageCount;
    
    private String description;
    
    @Column(name = "category")
    private String category;
    
    @Column(name = "stock_quantity", nullable = false)
    private Integer stockQuantity = 0;
    
    @Column(name = "in_stock")
    private Boolean inStock = true;
    
    @Column(name = "rating")
    private Double rating = 0.0;

    // Constructors
    public Book() {}

    public Book(Long id, String title, String author, String isbn, Double price, Integer pageCount, 
                String description, String category, Integer stockQuantity, Boolean inStock, Double rating) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.price = price;
        this.pageCount = pageCount;
        this.description = description;
        this.category = category;
        this.stockQuantity = stockQuantity;
        this.inStock = inStock;
        this.rating = rating;
    }

    // Getters
    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getAuthor() {
        return author;
    }

    public String getIsbn() {
        return isbn;
    }

    public Double getPrice() {
        return price;
    }

    public Integer getPageCount() {
        return pageCount;
    }

    public String getDescription() {
        return description;
    }
    
    public String getCategory() {
        return category;
    }
    
    public Integer getStockQuantity() {
        return stockQuantity;
    }
    
    public Boolean getInStock() {
        return inStock;
    }
    
    public Double getRating() {
        return rating;
    }

    // Setters
    public void setId(Long id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public void setPageCount(Integer pageCount) {
        this.pageCount = pageCount;
    }

    public void setDescription(String description) {
        this.description = description;
    }
    
    public void setCategory(String category) {
        this.category = category;
    }
    
    public void setStockQuantity(Integer stockQuantity) {
        this.stockQuantity = stockQuantity;
        this.inStock = stockQuantity > 0;
    }
    
    public void setInStock(Boolean inStock) {
        this.inStock = inStock;
    }
    
    public void setRating(Double rating) {
        this.rating = rating;
    }
}
