#!/bin/bash

# Syeed Waqas SAT Prep Website Server
# This script starts a local HTTP server for the website

echo "🚀 Starting Syeed Waqas SAT Prep Website Server..."
echo "📍 Directory: $(pwd)"
echo "🌐 Server will be available at: http://localhost:8080"
echo "🛑 Press Ctrl+C to stop the server"
echo ""

# Check if Python 3 is available
if command -v python3 &> /dev/null; then
    echo "✅ Using Python 3"
    python3 -m http.server 8080
elif command -v python &> /dev/null; then
    echo "✅ Using Python"
    python -m http.server 8080
elif command -v node &> /dev/null; then
    echo "✅ Using Node.js with http-server"
    npx http-server -p 8080 -c-1
else
    echo "❌ Error: No Python or Node.js found. Please install Python 3 or Node.js."
    echo "💡 To install Python on macOS: brew install python3"
    echo "💡 To install Node.js on macOS: brew install node"
    exit 1
fi
