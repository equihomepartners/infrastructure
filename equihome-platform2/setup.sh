#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}Error: Must run from equihome-platform2 directory${NC}"
    exit 1
fi

# Check for Python 3
if ! command -v python3 &> /dev/null; then
    echo -e "${RED}Error: Python 3 is required but not installed${NC}"
    exit 1
fi

# Kill any existing processes
echo -e "${YELLOW}Cleaning up existing processes...${NC}"
lsof -ti:3001 | xargs kill -9 2>/dev/null
lsof -ti:3007 | xargs kill -9 2>/dev/null
lsof -ti:3008 | xargs kill -9 2>/dev/null

# Setup ML service
echo -e "${YELLOW}Setting up ML service...${NC}"
if [ ! -d "ml_service" ]; then
    echo -e "${RED}Error: ml_service directory not found${NC}"
    exit 1
fi

cd ml_service
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python3 main.py &
ML_PID=$!
cd ..

# Install frontend dependencies
echo -e "${YELLOW}Installing frontend dependencies...${NC}"
npm install

# Start frontend
echo -e "${YELLOW}Starting frontend...${NC}"
npm run dev &
FRONTEND_PID=$!

# Save PIDs for cleanup
echo $ML_PID > .ml_pid
echo $FRONTEND_PID > .frontend_pid

echo -e "${GREEN}Services started successfully!${NC}"
echo -e "Frontend: http://localhost:3001"
echo -e "ML Service: http://localhost:3008"

# Keep script running
wait 