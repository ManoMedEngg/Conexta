#!/bin/bash
echo "Starting Conexta System..."

# Start Backend
echo "Initializing Backend (Next.js)..."
cd backend
npm run dev &
BACKEND_PID=$!
cd ..

# Wait for backend to be ready
echo "Waiting for backend to start on port 3000..."
sleep 5

# Start Frontend Server
echo "Starting Frontend Server (Python)..."
echo "Open http://localhost:8000 in your browser"
python3 -m http.server 8000 &
FRONTEND_PID=$!

# Trap Ctrl+C to kill both processes
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT

wait
