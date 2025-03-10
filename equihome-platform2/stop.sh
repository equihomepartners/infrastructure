#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Get the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

echo -e "${YELLOW}Stopping Equihome Platform Services...${NC}\n"

# Function to kill process on port
kill_port() {
    local port=$1
    echo -e "${YELLOW}Cleaning up port $port...${NC}"
    lsof -ti:$port | xargs kill -9 2>/dev/null || true
}

# Stop ML service
echo -e "Stopping ML service..."
if [ -f .ml_pid ]; then
    kill -9 $(cat .ml_pid) 2>/dev/null || true
    rm .ml_pid
fi
kill_port 3008

# Stop backend API
echo -e "Stopping backend API..."
if [ -f .api_pid ]; then
    kill -9 $(cat .api_pid) 2>/dev/null || true
    rm .api_pid
fi
kill_port 3007

# Stop frontend
echo -e "Stopping frontend..."
if [ -f .fe_pid ]; then
    kill -9 $(cat .fe_pid) 2>/dev/null || true
    rm .fe_pid
fi
kill_port 3001
kill_port 3002

echo -e "\n${GREEN}All services stopped!${NC}" 