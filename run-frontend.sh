#!/bin/bash
set -e

echo "🚀 Starting React Frontend"
echo "=========================="
echo "Frontend will be available at: http://localhost:3000"
echo ""

cd frontend
npm install
npm run dev
