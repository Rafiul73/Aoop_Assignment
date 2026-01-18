#!/bin/bash
set -e

echo "🚀 Building and Starting AOOP Full-Stack Application"
echo "======================================================"

# Build backend
echo "📦 Building Spring Boot backend..."
cd backend
mvn clean package -DskipTests
cd ..

# Build frontend
echo "📦 Building React frontend..."
cd frontend
npm install
npm run build
cd ..

echo ""
echo "✅ Build complete!"
echo ""
echo "📖 Available scripts:"
echo "  ./run-backend.sh   - Start Spring Boot server (port 8080)"
echo "  ./run-frontend.sh  - Start React dev server (port 3000)"
echo "  ./dev.sh          - Start both servers concurrently"
