# AOOP Full-Stack CRUD Application

## 📋 Project Overview

A complete full-stack CRUD application demonstrating advanced object-oriented programming principles using:

- **Backend**: Spring Boot REST API
- **Frontend**: React with TypeScript
- **Database**: H2 (In-Memory)
- **Domain Model**: Book Management System

---

## 🏗️ Project Structure

```
├── .devcontainer/
│   ├── devcontainer.json        # GitHub Codespaces configuration
│   └── install-dependencies.sh  # Environment setup script
├── backend/
│   ├── src/
│   │   ├── main/java/com/aoop/crudapi/
│   │   │   ├── entity/Book.java              # JPA Entity
│   │   │   ├── repository/BookRepository.java # Data access layer
│   │   │   ├── controller/BookController.java # REST API endpoints
│   │   │   └── CrudApiApplication.java       # Main application class
│   │   └── resources/application.properties
│   └── pom.xml                   # Maven configuration
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── App.tsx          # Main application component
│   │   │   ├── BookForm.tsx     # Create/Update form
│   │   │   ├── BookList.tsx     # Display books
│   │   │   └── App.css          # Styling
│   │   ├── services/
│   │   │   └── bookService.ts   # API communication
│   │   ├── main.tsx             # React entry point
│   │   └── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
├── build.sh                      # Build script
├── run-backend.sh               # Backend startup script
├── run-frontend.sh              # Frontend startup script
├── dev.sh                       # Run both concurrently
└── README.md
```

---

## ✨ Features

### Backend - REST API Endpoints

All endpoints follow RESTful conventions for CRUD operations:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/books` | Retrieve all books |
| GET | `/api/books/{id}` | Retrieve book by ID |
| POST | `/api/books` | Create new book |
| PUT | `/api/books/{id}` | Update entire book |
| PATCH | `/api/books/{id}` | Partial update |
| DELETE | `/api/books/{id}` | Delete book |

### Frontend - User Interface

- **Book List**: Display all books in a responsive grid
- **Create Form**: Add new books with validation
- **Edit Form**: Update existing book details
- **Delete**: Remove books with confirmation
- **Responsive Design**: Works on desktop and mobile

---

## 🚀 Getting Started

### Prerequisites

- Java 17+
- Node.js 18+
- Maven 3.6+
- npm or yarn

### Quick Start

#### Option 1: Run Backend and Frontend Separately

```bash
# Terminal 1 - Start Backend
./run-backend.sh

# Terminal 2 - Start Frontend
./run-frontend.sh
```

#### Option 2: Run Both Concurrently

```bash
./dev.sh
```

#### Option 3: Build Everything First

```bash
./build.sh
```

### Accessing the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080
- **H2 Console**: http://localhost:8080/h2-console

---

## 📚 API Examples

### Create a Book
```bash
curl -X POST http://localhost:8080/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Clean Code",
    "author": "Robert C. Martin",
    "isbn": "978-0132350884",
    "price": 45.99,
    "pageCount": 464,
    "description": "A Handbook of Agile Software Craftsmanship"
  }'
```

### Get All Books
```bash
curl http://localhost:8080/api/books
```

### Get Book by ID
```bash
curl http://localhost:8080/api/books/1
```

### Update Book (PUT)
```bash
curl -X PUT http://localhost:8080/api/books/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Clean Code",
    "author": "Robert C. Martin",
    "isbn": "978-0132350884",
    "price": 39.99,
    "pageCount": 464,
    "description": "Updated description"
  }'
```

### Partial Update (PATCH)
```bash
curl -X PATCH http://localhost:8080/api/books/1 \
  -H "Content-Type: application/json" \
  -d '{
    "price": 35.99
  }'
```

### Delete Book
```bash
curl -X DELETE http://localhost:8080/api/books/1
```

---

## 🛠️ Technology Stack

### Backend
- **Spring Boot 3.2.1** - Java framework for building REST APIs
- **Spring Data JPA** - Database access and ORM
- **H2 Database** - In-memory relational database
- **Lombok** - Reduce boilerplate code
- **Maven** - Build management

### Frontend
- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool and dev server
- **Axios** - HTTP client
- **CSS 3** - Styling with gradients and animations

---

## 🎓 Learning Objectives Achieved

✅ **GitHub Codespaces Configuration** - Automated dev environment setup
✅ **React TypeScript Frontend** - Modern UI with type safety
✅ **Spring Boot REST API** - Full CRUD with all HTTP methods
✅ **Full-Stack Integration** - Frontend and backend working together
✅ **OOP Principles** - Entity, Repository, Controller patterns

---

## 📝 H2 Console Access

To view the database:

1. Navigate to: http://localhost:8080/h2-console
2. JDBC URL: `jdbc:h2:mem:testdb`
3. User: `sa`
4. Password: (leave empty)

---

## 🐛 Troubleshooting

### Backend won't start
- Ensure port 8080 is available
- Check Java version: `java -version`
- Clear Maven cache: `mvn clean`

### Frontend won't connect to backend
- Ensure backend is running on port 8080
- Check CORS settings in `BookController.java`
- Verify API URL in `bookService.ts`

### Node modules not found
- Run: `cd frontend && npm install`

---

## 📄 License

This is a lab test assignment for Advanced Object-Oriented Programming course.

---

**Created for AOOP Lab Test - Full-Stack CRUD Application**
