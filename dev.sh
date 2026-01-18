#!/bin/bash

echo "🚀 Starting AOOP Full-Stack Application (Both Frontend & Backend)"
echo "=================================================================="
echo ""
echo "Backend:  http://localhost:8080"
echo "Frontend: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Start backend in background
echo "Starting backend..."
./run-backend.sh &
BACKEND_PID=$!

# Wait for backend to start
sleep 5

# Start frontend in background
echo "Starting frontend..."
./run-frontend.sh &
FRONTEND_PID=$!

# Wait for both processes
wait
