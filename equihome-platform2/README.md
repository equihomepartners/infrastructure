# Equihome Platform

## System Requirements

- Node.js 16+
- npm 7+
- MongoDB (for data storage)
- Python 3.8+ (for ML service)

## Quick Start

1. Clone the repository
2. Make the setup script executable:
```bash
chmod +x setup.sh stop.sh
```

3. Run the setup script:
```bash
./setup.sh
```

This will:
- Install all dependencies for frontend, backend API, and ML service
- Create necessary data directories
- Start all services in the correct order

The following services will be available:
- Frontend: http://localhost:3001
- Backend API: http://localhost:3007
- ML Service: http://localhost:3008

## Manual Setup

If you prefer to start services manually:

1. Install frontend dependencies:
```bash
npm install
```

2. Install backend API dependencies:
```bash
cd cio-api && npm install
```

3. Install ML service dependencies:
```bash
cd ml-service && npm install
```

4. Start services in separate terminals:

ML Service:
```bash
cd ml-service
PORT=3008 npm start
```

Backend API:
```bash
cd cio-api
PORT=3007 npm start
```

Frontend:
```bash
npm run dev
```

## Stopping Services

To stop all services:
```bash
./stop.sh
```

## Architecture

The platform consists of three main components:

1. Frontend (React + Vite)
   - Map visualization with traffic light system
   - ML analytics dashboard
   - Property analysis tools

2. Backend API (Node.js + Express)
   - Data ingestion from various sources
   - Suburb classification endpoints
   - Analytics aggregation

3. ML Service (Node.js + XGBoost)
   - Real-time suburb classification
   - Risk analysis
   - Growth predictions

## Development

- Frontend code is in `src/`
- Backend API code is in `cio-api/src/`
- ML service code is in `ml-service/src/`

## Troubleshooting

1. If the map doesn't load:
   - Check if all services are running
   - Verify API keys in environment variables
   - Check browser console for errors

2. If ML classifications fail:
   - Ensure ML service is running
   - Check ML service logs for errors
   - Verify training data is available

3. If data is not updating:
   - Check MongoDB connection
   - Verify data ingestion service status
   - Check API endpoints in browser 