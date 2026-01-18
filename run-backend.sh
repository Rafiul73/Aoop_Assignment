#!/bin/bash
set -e

echo "🚀 Starting Spring Boot Backend"
echo "==============================="
echo "API will be available at: http://localhost:8080"
echo ""

cd backend
mvn spring-boot:run
