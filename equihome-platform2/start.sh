#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}Starting Equihome Platform...${NC}\n"

# Function to check if Redis is running
check_redis() {
    if redis-cli ping > /dev/null 2>&1; then
        echo -e "${GREEN}✓ Redis is already running${NC}"
        return 0
    else
        echo -e "${RED}× Redis is not running${NC}"
        return 1
    fi
}

# Start Redis if not running
if ! check_redis; then
    echo -e "\n${BLUE}Starting Redis...${NC}"
    brew services start redis
    sleep 2
    if check_redis; then
        echo -e "${GREEN}✓ Redis started successfully${NC}"
    else
        echo -e "${RED}Failed to start Redis. Please start it manually.${NC}"
        exit 1
    fi
fi

# Start Property Feed Service
echo -e "\n${BLUE}Starting Property Feed Service...${NC}"
cd property-feed-service
npm run dev & # Run in background
PROPERTY_FEED_PID=$!
cd ..

# Start CIO API (ML Service)
echo -e "\n${BLUE}Starting CIO API (ML Service)...${NC}"
cd cio-api
npm run dev & # Run in background
CIO_API_PID=$!
cd ..

# Start Frontend
echo -e "\n${BLUE}Starting Frontend Application...${NC}"
npm run dev & # Run in background
FRONTEND_PID=$!

# Print access information
echo -e "\n${GREEN}All services started successfully!${NC}"
echo -e "\n${BLUE}Access points:${NC}"
echo -e "Frontend: ${GREEN}http://localhost:3001${NC}"
echo -e "Property Feed Service: ${GREEN}http://localhost:3006${NC}"
echo -e "CIO API: ${GREEN}http://localhost:3007${NC}"

# Function to handle script termination
cleanup() {
    echo -e "\n${BLUE}Shutting down services...${NC}"
    kill $PROPERTY_FEED_PID 2>/dev/null
    kill $CIO_API_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    echo -e "${GREEN}Services stopped${NC}"
    exit 0
}

# Set up cleanup on script termination
trap cleanup SIGINT SIGTERM

# Keep script running
echo -e "\n${BLUE}Press Ctrl+C to stop all services${NC}"
wait 