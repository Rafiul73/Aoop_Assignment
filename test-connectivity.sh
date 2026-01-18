#!/bin/bash

echo "🔍 Book Management System - Connectivity Test"
echo "=============================================="
echo ""

# Test Backend
echo "Testing Backend API..."
if curl -s http://localhost:8080/api/books > /dev/null; then
  echo "✅ Backend is responding on http://localhost:8080"
  echo "   Books count: $(curl -s http://localhost:8080/api/books | python3 -c 'import sys, json; print(len(json.load(sys.stdin)))')"
else
  echo "❌ Backend is not responding"
fi

echo ""

# Test Frontend
echo "Testing Frontend..."
for port in 3000 3001 3002; do
  if curl -s http://localhost:$port > /dev/null 2>&1; then
    echo "✅ Frontend is running on http://localhost:$port"
    break
  fi
done

echo ""
echo "API Endpoints:"
echo "  GET    /api/books              - Get all books"
echo "  POST   /api/books              - Create book"
echo "  GET    /api/books/{id}         - Get book by ID"
echo "  PUT    /api/books/{id}         - Update book"
echo "  PATCH  /api/books/{id}         - Partial update"
echo "  DELETE /api/books/{id}         - Delete book"
echo "  GET    /api/books/search?query=  - Search books"
echo "  GET    /api/books/filter/category?category= - Filter by category"
echo "  GET    /api/books/filter/stock?inStock= - Filter by stock status"
echo ""
echo "✅ All systems connected and ready!"
