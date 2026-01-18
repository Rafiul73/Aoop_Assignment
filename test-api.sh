#!/bin/bash

# Wait for backend to be ready
echo "Waiting for backend to start..."
for i in {1..30}; do
  if curl -s http://localhost:8080/api/books > /dev/null 2>&1; then
    echo "Backend is ready!"
    break
  fi
  echo "Attempt $i/30..."
  sleep 1
done

# Test GET all books
echo ""
echo "Testing GET /api/books..."
curl -s http://localhost:8080/api/books | python3 -m json.tool

# Test POST create book
echo ""
echo "Testing POST /api/books..."
curl -s -X POST http://localhost:8080/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Clean Code",
    "author": "Robert C. Martin",
    "isbn": "978-0132350884",
    "price": 45.99,
    "pageCount": 464,
    "description": "A Handbook of Agile Software Craftsmanship"
  }' | python3 -m json.tool

# Test GET all books again
echo ""
echo "Testing GET /api/books (after POST)..."
curl -s http://localhost:8080/api/books | python3 -m json.tool
