# Property Feed Service

Real-time property data feed service for the Equihome platform. This service manages property data ingestion, processing, and distribution.

## Features

- Real-time property data ingestion
- Data normalization and validation
- Property feed API endpoints
- Automated data updates
- Redis-based caching

## Prerequisites

- Node.js (v18+)
- npm
- Redis

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file:
   ```env
   PORT=3006
   REDIS_URL=redis://localhost:6379
   NODE_ENV=development
   ```

## Running the Service

1. Development mode (with auto-reload):
   ```bash
   npm run dev
   ```

2. Production mode:
   ```bash
   npm start
   ```

The service will run on http://localhost:3006

## API Endpoints

- GET `/properties` - Get all properties
- GET `/properties/:id` - Get property by ID
- POST `/properties` - Add new property
- PUT `/properties/:id` - Update property
- GET `/feed/status` - Get feed status

## Development

- Uses nodemon for development
- ESLint for code linting
- Jest for testing

## Scripts

- `npm run dev` - Start development server
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run lint` - Run linter

## Troubleshooting

1. Port conflicts:
   ```bash
   lsof -i :3006
   ```

2. Redis connection issues:
   ```bash
   brew services restart redis
   ```

3. Data feed issues:
   - Check Redis connection
   - Verify data source connectivity
   - Check service logs 