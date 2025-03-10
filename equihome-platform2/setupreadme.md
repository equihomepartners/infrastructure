# Equihome Platform Setup Guide

## Current Architecture (Test Mode)

### Overview
The platform currently operates in test mode with three main components:

1. **Property Feed Service** (Port 3006)
   - Generates simulated data for:
     - Property updates (5-minute intervals)
     - Market data (hourly updates)
     - Infrastructure projects (daily updates)
   - Located in `/property-feed-service`
   - Uses Node.js with Express

2. **Redis Message Broker**
   - Runs on default port 6379
   - Handles pub/sub messaging for real-time updates
   - Three active channels:
     - `property-updates`: Individual property data (prices, metrics, status)
     - `market-updates`: Market-level aggregated data (median prices, volumes)
     - `infrastructure-updates`: Infrastructure project updates

3. **Frontend Application** (Port 3001)
   - React-based dashboard
   - WebSocket connection to Property Feed Service
   - Real-time data visualization
   - Located in main directory

### Setup Instructions

1. **Redis Setup**
```bash
# Install Redis
brew install redis

# Start Redis
brew services start redis
```

2. **Property Feed Service**
```bash
cd property-feed-service
npm install
npm run dev
```

3. **Frontend Application**
```bash
npm install
npm run dev
```

### Data Flow (Current)
```
[Property Feed Service (Test Data)] → [Redis Channels] → [Frontend WebSocket] → [UI Display]
```

## Planned Production Architecture

### Components

1. **External Data Sources**
   - Real estate APIs
   - Market data providers
   - Infrastructure project feeds
   - News and analytics services

2. **Data Lake/Database**
   - Permanent data storage
   - Historical data retention
   - Planned technologies:
     - Raw data: S3/Cloud Storage
     - Structured data: PostgreSQL/MongoDB
     - Analytics: Snowflake/BigQuery

3. **Property Feed Service**
   - Data ingestion from external sources
   - Data transformation and validation
   - Real-time updates via Redis
   - Historical data management

4. **Redis (Message Broker)**
   - Real-time message passing
   - Pub/sub system for live updates
   - Temporary data caching

5. **Frontend Application**
   - Real-time data visualization
   - Interactive dashboards
   - Data source management

### Planned Data Flow
```
[External Sources] → [Data Lake] → [Property Feed Service] → [Redis] → [Frontend]
```

## Implementation Status

### Currently Implemented
- ✅ Basic frontend dashboard
- ✅ Test data generation
- ✅ Redis pub/sub messaging
- ✅ WebSocket real-time updates
- ✅ Data source management UI

### Pending Implementation
- ⏳ External data source integration
- ⏳ Data Lake setup
- ⏳ Data validation and cleaning
- ⏳ Analytics and ML processing
- ⏳ Historical data management
- ⏳ Production deployment setup

## Development Notes

### Adding New Data Sources
1. Frontend supports four types of sources:
   - `api`: External API connections
   - `database`: Database integrations
   - `feed`: Real-time data feeds
   - `news`: News and updates

2. To add a new data source:
   - Add new channel in Property Feed Service
   - Implement data generator/connector
   - Add to frontend's initial data sources

### WebSocket Communication
- Frontend connects to `ws://localhost:3006`
- Automatic reconnection on disconnection
- Heartbeat mechanism every 30 seconds
- Subscription to all channels on connection

### Data Update Frequencies
- Property data: 5-minute intervals
- Market data: Hourly updates
- Infrastructure data: Daily updates

## Production Deployment Checklist

### Data Lake Setup
- [ ] Choose cloud provider (AWS/GCP/Azure)
- [ ] Set up data lake storage
- [ ] Configure access controls
- [ ] Implement data retention policies

### External Integrations
- [ ] Identify data providers
- [ ] Implement API integrations
- [ ] Set up authentication
- [ ] Configure rate limiting

### Security Considerations
- [ ] Data encryption at rest
- [ ] Secure communication channels
- [ ] Access control implementation
- [ ] API key management

### Monitoring
- [ ] Set up health checks
- [ ] Configure alerting
- [ ] Implement logging
- [ ] Performance monitoring

## Contributing
When adding new features:
1. Maintain existing architecture
2. Follow established patterns
3. Update documentation
4. Add appropriate tests

## Environment Variables
```env
# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379

# Service Ports
PROPERTY_FEED_PORT=3006
FRONTEND_PORT=3001

# External APIs (Future)
DATA_PROVIDER_API_KEY=
MARKET_DATA_API_KEY=
INFRASTRUCTURE_API_KEY=
```

## Support
For setup assistance or issues:
1. Check logs in respective services
2. Verify Redis connection
3. Confirm WebSocket connectivity
4. Check data flow in Redis channels 