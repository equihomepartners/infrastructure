# ML Service

Machine Learning service for the Equihome platform. This service provides real-time predictions and analytics for property valuation and market analysis.

## Features

- Real-time property valuation
- Market trend analysis
- Risk assessment
- Zone classification
- Growth prediction

## Prerequisites

- Python 3.8+
- pip
- Redis (for caching and model storage)

## Installation

1. Create and activate a virtual environment (recommended):
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Configuration

The service uses environment variables for configuration. Create a `.env` file with:

```env
REDIS_HOST=localhost
REDIS_PORT=6379
MODEL_VERSION=1.0.0
DEBUG=True
```

## Running the Service

1. Ensure Redis is running:
   ```bash
   brew services list | grep redis
   ```

2. Start the service:
   ```bash
   python3 main.py
   ```

The service will run on http://0.0.0.0:3008

## API Endpoints

- GET `/status` - Service health check
- POST `/predict` - Get property predictions
- GET `/model/info` - Get current model information
- POST `/model/train` - Trigger model training

## Development Notes

- The service will automatically train a new model when data becomes available
- Model artifacts are stored in Redis for fast access
- Logs are available in the console and `ml_service.log`

## Troubleshooting

1. Port conflicts:
   ```bash
   lsof -i :3008
   ```

2. Redis connection issues:
   ```bash
   brew services restart redis
   ```

3. Model training issues:
   - Check data availability
   - Verify Redis connection
   - Check log files for errors 